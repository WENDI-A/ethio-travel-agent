import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4 text-gradient">
                            🇪🇹 Ethio Travel
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Discover the beauty and rich culture of Ethiopia with our AI-powered travel platform.
                            Experience personalized tours and unforgettable adventures.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/cities" className="text-gray-400 hover:text-green-400 transition-colors">
                                    Cities
                                </Link>
                            </li>
                            <li>
                                <Link href="/tours" className="text-gray-400 hover:text-green-400 transition-colors">
                                    Tours
                                </Link>
                            </li>
                            <li>
                                <Link href="/bookings" className="text-gray-400 hover:text-green-400 transition-colors">
                                    My Bookings
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Email: info@ethiotravel.com</li>
                            <li>Phone: +251 11 123 4567</li>
                            <li>Addis Ababa, Ethiopia</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Ethio Travel. All rights reserved. Powered by AI.</p>
                </div>
            </div>
        </footer>
    );
}
