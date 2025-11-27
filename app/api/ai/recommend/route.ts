import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';
import Booking from '@/models/Booking';
import User from '@/models/User';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const { userId } = await request.json();

        if (!userId) {
            return NextResponse.json(
                { success: false, error: 'User ID is required' },
                { status: 400 }
            );
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        const userBookings = await Booking.find({ userId }).populate('tourId');

        const bookedCityIds = userBookings
            .map(b => (b.tourId as any)?.cityId)
            .filter(Boolean);

        const userInterests = user.preferences?.interests || [];
        const userBudget = user.preferences?.budget || 'medium';

        let query: any = {};

        if (bookedCityIds.length > 0) {
            query.cityId = { $nin: bookedCityIds };
        }

        if (userBudget === 'low') {
            query.price = { $lte: 500 };
        } else if (userBudget === 'medium') {
            query.price = { $gte: 300, $lte: 1000 };
        } else if (userBudget === 'high') {
            query.price = { $gte: 800 };
        }

        let recommendations = await Tour.find(query)
            .populate('cityId')
            .limit(6)
            .sort({ createdAt: -1 });

        if (recommendations.length === 0) {
            recommendations = await Tour.find()
                .populate('cityId')
                .limit(6)
                .sort({ createdAt: -1 });
        }

        return NextResponse.json({
            success: true,
            data: {
                recommendations,
                reason: `Based on your ${userBudget} budget and booking history`,
            },
        });
    } catch (error: any) {
        console.error('Recommendation Error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
