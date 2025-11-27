import dbConnect from './mongodb';
import Schedule from '@/models/Schedule';
import Booking from '@/models/Booking';

export async function checkAvailability(scheduleId: string): Promise<{
    available: boolean;
    remainingSpots: number;
    maxCapacity: number;
    bookedCount: number;
}> {
    await dbConnect();

    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
        throw new Error('Schedule not found');
    }

    const bookings = await Booking.countDocuments({
        scheduleId,
        status: { $in: ['pending', 'confirmed'] },
    });

    const maxCapacity = schedule.maxCapacity || 20;
    const remainingSpots = Math.max(0, maxCapacity - bookings);

    return {
        available: remainingSpots > 0,
        remainingSpots,
        maxCapacity,
        bookedCount: bookings,
    };
}

export async function updateScheduleAvailability(scheduleId: string): Promise<void> {
    const { bookedCount } = await checkAvailability(scheduleId);
    await Schedule.findByIdAndUpdate(scheduleId, { bookedCount });
}
