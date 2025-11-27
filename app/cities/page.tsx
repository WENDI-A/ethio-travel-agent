'use client';

import { useEffect, useState } from 'react';
import CityCard from '@/components/CityCard';
import { motion } from 'framer-motion';

export default function CitiesPage() {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchCities();
    }, [search]);

    const fetchCities = async () => {
        try {
            const url = search
                ? `/api/cities?search=${encodeURIComponent(search)}`
                : '/api/cities';

            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setCities(data.data);
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-green-50 via-white to-yellow-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold mb-4">
                        Explore Ethiopian <span className="text-gradient">Cities</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Discover the rich history and vibrant culture of Ethiopia's most beautiful cities
                    </p>

                    <div className="max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search cities..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-6 py-4 rounded-full border-2 border-green-200 focus:border-green-600 focus:outline-none text-lg"
                        />
                    </div>
                </motion.div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        <p className="mt-4 text-gray-600">Loading cities...</p>
                    </div>
                ) : cities.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-600">No cities found. Try a different search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cities.map((city: any, idx) => (
                            <motion.div
                                key={city._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <CityCard city={city} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
