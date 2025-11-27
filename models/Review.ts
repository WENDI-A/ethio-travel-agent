import mongoose, { Schema, model, models } from 'mongoose';

export interface IReview {
    _id: string;
    userId: string;
    tourId?: string;
    cityId?: string;
    rating: number;
    comment: string;
    userName?: string;
    userEmail?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId as any,
            ref: 'User',
            required: true,
        },
        tourId: {
            type: mongoose.Schema.Types.ObjectId as any,
            ref: 'Tour',
        },
        cityId: {
            type: mongoose.Schema.Types.ObjectId as any,
            ref: 'City',
        },
        rating: {
            type: Number,
            required: [true, 'Please provide a rating'],
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: [true, 'Please provide a comment'],
            maxlength: 1000,
        },
        userName: String,
        userEmail: String,
    },
    {
        timestamps: true,
    }
);

ReviewSchema.index({ tourId: 1, userId: 1 }, { unique: true, sparse: true });
ReviewSchema.index({ cityId: 1, userId: 1 }, { unique: true, sparse: true });

const Review = models.Review || model<IReview>('Review', ReviewSchema);

export default Review;
