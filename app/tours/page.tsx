'use client';

import { useEffect, useState } from 'react';
import TourCard from '@/components/TourCard';
import { motion } from 'framer-motion';

export default function ToursPage() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        duration: '',
    });

    useEffect(() => {
        fetchTours();
    }, [filters]);

    const fetchTours = async () => {
        try {
            const params = new URLSearchParams();
            if (filters.minPrice) params.append('minPrice', filters.minPrice);
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
            if (filters.duration) params.append('duration', filters.duration);

            const url = `/api/tours?${params.toString()}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setTours(data.data);
            }
        } catch (error) {
            console.error('Error fetching tours:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-yellow-50 via-white to-green-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold mb-4">
                        Discover Amazing <span className="text-gradient">Tours</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Find the perfect tour package for your Ethiopian adventure
                    </p>

                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="number"
                                placeholder="Min Price ($)"
                                value={filters.minPrice}
                                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-600 focus:outline-none"
                            />
                            <input
                                type="number"
                                placeholder="Max Price ($)"
                                value={filters.maxPrice}
                                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-600 focus:outline-none"
                            />
                            <select
                                value={filters.duration}
                                onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                                className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-600 focus:outline-none"
                            >
                                <option value="">All Durations</option>
                                <option value="1">1 Day</option>
                                <option value="3">3 Days</option>
                                <option value="5">5 Days</option>
                                <option value="7">7 Days</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        <p className="mt-4 text-gray-600">Loading tours...</p>
                    </div>
                ) : tours.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-600">No tours found. Try adjusting your filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tours.map((tour: any, idx) => (
                            <motion.div
                                key={tour._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <TourCard tour={tour} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
