'use client';

import Hero from "@/components/Hero";
import AnimatedHero from "@/components/AnimatedHero";
import FeaturedSection from "@/components/home/FeaturedSection";
import FloatingChatWidget from "@/components/chat/FloatingChatWidget";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();
    const featuredCities = [
        {
            id: 1,
            title: "Lalibela",
            image: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144847/lalibla-1-1200x540_ykwakd.webp",
            description: "Home to the famous rock-hewn churches, a UNESCO World Heritage site.",
            location: "North Wollo",
            link: "/cities/lalibela"
        },
        {
            id: 2,
            title: "Gondar",
            image: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142098/Fasilides_Palace_01_afjpsd.jpg",
            description: "Known as the 'Camelot of Africa', featuring medieval castles and churches.",
            location: "North Gondar",
            link: "/cities/gondar"
        },
        {
            id: 3,
            title: "Addis Ababa",
            image: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764145754/abiy-temesgen-PxxCP7JwAeg-unsplash_s7wnca.jpg",
            description: "The vibrant capital city, a hub of culture, history, and diplomacy.",
            location: "Shewa",
            link: "/cities/addis-ababa"
        }
    ];

    const popularTours = [
        {
            id: 1,
            title: "Simien Mountains Trek",
            image: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142403/GettyImages-103369998-2c629549a02541b9b60f0b4fbc234178_b0e3ge.jpg",
            description: "A breathtaking trekking adventure through the roof of Africa.",
            price: "$450",
            link: "/tours/simien-trek"
        },
        {
            id: 2,
            title: "Omo Valley Cultural Tour",
            image: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142430/233-2000x1024_vp3qis.jpg",
            description: "Immerse yourself in the diverse and ancient cultures of the Omo Valley.",
            price: "$600",
            link: "/tours/omo-valley"
        },
        {
            id: 3,
            title: "Danakil Depression Expedition",
            image: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142451/amazing-chemical-pools_gjrea9.jpg",
            description: "Explore one of the hottest and most alien landscapes on Earth.",
            price: "$550",
            link: "/tours/danakil"
        }
    ];

    const culturalHighlights = [
        {
            id: 1,
            title: "Coffee Ceremony",
            image: "https://images.unsplash.com/photo-1568265007297-392842407513?q=80&w=2070&auto=format&fit=crop",
            description: "Experience the traditional Ethiopian coffee ceremony, a symbol of hospitality.",
            link: "/culture/coffee"
        },
        {
            id: 2,
            title: "Timkat Festival",
            image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop",
            description: "Witness the colorful and spiritual celebration of Epiphany.",
            link: "/culture/festivals"
        },
        {
            id: 3,
            title: "Traditional Cuisine",
            image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2064&auto=format&fit=crop",
            description: "Taste the unique flavors of Injera, Doro Wat, and other delicacies.",
            link: "/culture/food"
        }
    ];

    const exploreCards = [
        {
            id: 1,
            title: "Lalibela",
            image: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144847/lalibla-1-1200x540_ykwakd.webp",
            location: "North Wollo",
            link: "/cities/lalibela"
        },
        {
            id: 2,
            title: "Gondar",
            image: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142098/Fasilides_Palace_01_afjpsd.jpg",
            location: "North Gondar",
            link: "/cities/gondar"
        },
        {
            id: 3,
            title: "Simien Mountains",
            image: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142403/GettyImages-103369998-2c629549a02541b9b60f0b4fbc234178_b0e3ge.jpg",
            location: "Amhara",
            link: "/tours/simien-trek"
        },
        {
            id: 4,
            title: "Addis Ababa",
            image: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764145754/abiy-temesgen-PxxCP7JwAeg-unsplash_s7wnca.jpg",
            location: "Shewa",
            link: "/cities/addis-ababa"
        }
    ];

    return (
        <div className="bg-gray-50">
            <Hero />


            {/* Route-Based Destinations - Horizontal Accordion */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 block">Explore The Routes</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Curated Travel Paths
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            Immerse yourself in the journey. Select a destination to expand your view.
                        </p>
                    </motion.div>

                    {/* Desktop Horizontal Accordion */}
                    <div className="hidden lg:flex h-[600px] gap-4">
                        {featuredCities.map((city, idx) => (
                            <motion.div
                                key={city.id}
                                layout
                                initial={{ flex: 1 }}
                                whileHover={{ flex: 3 }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl"
                            >
                                <Link href={city.link} className="block h-full w-full relative">
                                    <img
                                        src={city.image}
                                        alt={city.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                                    {/* Vertical Text (Collapsed State) */}
                                    <div className="absolute bottom-10 left-10 transform -rotate-90 origin-bottom-left opacity-100 group-hover:opacity-0 transition-opacity duration-300 whitespace-nowrap">
                                        <h3 className="text-3xl font-bold text-white tracking-wider">{city.title}</h3>
                                    </div>

                                    {/* Expanded Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                        <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider mb-4 rounded-full">
                                            {city.location}
                                        </span>
                                        <h3 className="text-4xl font-bold text-white mb-4">{city.title}</h3>
                                        <p className="text-gray-200 text-lg line-clamp-3 max-w-xl">{city.description}</p>
                                        <div className="mt-6 flex items-center text-blue-400 font-bold tracking-wide uppercase text-sm group-hover:gap-3 transition-all">
                                            <span>Start Route</span>
                                            <span className="text-xl">→</span>
                                        </div>
                                    </div>

                                    {/* Number Badge */}
                                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white font-mono text-lg backdrop-blur-sm">
                                        0{idx + 1}
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Vertical Stack (Fallback) */}
                    <div className="lg:hidden flex flex-col gap-6">
                        {featuredCities.map((city, idx) => (
                            <motion.div
                                key={city.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link href={city.link} className="block relative h-96 rounded-2xl overflow-hidden shadow-lg group">
                                    <img
                                        src={city.image}
                                        alt={city.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-8">
                                        <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 block">{city.location}</span>
                                        <h3 className="text-3xl font-bold text-white mb-2">{city.title}</h3>
                                        <p className="text-gray-300 line-clamp-2">{city.description}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* UNESCO World Heritage Sites - Light Theme Bento Grid */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-sans">
                            UNESCO World Heritage Sites
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">
                        {/* Large Left Card (Gondar) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-1 lg:row-span-2 relative group rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <Link href="/cities/gondar" className="block h-full">
                                <img
                                    src="https://res.cloudinary.com/dqtnppc7l/image/upload/v1764420356/gondar-2_ukgnmj.jpg"
                                    alt="Fasil Ghebbi, Gondar Region"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">Fasil Ghebbi, Gondar Region</h3>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Right Column Grid */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                            {/* Top Right (Harar) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="relative group rounded-2xl overflow-hidden cursor-pointer h-64 lg:h-auto"
                            >
                                <Link href="/cities/harar" className="block h-full">
                                    <img
                                        src="https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142357/image_2025-03-16_14-54-48_zqkpjo.png" // Using Omo image as placeholder if Harar not available, or swap
                                        alt="Harar Jugol"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <h3 className="text-xl font-bold text-white">Harar Jugol, the Fortified Historic Town</h3>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* Top Right 2 (Omo Valley) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative group rounded-2xl overflow-hidden cursor-pointer h-64 lg:h-auto"
                            >
                                <Link href="/tours/omo-valley" className="block h-full">
                                    <img
                                        src="https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142403/GettyImages-103369998-2c629549a02541b9b60f0b4fbc234178_b0e3ge.jpg" // Simien placeholder
                                        alt="Lower Valley of the Omo"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <h3 className="text-xl font-bold text-white">Lower Valley of the Omo</h3>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* Bottom Wide Card (Tiya or Aksum) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="md:col-span-2 relative group rounded-2xl overflow-hidden cursor-pointer h-64 lg:h-auto"
                            >
                                <Link href="/cities/axum" className="block h-full">
                                    <img
                                        src="https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144847/lalibla-1-1200x540_ykwakd.webp" // Lalibela placeholder
                                        alt="Rock-Hewn Churches, Lalibela"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <h3 className="text-xl font-bold text-white">Rock-Hewn Churches, Lalibela</h3>
                                    </div>
                                    <div className="absolute bottom-6 right-6">
                                        <div className="w-12 h-12 rounded-full bg-blue-600/80 backdrop-blur-sm flex items-center justify-center">
                                            <span className="text-white text-xl">→</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Where Wonders Await - Animated Hero Section */}
            <AnimatedHero />

            {/* Explore Ethiopia - Premium Interactive Section */}
            <section className="relative pt-16 pb-32 overflow-hidden mt-24 bg-gray-50">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20 "
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="inline-block mb-4"
                        >
                            <span className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold uppercase tracking-widest rounded-full shadow-lg">
                                Discover More
                            </span>
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                            Explore Ethiopia
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Immerse yourself in breathtaking destinations and unforgettable experiences
                        </p>
                    </motion.div>

                    {/* Premium Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Konso Landscape",
                                image: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142640/konso-cultural-landscape_z4am1q.jpg",
                                description: "Discover the terraced hills and unique cultural traditions of the Konso people.",
                                location: "SNNPR",
                                link: "/cities/konso"
                            },
                            {
                                title: "Bale Mountains",
                                image: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142757/1_sqltof.jpg",
                                description: "Explore the wild alpine scenery and spot the rare Ethiopian Wolf.",
                                location: "Oromia",
                                link: "/tours/bale-mountains"
                            },
                            {
                                title: "Arba Minch",
                                image: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142505/haile-resort-arbaminch-et-migie-bc-3586765-0_zels52.jpg",
                                description: "Visit the 'Forty Springs' and the gateway to Nechisar National Park.",
                                location: "SNNPR",
                                link: "/cities/arba-minch"
                            },
                            {
                                title: "Dire Dawa",
                                image: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142564/Dire_dawa_2C_municipio_00_aqiqjq.jpg",
                                description: "Experience the unique blend of French and Ethiopian culture and architecture.",
                                location: "Dire Dawa",
                                link: "/cities/dire-dawa"
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: idx * 0.15,
                                    duration: 0.7,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                whileHover={{
                                    y: -12,
                                    rotateY: 5,
                                    rotateX: -5,
                                    transition: { duration: 0.3 }
                                }}
                                style={{ perspective: 1000 }}
                            >
                                <Link href={item.link}>
                                    <div className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer transform-gpu">
                                        {/* Image with Parallax Effect */}
                                        <div className="absolute inset-0 overflow-hidden">
                                            <motion.img
                                                whileHover={{ scale: 1.15 }}
                                                transition={{ duration: 0.6, ease: "easeOut" }}
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Gradient Overlays */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        {/* Shimmer Effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                        </div>

                                        {/* Floating Badge */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.15 + 0.3 }}
                                            className="absolute top-6 right-6 z-20"
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl group-hover:bg-white/20 transition-all duration-300">
                                                <span className="text-white font-mono text-lg font-bold">
                                                    {String(idx + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                        </motion.div>

                                        {/* Glassmorphism Content Card */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-500">
                                            {/* Location Badge */}
                                            {'location' in item && (
                                                <motion.div
                                                    initial={{ x: -20, opacity: 0 }}
                                                    whileInView={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: idx * 0.15 + 0.4 }}
                                                    className="inline-block mb-3"
                                                >
                                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/30">
                                                        📍 {(item as any).location}
                                                    </span>
                                                </motion.div>
                                            )}

                                            {/* Title with Gradient */}
                                            <h3 className="text-2xl font-extrabold text-white mb-3 drop-shadow-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-200 group-hover:to-purple-200 group-hover:bg-clip-text transition-all duration-300">
                                                {item.title}
                                            </h3>

                                            {/* Description (Hidden by default, shown on hover) */}
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                className="text-gray-200 text-sm mb-4 overflow-hidden group-hover:opacity-100 opacity-0 transition-all duration-500 line-clamp-2"
                                            >
                                                {item.description}
                                            </motion.p>

                                            {/* CTA Button with Glassmorphism */}
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        if (!session) {
                                                            router.push('/signin');
                                                        } else {
                                                            router.push(item.link);
                                                        }
                                                    }}
                                                    className="flex-1 relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-2xl transform group-hover:scale-105 transition-all duration-300 border border-white/20"
                                                >
                                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                                        Book Now
                                                        <motion.span
                                                            animate={{ x: [0, 5, 0] }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                        >
                                                            →
                                                        </motion.span>
                                                    </span>
                                                    {/* Button Shine Effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                                                </button>

                                                {/* Info Icon */}
                                                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                                                    <span className="text-white text-xl">ℹ️</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Border Glow Effect */}
                                        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
                                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_rgba(59,130,246,0.5)]"></div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-center mt-16"
                    >
                        <Link href="/cities">
                            <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transform hover:scale-105 transition-all duration-300 overflow-hidden">
                                <span className="relative z-10 flex items-center gap-3">
                                    View All Destinations
                                    <motion.span
                                        animate={{ x: [0, 8, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="text-2xl"
                                    >
                                        →
                                    </motion.span>
                                </span>
                                {/* Button Background Animation */}
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Floating Chat Widget */}
            <div className="relative overflow-visible min-h-[100px]">
                <FloatingChatWidget />
            </div>

            {/* Call to Action */}
            <section className="py-24 bg-gradient-to-r from-green-800 to-green-900 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-xl text-green-100 mb-10">
                        Let us help you plan an unforgettable trip to the Land of Origins.
                    </p>
                    <Link href="/tours">
                        <button className="bg-yellow-500 hover:bg-yellow-400 text-green-900 px-10 py-4 rounded-full text-lg font-bold shadow-xl transition-all duration-300 transform hover:scale-105">
                            Plan My Trip
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
