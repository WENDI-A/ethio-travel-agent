'use client';

import Link from 'next/link';
import SocialShare from '../SocialShare';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut" as const
        }
    }
};

export default function Footer() {
    return (
        <motion.footer
            className="bg-gray-900 text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
                        <motion.h3
                            className="text-2xl font-bold mb-4 text-gradient inline-block"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            🇪🇹 Ethio Travel
                        </motion.h3>
                        <p className="text-gray-400 mb-4">
                            Discover the beauty and rich culture of Ethiopia with our AI-powered travel platform.
                            Experience personalized tours and unforgettable adventures.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
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
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Email: info@ethiotravel.com</li>
                            <li>Phone: +251 11 123 4567</li>
                            <li>Addis Ababa, Ethiopia</li>
                        </ul>
                    </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                    <SocialShare
                        title="Ethio Travel"
                        description="Discover the beauty and rich culture of Ethiopia with our AI-powered travel platform."
                    />
                </motion.div>

                <motion.div
                    className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
                    variants={itemVariants}
                >
                    <p>&copy; {new Date().getFullYear()} Ethio Travel. All rights reserved. Powered by AI.</p>
                </motion.div>
            </div>
        </motion.footer>
    );
}
