'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
    Image as ImageIcon,
    MapPin,
    Plane,
    Calendar,
    Users,
    FileText
} from 'lucide-react';

export default function AdminDashboard() {
    const { data: session } = useSession();

    const stats = [
        { name: 'Cities', value: '26', icon: MapPin, href: '/admin/cities', color: 'bg-blue-500' },
        { name: 'Tours', value: '14', icon: Plane, href: '/admin/tours', color: 'bg-green-500' },
        { name: 'Schedules', value: '42', icon: Calendar, href: '/admin/schedules', color: 'bg-purple-500' },
        { name: 'Users', value: '3', icon: Users, href: '/admin/users', color: 'bg-orange-500' },
        { name: 'Bookings', value: '4', icon: FileText, href: '/admin/bookings', color: 'bg-pink-500' },
        { name: 'Media', value: 'Manage', icon: ImageIcon, href: '/admin/media', color: 'bg-indigo-500' },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {session?.user?.name}! 👋
                </h1>
                <p className="text-blue-100">
                    Manage your Ethiopian travel platform from this dashboard
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <Link
                        key={stat.name}
                        href={stat.href}
                        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                        href="/admin/media"
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                    >
                        <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="font-medium text-gray-700">Upload Media</p>
                    </Link>
                    <Link
                        href="/admin/cities"
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                    >
                        <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="font-medium text-gray-700">Add City</p>
                    </Link>
                    <Link
                        href="/admin/tours"
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                    >
                        <Plane className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="font-medium text-gray-700">Create Tour</p>
                    </Link>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">📝 Getting Started</h3>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>Upload Ethiopian city and tour images in the Media section</li>
                    <li>Update seed data with your Cloudinary URLs</li>
                    <li>Manage bookings and user accounts</li>
                    <li>Monitor tour schedules and availability</li>
                </ul>
            </div>
        </div>
    );
}
