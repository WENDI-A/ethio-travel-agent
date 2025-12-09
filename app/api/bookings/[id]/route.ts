import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Booking from '@/models/Booking';
import Schedule from '@/models/Schedule';

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await dbConnect();

        const booking = await Booking.findById(params.id)
            .populate('userId', 'name email')
            .populate('tourId', 'title price')
            .populate('scheduleId', 'startDate endDate availableSlots bookedSlots');

        if (!booking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: booking });
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
        const { status } = body;

        const booking = await Booking.findById(params.id);
        if (!booking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found' },
                { status: 404 }
            );
        }

        const oldStatus = booking.status;
        booking.status = status;
        await booking.save();

        if (status === 'cancelled' && oldStatus !== 'cancelled') {
            const schedule = await Schedule.findById(booking.scheduleId);
            if (schedule) {
                schedule.bookedSlots = Math.max(0, schedule.bookedSlots - booking.numberOfPeople);
                if (schedule.bookedSlots < schedule.availableSlots) {
                    schedule.status = 'available';
                }
                await schedule.save();
            }
        }

        return NextResponse.json({ success: true, data: booking });
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

        const booking = await Booking.findById(params.id);
        if (!booking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found' },
                { status: 404 }
            );
        }

        if (booking.status !== 'cancelled') {
            const schedule = await Schedule.findById(booking.scheduleId);
            if (schedule) {
                schedule.bookedSlots = Math.max(0, schedule.bookedSlots - booking.numberOfPeople);
                if (schedule.bookedSlots < schedule.availableSlots) {
                    schedule.status = 'available';
                }
                await schedule.save();
            }
        }

        await Booking.findByIdAndDelete(params.id);

        return NextResponse.json({ success: true, data: {} });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
