'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface TourCardProps {
    tour: {
        _id: string;
        title: string;
        description: string;
        price: number;
        duration: number;
        images: string[];
        cityId?: {
            name: string;
        };
    };
}

export default function TourCard({ tour }: TourCardProps) {
    const { data: session } = useSession();
    const router = useRouter();

    const handleBook = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent Link navigation
        if (!session) {
            router.push('/signin');
            return;
        }

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookingType: 'tour',
                    tourId: tour._id,
                    totalPrice: tour.price,
                    numberOfPeople: 1, // Default to 1 for quick book
                }),
            });

            const data = await res.json();

            if (data.success) {
                alert(`✅ Booking Confirmed!\n\nYou have successfully booked ${tour.title}.`);
            } else {
                alert('❌ Booking Failed: ' + data.error);
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('❌ An error occurred while booking. Please try again.');
        }
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        >
            <Link href={`/tours/${tour._id}`}>
                <div className="relative h-56 overflow-hidden">
                    {tour.images && tour.images.length > 0 ? (
                        <img
                            src={tour.images[0]}
                            alt={tour.title}
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-green-400 flex items-center justify-center">
                            <span className="text-6xl">🎫</span>
                        </div>
                    )}
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {tour.duration} {tour.duration === 1 ? 'Day' : 'Days'}
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                            {tour.title}
                        </h3>
                    </div>

                    {tour.cityId && (
                        <p className="text-sm text-gray-500 mb-2">📍 {tour.cityId.name}</p>
                    )}

                    <p className="text-gray-600 line-clamp-2 mb-4">
                        {tour.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                            <span className="text-2xl font-bold text-green-600">
                                ${tour.price}
                            </span>
                            <span className="text-gray-500 text-sm ml-1">per person</span>
                        </div>
                        <button
                            onClick={handleBook}
                            className="gradient-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
