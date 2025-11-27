'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Attraction {
    name: string;
    description: string;
    image: string;
    price: number;
    rating: number;
}

interface CityCardProps {
    city: {
        _id: string;
        name: string;
        description: string;
        images: string[];
        attractions: Attraction[];
    };
}

export default function CityCard({ city }: CityCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        >
            <Link href={`/cities/${city._id}`}>
                <div className="relative h-64 overflow-hidden">
                    {city.images && city.images.length > 0 ? (
                        <img
                            src={city.images[0]}
                            alt={city.name}
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-400 to-yellow-400 flex items-center justify-center">
                            <span className="text-6xl">🏛️</span>
                        </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-green-600">
                        {city.attractions?.length || 0} Attractions
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">{city.name}</h3>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                        {city.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="text-green-600 font-semibold hover:underline">
                            Explore →
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
