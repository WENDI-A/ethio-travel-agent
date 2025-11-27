export default function BookingsPage() {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-green-50 to-yellow-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-4">
                        My <span className="text-gradient">Bookings</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        View and manage your tour bookings
                    </p>

                    <div className="bg-white p-12 rounded-2xl shadow-lg max-w-2xl mx-auto">
                        <div className="text-6xl mb-4">🔐</div>
                        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
                        <p className="text-gray-600 mb-6">
                            Please sign in to view your bookings
                        </p>
                        <button className="gradient-primary text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
