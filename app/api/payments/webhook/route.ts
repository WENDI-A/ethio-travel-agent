export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Read raw body for Stripe signature verification
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // Dynamically import Stripe and construct the event
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    let event: any;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Dynamically import DB and model
    const { default: dbConnect } = await import('@/lib/mongodb');
    const { default: Booking } = await import('@/models/Booking');
    await dbConnect();

    // Handle relevant events
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        const booking = await (Booking as any).findById(bookingId);
        if (booking) {
          booking.paymentStatus = 'completed';
          booking.paymentIntentId = (session.payment_intent as string) || booking.paymentIntentId;
          await booking.save();
        }
      }
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data.object as any;
      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        const booking = await (Booking as any).findById(bookingId);
        if (booking && booking.paymentStatus === 'pending') {
          booking.paymentStatus = 'failed';
          await booking.save();
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
