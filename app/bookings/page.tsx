'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';

interface Booking {
    _id: string;
    bookingType: 'tour' | 'attraction';
    tourId?: {
        title: string;
        images: string[];
    };
    itemDetails?: {
        name: string;
        image: string;
        city?: string;
    };
    bookingDate: Date;
    numberOfPeople: number;
    totalPrice: number;
    status: string;
    paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
    createdAt: Date;
}

export default function BookingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin');
        } else if (status === 'authenticated') {
            fetchBookings();
        }
    }, [status]);

    const fetchBookings = async () => {
        try {
            const res = await fetch('/api/bookings');
            const data = await res.json();
            if (data.success) {
                setBookings(data.data);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async (bookingId: string) => {
        setPaymentLoading(bookingId);
        try {
            const response = await fetch('/api/payments/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookingId }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Failed to create payment session');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setPaymentLoading(null);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
    };

    const getPaymentStatusBadge = (paymentStatus: string) => {
        const config = {
            pending: { icon: Clock, text: 'Pending', class: 'bg-yellow-100 text-yellow-800' },
            completed: { icon: CheckCircle, text: 'Paid', class: 'bg-green-100 text-green-800' },
            failed: { icon: XCircle, text: 'Failed', class: 'bg-red-100 text-red-800' },
            refunded: { icon: XCircle, text: 'Refunded', class: 'bg-gray-100 text-gray-800' },
        };
        return config[paymentStatus as keyof typeof config] || config.pending;
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                    <p className="text-gray-600">Loading your bookings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-green-50 to-yellow-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold mb-4">
                        My <span className="text-gradient">Bookings</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        View and manage your tour bookings
                    </p>
                </motion.div>

                {bookings.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-12 rounded-2xl shadow-lg max-w-2xl mx-auto text-center"
                    >
                        <div className="text-6xl mb-4">📅</div>
                        <h2 className="text-2xl font-bold mb-4">No Bookings Yet</h2>
                        <p className="text-gray-600 mb-6">
                            Start your Ethiopian adventure by booking a tour!
                        </p>
                        <Link
                            href="/tours"
                            className="inline-block gradient-primary text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                        >
                            Browse Tours
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking, idx) => {
                            const PaymentIcon = getPaymentStatusBadge(booking.paymentStatus).icon;
                            const tourTitle = booking.bookingType === 'tour'
                                ? booking.tourId?.title
                                : booking.itemDetails?.name;
                            const tourImage = booking.bookingType === 'tour'
                                ? booking.tourId?.images[0]
                                : booking.itemDetails?.image;

                            return (
                                <motion.div
                                    key={booking._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                                >
                                    {/* Image */}
                                    <div className="relative h-48">
                                        <img
                                            src={tourImage || '/placeholder-tour.jpg'}
                                            alt={tourTitle}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2">
                                            {tourTitle}
                                        </h3>

                                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                <span>{booking.numberOfPeople} {booking.numberOfPeople === 1 ? 'Person' : 'People'}</span>
                                            </div>
                                            {booking.itemDetails?.city && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{booking.itemDetails.city}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                            <div>
                                                <p className="text-2xl font-bold text-green-600">
                                                    ${booking.totalPrice}
                                                </p>
                                                <div className={`flex items-center gap-1 text-xs mt-1 px-2 py-1 rounded-full ${getPaymentStatusBadge(booking.paymentStatus).class}`}>
                                                    <PaymentIcon className="w-3 h-3" />
                                                    <span>{getPaymentStatusBadge(booking.paymentStatus).text}</span>
                                                </div>
                                            </div>

                                            {booking.paymentStatus === 'pending' && (
                                                <button
                                                    onClick={() => handlePayment(booking._id)}
                                                    disabled={paymentLoading === booking._id}
                                                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                                                >
                                                    {paymentLoading === booking._id ? (
                                                        <>
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                            <span>Processing...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CreditCard className="w-4 h-4" />
                                                            <span>Pay Now</span>
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
