'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, Trash2, Calendar, Users, DollarSign, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

interface Booking {
    _id: string;
    userId: { _id: string; name: string; email: string };
    tourId: { _id: string; title: string; price: number };
    scheduleId: { _id: string; startDate: string; endDate: string; availableSlots: number; bookedSlots: number };
    numberOfPeople: number;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    paymentStatus: 'pending' | 'paid' | 'refunded';
    specialRequests?: string;
    createdAt: string;
}

export default function BookingDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (id) {
            fetchBooking();
        }
    }, [id]);

    const fetchBooking = async () => {
        try {
            const res = await fetch(`/api/bookings/${id}`);
            const data = await res.json();
            if (data.success) {
                setBooking(data.data);
            }
        } catch (error) {
            console.error('Error fetching booking:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (newStatus: string) => {
        if (!confirm(`Are you sure you want to ${newStatus} this booking?`)) return;

        setUpdating(true);
        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json();
            if (data.success) {
                setBooking(data.data);
                alert(`Booking ${newStatus} successfully!`);
            } else {
                alert('Error updating booking: ' + data.error);
            }
        } catch (error) {
            alert('Error updating booking');
        } finally {
            setUpdating(false);
        }
    };

    const deleteBooking = async () => {
        if (!confirm('Are you sure you want to delete this booking? This action cannot be undone.')) return;

        setUpdating(true);
        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (data.success) {
                alert('Booking deleted successfully!');
                router.push('/admin/bookings');
            } else {
                alert('Error deleting booking: ' + data.error);
            }
        } catch (error) {
            alert('Error deleting booking');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Booking not found</p>
                <Link href="/admin/bookings" className="text-blue-600 hover:underline mt-4 inline-block">
                    Back to Bookings
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/bookings"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
                        <p className="text-sm text-gray-500">ID: {booking._id}</p>
                    </div>
                </div>

                {/* Status Badge */}
                <span
                    className={`px-4 py-2 text-sm font-semibold rounded-full ${booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : booking.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                        }`}
                >
                    {booking.status.toUpperCase()}
                </span>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Booking Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Tour Information */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tour Information</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm text-gray-500">Tour Name</label>
                                <p className="font-medium text-gray-900">{booking.tourId?.title || 'N/A'}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-500">Start Date</label>
                                    <p className="font-medium text-gray-900">
                                        {booking.scheduleId?.startDate
                                            ? new Date(booking.scheduleId.startDate).toLocaleDateString()
                                            : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">End Date</label>
                                    <p className="font-medium text-gray-900">
                                        {booking.scheduleId?.endDate
                                            ? new Date(booking.scheduleId.endDate).toLocaleDateString()
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm text-gray-500">Name</label>
                                <p className="font-medium text-gray-900">{booking.userId?.name || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Email</label>
                                <p className="font-medium text-gray-900">{booking.userId?.email || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Special Requests */}
                    {booking.specialRequests && (
                        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Special Requests</h2>
                            <p className="text-gray-700">{booking.specialRequests}</p>
                        </div>
                    )}
                </div>

                {/* Right Column - Actions & Summary */}
                <div className="space-y-6">
                    {/* Booking Summary */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Number of People</p>
                                    <p className="font-semibold text-gray-900">{booking.numberOfPeople}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <DollarSign className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Total Price</p>
                                    <p className="font-semibold text-gray-900">${booking.totalPrice}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Booked On</p>
                                    <p className="font-semibold text-gray-900">
                                        {new Date(booking.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-500">Payment Status</p>
                                <span
                                    className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full ${booking.paymentStatus === 'paid'
                                        ? 'bg-green-100 text-green-800'
                                        : booking.paymentStatus === 'refunded'
                                            ? 'bg-gray-100 text-gray-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                >
                                    {booking.paymentStatus.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
                        <div className="space-y-3">
                            {booking.status === 'pending' && (
                                <button
                                    onClick={() => updateStatus('confirmed')}
                                    disabled={updating}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Approve Booking
                                </button>
                            )}

                            {(booking.status === 'pending' || booking.status === 'confirmed') && (
                                <button
                                    onClick={() => updateStatus('cancelled')}
                                    disabled={updating}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                                >
                                    <XCircle className="w-4 h-4" />
                                    Cancel Booking
                                </button>
                            )}

                            {booking.status === 'confirmed' && (
                                <button
                                    onClick={() => updateStatus('completed')}
                                    disabled={updating}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Mark as Completed
                                </button>
                            )}

                            <div className="pt-3 border-t border-gray-200">
                                <button
                                    onClick={deleteBooking}
                                    disabled={updating}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
