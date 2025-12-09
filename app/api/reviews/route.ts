import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Review from '@/models/Review';
import Tour from '@/models/Tour';
import City from '@/models/City';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const tourId = searchParams.get('tourId');
        const cityId = searchParams.get('cityId');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        const query: any = {};
        if (tourId) query.tourId = tourId;
        if (cityId) query.cityId = cityId;

        const reviews = await Review.find(query)
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Review.countDocuments(query);

        return NextResponse.json({
            reviews,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get reviews error:', error);
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { tourId, cityId, rating, comment } = await req.json();

        if (!tourId && !cityId) {
            return NextResponse.json(
                { error: 'Either tourId or cityId is required' },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { error: 'Rating must be between 1 and 5' },
                { status: 400 }
            );
        }

        await dbConnect();

        const review = await Review.create({
            userId: session.user.id,
            tourId,
            cityId,
            rating,
            comment,
            userName: session.user.name,
            userEmail: session.user.email,
        });

        if (tourId) {
            const reviews = await Review.find({ tourId });
            const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
            await Tour.findByIdAndUpdate(tourId, {
                averageRating: avgRating,
                reviewCount: reviews.length,
            });
        }

        if (cityId) {
            const reviews = await Review.find({ cityId });
            const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
            await City.findByIdAndUpdate(cityId, {
                averageRating: avgRating,
                reviewCount: reviews.length,
            });
        }

        return NextResponse.json(review, { status: 201 });
    } catch (error: any) {
        console.error('Create review error:', error);
        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'You have already reviewed this item' },
                { status: 400 }
            );
        }
        return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
    }
}
