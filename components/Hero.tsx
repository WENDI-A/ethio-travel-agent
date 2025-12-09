'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Video - Ethiopian Beautiful Places */}
            <div className="absolute inset-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    {/* 
                        TODO: Upload your Ethiopian landscape video to Cloudinary and replace this URL
                        Recommended: Search "Ethiopia landscape" on Pexels.com or Pixabay.com
                        Download the video, upload to your Cloudinary account, and use that URL here
                        For now, using a placeholder mountain landscape video
                    */}
                    <source src="https://res.cloudinary.com/dqtnppc7l/video/upload/v1764338463/lalibela_alemqz.mp4" type="video/mp4" />
                    {/* Fallback background image if video fails to load */}
                    <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142403/GettyImages-103369998-2c629549a02541b9b60f0b4fbc234178_b0e3ge.jpg')] bg-cover bg-center bg-no-repeat"></div>
                </video>
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-lg md:text-xl text-gray-200 mb-4 font-light tracking-wide">Welcome to Your Ethiopia</p>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="block text-yellow-400 mt-2 drop-shadow-lg">Land Of Origins</span>
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-10">
                        <Link href="/tours">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300 border-2 border-transparent"
                            >
                                Explore Tours
                            </motion.button>
                        </Link>

                        <Link href="/cities">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-transparent hover:bg-white/10 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300 border-2 border-white backdrop-blur-sm"
                            >
                                View Destinations
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white z-20"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm font-light tracking-widest uppercase">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1"
                    >
                        <div className="w-1 h-3 bg-white rounded-full"></div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Wave Divider */}
            <div className="wave-divider">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
        </div>
    );
}
