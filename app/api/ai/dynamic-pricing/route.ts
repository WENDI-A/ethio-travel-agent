import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';
import Booking from '@/models/Booking';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const { tourId } = await request.json();

        if (!tourId) {
            return NextResponse.json(
                { success: false, error: 'Tour ID is required' },
                { status: 400 }
            );
        }

        const tour = await Tour.findById(tourId);
        if (!tour) {
            return NextResponse.json(
                { success: false, error: 'Tour not found' },
                { status: 404 }
            );
        }

        const recentBookings = await Booking.find({
            tourId,
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        });

        const totalBookings = recentBookings.length;
        const basePrice = tour.dynamicPricing?.basePrice || tour.price;

        let priceMultiplier = 1.0;

        if (totalBookings > 20) {
            priceMultiplier = 1.3;
        } else if (totalBookings > 10) {
            priceMultiplier = 1.15;
        } else if (totalBookings < 3) {
            priceMultiplier = 0.85;
        }

        const currentDate = new Date();
        const month = currentDate.getMonth();
        if (month >= 5 && month <= 8) {
            priceMultiplier *= 1.2;
        }

        const newPrice = Math.round(basePrice * priceMultiplier);

        await Tour.findByIdAndUpdate(tourId, {
            price: newPrice,
            dynamicPricing: {
                basePrice: basePrice,
                currentPrice: newPrice,
                lastUpdated: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            data: {
                tourId,
                basePrice,
                newPrice,
                priceMultiplier,
                demandLevel: totalBookings > 20 ? 'high' : totalBookings > 10 ? 'medium' : 'low',
                recentBookings: totalBookings,
            },
        });
    } catch (error: any) {
        console.error('Dynamic Pricing Error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
