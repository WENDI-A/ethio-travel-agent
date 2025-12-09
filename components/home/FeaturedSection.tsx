'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Item {
    id: string | number;
    title: string;
    image: string;
    description?: string;
    price?: string;
    location?: string;
    link: string;
}

interface FeaturedSectionProps {
    title: string;
    subtitle: string;
    items: Item[];
    viewAllLink?: string;
    viewAllText?: string;
    bgColor?: string;
}

export default function FeaturedSection({
    title,
    subtitle,
    items,
    viewAllLink,
    viewAllText = "View All",
    bgColor = "bg-white"
}: FeaturedSectionProps) {
    return (
        <section className={`py-20 ${bgColor}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold mb-3 text-gray-900">{title}</h2>
                        <p className="text-xl text-gray-600 max-w-2xl">{subtitle}</p>
                    </motion.div>

                    {viewAllLink && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="hidden md:block"
                        >
                            <Link
                                href={viewAllLink}
                                className="flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors"
                            >
                                {viewAllText} <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Image Container - Non-clickable with modern styling */}
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                {/* Price Badge with Glassmorphism */}
                                {item.price && (
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg">
                                        {item.price}
                                    </div>
                                )}

                                {/* Location Badge */}
                                {item.location && (
                                    <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white uppercase tracking-wider shadow-lg">
                                        📍 {item.location}
                                    </div>
                                )}

                                {/* Title Overlay on Image */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Content Section - Clickable */}
                            <Link href={item.link}>
                                <div className="p-6 bg-gradient-to-br from-white to-gray-50 cursor-pointer hover:from-green-50 hover:to-white transition-all duration-300">
                                    {item.description && (
                                        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {item.description}
                                        </p>
                                    )}

                                    {/* CTA Button */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-green-600 font-semibold text-sm group-hover:text-green-700 transition-colors">
                                            Learn More
                                        </span>
                                        <div className="flex items-center gap-1 text-green-600 group-hover:translate-x-2 transition-transform duration-300">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {viewAllLink && (
                    <div className="mt-12 text-center md:hidden">
                        <Link
                            href={viewAllLink}
                            className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition-colors"
                        >
                            {viewAllText} <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
