export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { stripe } from '@/lib/stripe';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { bookingId } = await req.json();

        await dbConnect();
        const booking = await Booking.findById(bookingId).populate('tourId');

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        if (booking.userId.toString() !== session.user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        if (booking.paymentStatus === 'completed') {
            return NextResponse.json({ error: 'Booking already paid' }, { status: 400 });
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: booking.tourId.title,
                            description: `Tour booking for ${booking.numberOfPeople} people`,
                        },
                        unit_amount: Math.round(booking.totalPrice * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXTAUTH_URL}/bookings?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/bookings?canceled=true`,
            metadata: {
                bookingId: booking._id.toString(),
                userId: session.user.id,
            },
        });

        booking.paymentIntentId = checkoutSession.id;
        await booking.save();

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
