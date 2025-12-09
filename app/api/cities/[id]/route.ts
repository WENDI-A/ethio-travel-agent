import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import City from '@/models/City';

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await dbConnect();

        let city;
        if (mongoose.Types.ObjectId.isValid(params.id)) {
            city = await City.findById(params.id);
        } else {
            city = await City.findOne({ slug: params.id });
        }

        if (!city) {
            return NextResponse.json(
                { success: false, error: 'City not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: city });
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
        const city = await City.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });

        if (!city) {
            return NextResponse.json(
                { success: false, error: 'City not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: city });
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

        const city = await City.findByIdAndDelete(params.id);

        if (!city) {
            return NextResponse.json(
                { success: false, error: 'City not found' },
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
