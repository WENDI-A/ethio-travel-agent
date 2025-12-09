'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedHero() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Historical Category Images (13 images)
    // Theme: Ancient, Timeless, Golden, Serif
    const historicalImages = [
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144847/lalibla-1-1200x540_ykwakd.webp",
            alt: "Lalibela - Rock-hewn churches",
            era: "12th Century"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142098/Fasilides_Palace_01_afjpsd.jpg",
            alt: "Gondar - Camelot of Africa",
            era: "17th Century"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142032/Obelisk-of-axum-5_scqkdw.jpg",
            alt: "Axum - Ancient obelisks",
            era: "4th Century"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144668/yeha-temple-of-the-moon-4_rcr1rx.jpg",
            alt: "Yeha - Ancient temple",
            era: "700 BC"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144613/debre-damo-monastery-tigray-region-600nw-1311333149_ssjys9.jpg",
            alt: "Debre Damo - Cliff-top monastery",
            era: "6th Century"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144440/01668527_u633fh.jpg",
            alt: "Tana Kirkos - Island monastery",
            era: "Ancient"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144318/c0_bxvczi.jpg",
            alt: "Adadi Mariam - Rock-hewn church",
            era: "13th Century"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144274/98_raheuj.jpg",
            alt: "Tiya - Ancient stelae",
            era: "12th Century"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144481/93_npcujf.jpg",
            alt: "Debre Libanos - Historic monastery",
            era: "13th Century"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142311/shutterstock_1417515632_qifyaf.jpg",
            alt: "Sof Omar Caves - Sacred site",
            era: "Ancient"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142603/Visiting-Gheralta-Rock-Churches-Korkor-Lodge-credit-O.-Grunewald.jpg_rhijlp.jpg",
            alt: "Gheralta - Rock churches",
            era: "Medieval"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764143970/Gishen-Mariam-Monastery_bgki5p.jpg",
            alt: "Gishen Mariam - Pilgrimage site",
            era: "Medieval"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764143907/c2VydmljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGaGVscHRoZWZvcmdvdHRlbi5vcmclMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMjMlMkYxMCUyRnllLXdhbGRpYmEtRW5hdG9jaC0yMDAweDExMjUuanBnJmNhY2hlTWFya2VyPTE3NTg5MzM5NjAtMTAzMTgxOCZ0b2tlbj04M2I3ZTNmZmIwZjM5N2E1.q_fuxme9.jpg",
            alt: "Waldeba - Remote monastery",
            era: "Ancient"
        }
    ];

    // Cultural & Natural Category Images (13 images)
    // Theme: Vibrant, Living, Modern, Sans-Serif
    const culturalImages = [
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764145754/abiy-temesgen-PxxCP7JwAeg-unsplash_s7wnca.jpg",
            alt: "Addis Ababa - Vibrant Capital",
            tag: "Urban Life"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142430/233-2000x1024_vp3qis.jpg",
            alt: "Omo Valley - Tribal Culture",
            tag: "Living Tradition"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142357/image_2025-03-16_14-54-48_zqkpjo.png",
            alt: "Harar - Colorful Walled City",
            tag: "Heritage"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142640/konso-cultural-landscape_z4am1q.jpg",
            alt: "Konso - Cultural Landscape",
            tag: "Community"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142273/panoramic-view-bahir-dar-ethiopia-260nw-1620872395_ex7fap.jpg",
            alt: "Bahir Dar - Lake Tana",
            tag: "Nature"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142403/GettyImages-103369998-2c629549a02541b9b60f0b4fbc234178_b0e3ge.jpg",
            alt: "Semien Mountains - Roof of Africa",
            tag: "Wildlife"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142451/amazing-chemical-pools_gjrea9.jpg",
            alt: "Danakil - Alien Landscapes",
            tag: "Adventure"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142757/1_sqltof.jpg",
            alt: "Bale Mountains - Wilderness",
            tag: "Wildlife"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142505/haile-resort-arbaminch-et-migie-bc-3586765-0_zels52.jpg",
            alt: "Arba Minch - Forty Springs",
            tag: "Nature"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144198/330px-Jijiga_lsg6vj.jpg",
            alt: "Jijiga - Somali Culture",
            tag: "Culture"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764142564/Dire_dawa_2C_municipio_00_aqiqjq.jpg",
            alt: "Dire Dawa - Cultural Blend",
            tag: "Architecture"
        },
        {
            src: "https://res.cloudinary.com/dqtnppc7l/image/upload/v1764144112/Baro_river_Gambela_oai3dy.jpg",
            alt: "Gambela - River Life",
            tag: "Nature"
        },
        {
            src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
            alt: "Assosa - Blue Nile",
            tag: "Nature"
        }
    ];

    return (
        <section className="relative w-full min-h-[180vh] overflow-hidden bg-[#0a0a0a]">
            {/* Background Split */}
            <div className="absolute inset-0 flex">
                <div className="w-1/2 bg-gradient-to-br from-stone-900 via-stone-950 to-black border-r border-white/5"></div>
                <div className="w-1/2 bg-gradient-to-bl from-slate-900 via-slate-950 to-black"></div>
            </div>

            {/* Left Image Panel - HISTORICAL (Classic/Gold UI) */}
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[35%] overflow-hidden pl-8 py-8">
                <div className="absolute top-8 left-8 z-10">
                    <h3 className="text-amber-500 font-serif text-xl tracking-widest uppercase border-b border-amber-500/30 pb-2 inline-block">Historical</h3>
                </div>
                <motion.div
                    initial={{ y: 0 }}
                    animate={isClient ? { y: '-33.33%' } : { y: 0 }}
                    transition={{
                        duration: 90,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatType: 'loop'
                    }}
                    className="flex flex-col"
                >
                    {/* Triplicate images for ultra-smooth seamless loop */}
                    {[...historicalImages, ...historicalImages, ...historicalImages].map((image, idx) => (
                        <div
                            key={idx}
                            className="relative h-[280px] mb-8 flex-shrink-0 group px-4"
                        >
                            <div className="relative h-full w-full overflow-hidden border border-amber-500/20 p-2 bg-stone-900/50 backdrop-blur-sm">
                                <div className="relative h-full w-full overflow-hidden">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover sepia-[0.3] group-hover:sepia-0 transition-all duration-700 scale-100 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-amber-500/10">
                                        <p className="text-amber-400 font-serif text-xs uppercase tracking-widest mb-1">{image.era}</p>
                                        <p className="text-stone-200 font-serif text-lg leading-tight">{image.alt.split(' - ')[0]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Right Image Panel - CULTURAL (Modern/Vibrant UI) */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[35%] overflow-hidden pr-8 py-8">
                <div className="absolute top-8 right-8 z-10 text-right">
                    <h3 className="text-cyan-400 font-sans text-xl tracking-widest uppercase border-b border-cyan-400/30 pb-2 inline-block">Cultural</h3>
                </div>
                <motion.div
                    initial={{ y: '-33.33%' }}
                    animate={isClient ? { y: 0 } : { y: '-33.33%' }}
                    transition={{
                        duration: 90,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatType: 'loop'
                    }}
                    className="flex flex-col"
                >
                    {/* Triplicate images for ultra-smooth seamless loop */}
                    {[...culturalImages, ...culturalImages, ...culturalImages].map((image, idx) => (
                        <div
                            key={idx}
                            className="relative h-[280px] mb-6 flex-shrink-0 group px-4"
                        >
                            <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-cyan-900/20">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-110 brightness-90 group-hover:brightness-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-6">
                                    <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border border-cyan-500/30 mb-2 inline-block">
                                        {image.tag}
                                    </span>
                                    <p className="text-white font-sans text-lg font-bold">{image.alt.split(' - ')[0]}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Center Content - Bridging the Worlds */}
            <div className="absolute top-0 bottom-0 left-[35%] right-[35%] flex items-center justify-center px-4 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="text-center z-20 max-w-2xl"
                >
                    <div className="relative">
                        {/* Glass Panel Background */}
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-full blur-3xl transform -translate-y-4"></div>

                        <h1 className="relative text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
                            <span className="block font-serif text-amber-100/90 italic text-5xl sm:text-6xl mb-2">Where</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-cyan-200">
                                Wonders
                            </span>
                            <span className="block font-sans font-extralight tracking-[0.2em] text-4xl sm:text-5xl mt-2">
                                AWAIT
                            </span>
                        </h1>
                    </div>

                    <p className="text-lg sm:text-xl text-gray-300 mb-10 font-light leading-relaxed max-w-lg mx-auto drop-shadow-lg">
                        Discover the <span className="text-amber-400 font-serif italic">ancient wonders</span> and <span className="text-cyan-400 font-bold">breathtaking beauty</span> of Ethiopia
                    </p>


                </motion.div>
            </div>

            {/* Ambient glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] mix-blend-screen"></div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-2 text-white/50"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0"></div>
                </motion.div>
            </motion.div>
        </section>
    );
}
