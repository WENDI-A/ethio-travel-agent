import AnimatedHero from "@/components/AnimatedHero";

export default function AnimatedHeroDemo() {
    return (
        <div>
            <AnimatedHero />

            {/* Additional content below hero */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                        Experience Ethiopia
                    </h2>
                    <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
                        Scroll down to see more content. The hero section above features continuously
                        animating image panels with smooth parallax effects.
                    </p>
                </div>
            </section>
        </div>
    );
}
