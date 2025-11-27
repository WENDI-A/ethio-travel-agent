import Hero from "@/components/Hero";

export default function Home() {
    return (
        <div>
            <Hero />

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-gray-800">
                            Why Choose <span className="text-gradient">Ethio Travel</span>?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We combine cutting-edge AI technology with deep local knowledge to create
                            unforgettable Ethiopian travel experiences
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: '🤖',
                                title: 'AI Travel Assistant',
                                description: 'Get instant answers to all your travel questions 24/7',
                            },
                            {
                                icon: '⭐',
                                title: 'Personalized Recommendations',
                                description: 'Tours tailored to your preferences and budget',
                            },
                            {
                                icon: '🎨',
                                title: 'AI-Generated Content',
                                description: 'Rich descriptions and stunning visuals for every destination',
                            },
                            {
                                icon: '🌍',
                                title: 'Multilingual Support',
                                description: 'Available in Amharic, English, and more languages',
                            },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-gradient-to-br from-green-50 to-yellow-50 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-br from-green-50 to-yellow-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6 text-gray-800">
                        Ready to Explore Ethiopia?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Start your journey today with personalized AI-powered recommendations
                    </p>
                    <button className="gradient-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        Get Started Now
                    </button>
                </div>
            </section>
        </div>
    );
}
