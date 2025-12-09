import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import City from '@/models/City';
import Tour from '@/models/Tour';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const cityId = searchParams.get('cityId');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const duration = searchParams.get('duration');

        let query: any = {};

        if (cityId) {
            query.cityId = cityId;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (duration) {
            query.duration = Number(duration);
        }

        const tours = await Tour.find(query).populate('cityId').sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: tours });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const tour = await Tour.create(body);

        return NextResponse.json({ success: true, data: tour }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
