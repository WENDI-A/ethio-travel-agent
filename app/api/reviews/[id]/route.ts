import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Review from '@/models/Review';
import Tour from '@/models/Tour';
import City from '@/models/City';

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { rating, comment } = await req.json();

        await dbConnect();
        const { id } = await context.params;
        const review = await Review.findById(id);

        if (!review) {
            return NextResponse.json({ error: 'Review not found' }, { status: 404 });
        }

        if (review.userId.toString() !== session.user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        review.rating = rating;
        review.comment = comment;
        await review.save();

        if (review.tourId) {
            const reviews = await Review.find({ tourId: review.tourId });
            const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
            await Tour.findByIdAndUpdate(review.tourId, {
                averageRating: avgRating,
            });
        }

        if (review.cityId) {
            const reviews = await Review.find({ cityId: review.cityId });
            const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
            await City.findByIdAndUpdate(review.cityId, {
                averageRating: avgRating,
            });
        }

        return NextResponse.json(review);
    } catch (error) {
        console.error('Update review error:', error);
        return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await context.params;
        const review = await Review.findById(id);

        if (!review) {
            return NextResponse.json({ error: 'Review not found' }, { status: 404 });
        }

        if (review.userId.toString() !== session.user.id && session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const tourId = review.tourId;
        const cityId = review.cityId;

        await review.deleteOne();

        if (tourId) {
            const reviews = await Review.find({ tourId });
            const avgRating = reviews.length > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                : 0;
            await Tour.findByIdAndUpdate(tourId, {
                averageRating: avgRating,
                reviewCount: reviews.length,
            });
        }

        if (cityId) {
            const reviews = await Review.find({ cityId });
            const avgRating = reviews.length > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                : 0;
            await City.findByIdAndUpdate(cityId, {
                averageRating: avgRating,
                reviewCount: reviews.length,
            });
        }

        return NextResponse.json({ message: 'Review deleted' });
    } catch (error) {
        console.error('Delete review error:', error);
        return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
    }
}
