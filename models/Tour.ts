import mongoose, { Schema, model, models } from 'mongoose';

export interface ITour {
    _id: string;
    title: string;
    description: string;
    cityId: string;
    price: number;
    duration: number;
    images: string[];
    videos?: string[];
    highlights: string[];
    included: string[];
    excluded: string[];
    aiGenerated?: boolean;
    dynamicPricing?: {
        basePrice: number;
        currentPrice: number;
        lastUpdated: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}

const TourSchema = new Schema<ITour>(
    {
        title: {
            type: String,
            required: [true, 'Please provide a tour title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
        },
        cityId: {
            type: mongoose.Schema.Types.ObjectId as any,
            ref: 'City',
            required: [true, 'Please provide a city'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a price'],
            min: 0,
        },
        duration: {
            type: Number,
            required: [true, 'Please provide duration in days'],
            min: 1,
        },
        images: {
            type: [String],
            default: [],
        },
        videos: {
            type: [String],
            default: [],
        },
        highlights: {
            type: [String],
            default: [],
        },
        included: {
            type: [String],
            default: [],
        },
        excluded: {
            type: [String],
            default: [],
        },
        aiGenerated: {
            type: Boolean,
            default: false,
        },
        dynamicPricing: {
            basePrice: Number,
            currentPrice: Number,
            lastUpdated: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Tour = models.Tour || model<ITour>('Tour', TourSchema);

export default Tour;
