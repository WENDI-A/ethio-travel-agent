import mongoose, { Schema, model, models } from 'mongoose';

export interface IAttraction {
    name: string;
    description: string;
    image: string;
    price: number;
    rating: number;
}

export interface ICity {
    _id: string;
    name: string;
    description: string;
    images: string[];
    videos?: string[];
    attractions: IAttraction[];
    translations?: {
        [key: string]: {
            name: string;
            description: string;
        };
    };
    aiGenerated?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CitySchema = new Schema<ICity>(
    {
        name: {
            type: String,
            required: [true, 'Please provide a city name'],
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
        },
        images: {
            type: [String],
            default: [],
        },
        videos: {
            type: [String],
            default: [],
        },
        attractions: {
            type: [{
                name: { type: String, required: true },
                description: { type: String, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true, min: 0 },
                rating: { type: Number, required: true, min: 0, max: 5 }
            }],
            default: [],
        },
        translations: {
            type: Map,
            of: {
                name: String,
                description: String,
            },
        },
        aiGenerated: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const City = models.City || model<ICity>('City', CitySchema);

export default City;
