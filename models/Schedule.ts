import mongoose, { Schema, model, models } from 'mongoose';

export interface ISchedule {
    _id: string;
    tourId: string;
    startDate: Date;
    endDate: Date;
    availableSlots: number;
    bookedSlots: number;
    maxCapacity?: number;
    bookedCount?: number;
    status: 'available' | 'full' | 'cancelled';
    optimizedBy?: 'ai' | 'manual';
    createdAt: Date;
    updatedAt: Date;
}

const ScheduleSchema = new Schema<ISchedule>(
    {
        tourId: {
            type: mongoose.Schema.Types.ObjectId as any,
            ref: 'Tour',
            required: [true, 'Please provide a tour'],
        },
        startDate: {
            type: Date,
            required: [true, 'Please provide a start date'],
        },
        endDate: {
            type: Date,
            required: [true, 'Please provide an end date'],
        },
        availableSlots: {
            type: Number,
            required: [true, 'Please provide available slots'],
            min: 1,
        },
        bookedSlots: {
            type: Number,
            default: 0,
            min: 0,
        },
        maxCapacity: {
            type: Number,
            default: 20,
            min: 1,
        },
        bookedCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        status: {
            type: String,
            enum: ['available', 'full', 'cancelled'],
            default: 'available',
        },
        optimizedBy: {
            type: String,
            enum: ['ai', 'manual'],
            default: 'manual',
        },
    },
    {
        timestamps: true,
    }
);

const Schedule = models.Schedule || model<ISchedule>('Schedule', ScheduleSchema);

export default Schedule;
