'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data: session, status } = useSession();

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Cities', href: '/cities' },
        { name: 'Tours', href: '/tours' },
        { name: 'Bookings', href: '/bookings' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-gradient">
                                🇪🇹 Ethio Travel
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Auth Buttons */}
                        {status === 'loading' ? (
                            <div className="w-20 h-10 bg-gray-200 animate-pulse rounded-full"></div>
                        ) : session ? (
                            <div className="flex items-center gap-4">
                                {/* Show Admin link if user is admin */}
                                {session.user.role === 'admin' && (
                                    <Link
                                        href="/admin"
                                        className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                                    >
                                        Admin
                                    </Link>
                                )}

                                {/* User Info */}
                                <div className="flex items-center gap-2">
                                    <UserCircleIcon className="w-8 h-8 text-gray-600" />
                                    <span className="text-sm text-gray-700">{session.user.name}</span>
                                </div>

                                {/* Sign Out Button */}
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/signin"
                                className="gradient-primary text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-700"
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Mobile Auth */}
                        {session ? (
                            <>
                                {session.user.role === 'admin' && (
                                    <Link
                                        href="/admin"
                                        className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Admin Dashboard
                                    </Link>
                                )}
                                <div className="px-3 py-2 text-sm text-gray-600">
                                    Signed in as {session.user.name}
                                </div>
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        signOut({ callbackUrl: '/' });
                                    }}
                                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/signin"
                                className="block w-full gradient-primary text-white px-6 py-2 rounded-full mt-2 text-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
