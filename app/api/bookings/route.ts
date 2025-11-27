import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        // 1. Check Authentication
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // 2. Get Data from Request
        const body = await request.json();
        const {
            bookingType,
            tourId,
            itemDetails,
            totalPrice,
            numberOfPeople = 1
        } = body;

        // 3. Validate Data
        if (!bookingType || !totalPrice) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (bookingType === 'tour' && !tourId) {
            return NextResponse.json(
                { success: false, error: 'Tour ID is required for tour bookings' },
                { status: 400 }
            );
        }

        if (bookingType === 'attraction' && !itemDetails) {
            return NextResponse.json(
                { success: false, error: 'Item details are required for attraction bookings' },
                { status: 400 }
            );
        }

        // 4. Create Booking
        // Note: session.user.id might need to be accessed differently depending on NextAuth config
        // If session.user.id is not available, we might need to fetch the user by email
        // For now assuming session.user.email is available and we can find the user or use ID if present

        // Let's assume we pass the userId from the client or look it up
        // Ideally, we should get it from the session. 
        // Let's check if we can get the user ID from the session.
        // If not, we'll need to look up the user by email.

        // For this implementation, let's look up the user by email to be safe
        const User = (await import('@/models/User')).default;
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        const newBooking = await Booking.create({
            userId: user._id,
            bookingType,
            tourId: bookingType === 'tour' ? tourId : undefined,
            itemDetails: bookingType === 'attraction' ? itemDetails : undefined,
            totalPrice,
            numberOfPeople,
            status: 'confirmed', // Auto-confirm for now
            paymentStatus: 'pending',
        });

        return NextResponse.json({ success: true, data: newBooking }, { status: 201 });

    } catch (error: any) {
        console.error('Booking error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create booking' },
            { status: 500 }
        );
    }
}
