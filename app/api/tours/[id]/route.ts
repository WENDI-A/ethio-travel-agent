import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import City from '@/models/City';
import Tour from '@/models/Tour';

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await dbConnect();

        let tour;
        if (mongoose.Types.ObjectId.isValid(params.id)) {
            tour = await Tour.findById(params.id).populate('cityId');
        } else {
            tour = await Tour.findOne({ slug: params.id }).populate('cityId');
        }

        if (!tour) {
            return NextResponse.json(
                { success: false, error: 'Tour not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: tour });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await dbConnect();

        const body = await request.json();
        const tour = await Tour.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });

        if (!tour) {
            return NextResponse.json(
                { success: false, error: 'Tour not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: tour });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await dbConnect();

        const tour = await Tour.findByIdAndDelete(params.id);

        if (!tour) {
            return NextResponse.json(
                { success: false, error: 'Tour not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
