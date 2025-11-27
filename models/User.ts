import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    preferences?: {
        language?: string;
        interests?: string[];
        budget?: string;
    };
    bookingHistory?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 6,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        preferences: {
            language: { type: String, default: 'en' },
            interests: [{ type: String }],
            budget: { type: String },
        },
        bookingHistory: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    },
    {
        timestamps: true,
    }
);

const User = models.User || model<IUser>('User', UserSchema);

export default User;
