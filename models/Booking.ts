import mongoose, { Schema, model, models } from 'mongoose';

export interface IBooking {
    _id: string;
    userId: string;
    bookingType: 'tour' | 'attraction';
    tourId?: string;
    scheduleId?: string;
    itemDetails?: {
        name: string;
        image: string;
        city?: string;
        price: number;
    };
    bookingDate: Date;
    numberOfPeople: number;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    paymentId?: string;
    paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
    paymentIntentId?: string;
    amount?: number;
    currency?: string;
    specialRequests?: string;
    createdAt: Date;
    updatedAt: Date;
}


const BookingSchema = new Schema<IBooking>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId as any,
            ref: 'User',
            required: [true, 'Please provide a user'],
        },
        bookingType: {
            type: String,
            enum: ['tour', 'attraction'],
            default: 'tour',
            required: true,
        },
        tourId: {
            type: mongoose.Schema.Types.ObjectId as any,
            ref: 'Tour',
        },
        scheduleId: {
            type: mongoose.Schema.Types.ObjectId as any,
            ref: 'Schedule',
        },
        itemDetails: {
            name: String,
            image: String,
            city: String,
            price: Number,
        },
        bookingDate: {
            type: Date,
            default: Date.now,
        },
        numberOfPeople: {
            type: Number,
            required: [true, 'Please provide number of people'],
            min: 1,
            default: 1,
        },
        totalPrice: {
            type: Number,
            required: [true, 'Please provide total price'],
            min: 0,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled', 'completed'],
            default: 'pending',
        },
        paymentId: {
            type: String,
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'refunded'],
            default: 'pending',
        },
        paymentIntentId: {
            type: String,
        },
        amount: {
            type: Number,
        },
        currency: {
            type: String,
            default: 'usd',
        },
        specialRequests: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
