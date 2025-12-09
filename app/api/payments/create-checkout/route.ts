export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { getServerSession } = await import('next-auth');
        const { authOptions } = await import('@/app/api/auth/[...nextauth]/route');
        const { default: dbConnect } = await import('@/lib/mongodb');
        const { default: Booking } = await import('@/models/Booking');
        const Stripe = (await import('stripe')).default;

        const session = await getServerSession(authOptions as any);
        const user = (session && typeof session === 'object' && 'user' in session)
            ? (session as { user?: { id?: string } }).user
            : undefined;
        if (!user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { bookingId } = await req.json();

        await dbConnect();
        const booking = await (Booking as any).findById(bookingId).populate('tourId');

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        if (booking.userId.toString() !== user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        if (booking.paymentStatus === 'completed') {
            return NextResponse.json({ error: 'Booking already paid' }, { status: 400 });
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
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
                userId: user.id as string,
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
