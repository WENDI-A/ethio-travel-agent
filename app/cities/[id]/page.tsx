'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, ArrowLeft, Sparkles, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SocialShare from '@/components/SocialShare';
import ReviewForm from '@/components/ReviewForm';
import ReviewCard from '@/components/ReviewCard';

interface Attraction {
    name: string;
    description: string;
    image: string;
    price: number;
    rating: number;
}

interface City {
    _id: string;
    name: string;
    description: string;
    images: string[];
    attractions: Attraction[];
    averageRating?: number;
    reviewCount?: number;
    createdAt: string;
}

interface Tour {
    _id: string;
    title: string;
    description: string;
    price: number;
    duration: number;
    images: string[];
}

export default function CityDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const id = params?.id as string;
    const [city, setCity] = useState<City | null>(null);
    const [tours, setTours] = useState<Tour[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);

    useEffect(() => {
        if (id) {
            fetchCityDetails();
            fetchCityTours();
            fetchReviews();
        }
    }, [id]);

    const fetchCityDetails = async () => {
        try {
            const res = await fetch(`/api/cities/${id}`);
            const data = await res.json();
            if (data.success) {
                setCity(data.data);
            }
        } catch (error) {
            console.error('Error fetching city:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCityTours = async () => {
        try {
            const res = await fetch(`/api/tours?cityId=${id}`);
            const data = await res.json();
            if (data.success) {
                setTours(data.data);
            }
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    };

    const fetchReviews = async () => {
        try {
            const res = await fetch(`/api/reviews?cityId=${id}`);
            const data = await res.json();
            if (data.reviews) {
                setReviews(data.reviews);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-yellow-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mb-4"></div>
                    <p className="text-xl text-gray-600">Loading city details...</p>
                </div>
            </div>
        );
    }

    if (!city) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-yellow-50">
                <div className="text-center">
                    <p className="text-2xl text-gray-600 mb-4">City not found</p>
                    <Link href="/cities" className="text-green-600 hover:text-green-700 underline">
                        Back to Cities
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
            {/* Hero Section with Image */}
            <div className="relative h-[70vh] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={city.images[selectedImage] || '/placeholder-city.jpg'}
                        alt={city.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>

                {/* Back Button */}
                <div className="absolute top-24 left-8 z-10">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </button>
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="w-6 h-6 text-green-400" />
                                <span className="text-green-400 font-medium text-lg">Ethiopia</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                                {city.name}
                            </h1>
                            <div className="flex items-center gap-4 text-white/90">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    <span>{city.attractions.length} Attractions</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5" />
                                    <span>{city.images.length} Photos</span>
                                </div>
                                {city.averageRating && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-400">⭐</span>
                                        <span>{city.averageRating.toFixed(1)} ({city.reviewCount} reviews)</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Image Thumbnails */}
                {city.images.length > 1 && (
                    <div className="absolute bottom-8 right-8 flex gap-2">
                        {city.images.slice(0, 4).map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx
                                    ? 'border-white scale-110'
                                    : 'border-white/50 hover:border-white'
                                    }`}
                            >
                                <img src={img} alt={`${city.name} ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Description Section with Social Share */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-16"
                >
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                        <div className="flex items-start justify-between mb-6">
                            <h2 className="text-3xl font-bold text-gray-900">About {city.name}</h2>
                            <SocialShare
                                title={`Discover ${city.name} - Ethiopian Travel`}
                                description={city.description.substring(0, 150) + '...'}
                            />
                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed">{city.description}</p>
                    </div>
                </motion.div>

                {/* Attractions Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold mb-8 text-gray-900">
                        <Sparkles className="inline w-8 h-8 text-yellow-500 mr-2" />
                        Top Attractions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {city.attractions.map((attraction, idx) => (
                            <motion.button
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + idx * 0.05 }}
                                onClick={() => setSelectedAttraction(attraction)}
                                className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-6 border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all group cursor-pointer text-left"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-green-700 transition-colors">
                                            {attraction.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-yellow-500 text-sm">⭐ {attraction.rating}</span>
                                            {attraction.price > 0 ? (
                                                <span className="text-green-600 font-semibold text-sm">${attraction.price}</span>
                                            ) : (
                                                <span className="text-blue-600 font-semibold text-sm">FREE</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Attraction Modal */}
                {selectedAttraction && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedAttraction(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl"
                        >
                            {/* Modal Image */}
                            <div className="relative h-64 md:h-80 overflow-hidden">
                                <img
                                    src={selectedAttraction.image || '/placeholder-attraction.jpg'}
                                    alt={selectedAttraction.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-full font-bold">
                                    ⭐ {selectedAttraction.rating}
                                </div>
                                {selectedAttraction.price > 0 ? (
                                    <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold">
                                        ${selectedAttraction.price}
                                    </div>
                                ) : (
                                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full font-bold">
                                        FREE
                                    </div>
                                )}
                                <button
                                    onClick={() => setSelectedAttraction(null)}
                                    className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-all"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8">
                                <h3 className="text-3xl font-bold mb-4 text-gray-900">
                                    {selectedAttraction.name}
                                </h3>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    {selectedAttraction.description}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <span className="text-yellow-500 text-2xl">⭐</span>
                                            <span className="text-gray-900 font-semibold">{selectedAttraction.rating} Rating</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-600 text-2xl">💰</span>
                                            <span className="text-gray-900 font-semibold">
                                                {selectedAttraction.price > 0 ? `$${selectedAttraction.price}` : 'Free Entry'}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={async () => {
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
                                                        bookingType: 'attraction',
                                                        totalPrice: selectedAttraction.price,
                                                        itemDetails: {
                                                            name: selectedAttraction.name,
                                                            image: selectedAttraction.image,
                                                            city: city.name,
                                                            price: selectedAttraction.price,
                                                        },
                                                    }),
                                                });

                                                const data = await res.json();

                                                if (data.success) {
                                                    alert(`✅ Booking Confirmed!\n\nYou have successfully booked ${selectedAttraction.name}.`);
                                                    setSelectedAttraction(null);
                                                } else {
                                                    alert('❌ Booking Failed: ' + data.error);
                                                }
                                            } catch (error) {
                                                console.error('Booking error:', error);
                                                alert('❌ An error occurred while booking. Please try again.');
                                            }
                                        }}
                                        className="gradient-primary text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all transform hover:scale-105"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Tours Section */}
                {tours.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Available Tours in {city.name}
                            </h2>
                            <Link
                                href="/tours"
                                className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
                            >
                                View All Tours
                                <ArrowLeft className="w-4 h-4 rotate-180" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tours.slice(0, 6).map((tour, idx) => (
                                <motion.div
                                    key={tour._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + idx * 0.1 }}
                                >
                                    <Link href={`/tours/${tour._id}`}>
                                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer">
                                            {/* Tour Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={tour.images[0] || '/placeholder-tour.jpg'}
                                                    alt={tour.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full font-bold">
                                                    ${tour.price}
                                                </div>
                                            </div>

                                            {/* Tour Info */}
                                            <div className="p-6">
                                                <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                                                    {tour.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                    {tour.description}
                                                </p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{tour.duration} days</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Reviews Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16"
                >
                    <h2 className="text-3xl font-bold mb-8 text-gray-900">
                        Reviews {city.averageRating && `(${city.averageRating.toFixed(1)} ⭐)`}
                    </h2>

                    {/* Review Form - only for authenticated users */}
                    {session ? (
                        <div className="mb-8">
                            <ReviewForm cityId={id} onSuccess={fetchReviews} />
                        </div>
                    ) : (
                        <div className="mb-8 bg-blue-50 p-6 rounded-lg text-center">
                            <p className="text-gray-700">
                                <Link href="/signin" className="text-blue-600 hover:underline font-semibold">
                                    Sign in
                                </Link>
                                {' '}to leave a review
                            </p>
                        </div>
                    )}

                    {/* Display Reviews */}
                    {reviews.length > 0 ? (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <ReviewCard
                                    key={review._id}
                                    review={review}
                                    canEdit={session?.user?.id === review.userId._id}
                                    onDelete={async (id) => {
                                        if (confirm('Delete this review?')) {
                                            await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
                                            fetchReviews();
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
                    )}
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-16 bg-gradient-to-r from-green-600 to-yellow-500 rounded-3xl p-12 text-center text-white"
                >
                    <h2 className="text-4xl font-bold mb-4">Ready to Explore {city.name}?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Book your adventure today and discover the wonders of Ethiopia
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link
                            href="/tours"
                            className="px-8 py-4 bg-white text-green-600 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg"
                        >
                            Browse All Tours
                        </Link>
                        <Link
                            href="/cities"
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold hover:bg-white/20 transition-all border-2 border-white"
                        >
                            Explore More Cities
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
