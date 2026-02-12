import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { carouselStories } from '../data/storiesData';
import { ChevronLeft, ChevronRight, Quote, Trophy, TrendingUp, Users, Star } from 'lucide-react';

const highlights = [
    { name: "AI Interviews", icon: <Trophy />, image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=300&fit=crop" },
    { name: "Resume Revamp", icon: <TrendingUp />, image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=300&h=300&fit=crop" },
    { name: "Salary Hike", icon: <TrendingUp />, image: "https://images.unsplash.com/photo-1454165833267-02300a200788?w=300&h=300&fit=crop" },
    { name: "Global Offers", icon: <Users />, image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop" },
    { name: "System Design", icon: <Trophy />, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop" },
    { name: "Tech Mentorship", icon: <Users />, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=300&fit=crop" },
    { name: "Portfolio", icon: <TrendingUp />, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop" },
    { name: "Career Pivot", icon: <Trophy />, image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=300&h=300&fit=crop" },
];

const stats = [
    { label: "Success Stories", value: "500+", sub: "Connecting ambitious professionals with their dream careers.", icon: <Trophy className="w-6 h-6 text-indigo-500" /> },
    { label: "Global Presence", value: "24", sub: "Expanding our network of success across 24 countries.", icon: <TrendingUp className="w-6 h-6 text-indigo-500" /> },
    { label: "Community Builders", value: "10K+", sub: "A vibrant network of tech professionals growing together.", icon: <Users className="w-6 h-6 text-indigo-500" /> },
];



const Stories = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const next = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % carouselStories.length);
    };
    const prev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + carouselStories.length) % carouselStories.length);
    };

    return (
        <div className="pt-8 bg-black min-h-screen text-white overflow-hidden">
            {/* 1. Hero Section */}
            <div className="max-w-7xl mx-auto px-6 pt-4 pb-12">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl lg:text-7xl font-bold tracking-tight mb-6"
                        >
                            Our story
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-400 text-lg leading-relaxed"
                        >
                            Discover the journey behind our passion, where every <br className="hidden md:block" />
                            connection we make fuels the dreams we build together.
                        </motion.p>
                    </div>
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                    >
                        Join our team
                    </motion.button>
                </div>
            </div>

            {/* 2. Success Path Highlights Marquee */}
            <div className="py-12 border-y border-zinc-900 overflow-hidden relative group bg-zinc-950/20">
                <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-xs font-bold text-indigo-500 uppercase tracking-[0.3em]"
                    >
                        Our Success Highlights
                    </motion.h2>
                </div>
                <div className="flex gap-8 animate-marquee-right whitespace-nowrap">
                    {[...highlights, ...highlights, ...highlights].map((item, i) => (
                        <div key={i} className="flex-shrink-0 relative group/item">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-zinc-800 relative overflow-hidden shadow-xl transition-all duration-500">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover scale-110 group-hover/item:scale-125 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/10 group-hover/item:bg-black/0 transition-colors" />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-white uppercase tracking-tighter opacity-0 group-hover/item:opacity-100 transition-opacity whitespace-normal text-center px-1 drop-shadow-lg">
                                {item.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Impact Stats */}
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 transition-colors group"
                        >
                            <h3 className="text-4xl lg:text-5xl font-bold text-indigo-500 mb-4">{stat.value}</h3>
                            <h4 className="text-xl font-bold mb-3">{stat.label}</h4>
                            <p className="text-zinc-500 text-sm leading-relaxed">{stat.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 4. Carousel Section */}
            <div className="max-w-7xl mx-auto px-6 pb-32">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold">Stories of Impact</h2>
                    <div className="flex gap-4">
                        <button onClick={prev} className="p-3 rounded-full border border-zinc-800 hover:bg-zinc-900 transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button onClick={next} className="p-3 rounded-full border border-zinc-800 hover:bg-zinc-900 transition-colors">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="relative aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/7] w-full overflow-hidden rounded-3xl border border-zinc-800">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0 flex flex-col md:flex-row"
                        >
                            <div className="flex-1 p-6 md:p-16 flex flex-col justify-center bg-zinc-950 relative overflow-hidden order-last md:order-first">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

                                <div className="relative">
                                    <Quote className="w-8 h-8 md:w-12 md:h-12 text-indigo-950/60 absolute -top-8 -left-4 md:-top-10 md:-left-6" />

                                    <div className="mb-4 md:mb-8 relative z-10">
                                        <h4 className="text-xl md:text-5xl font-bold text-white mb-1 md:mb-2 leading-tight">{carouselStories[currentIndex].title}</h4>
                                        <p className="text-indigo-400 font-semibold text-[10px] md:text-lg uppercase tracking-wide">{carouselStories[currentIndex].role}</p>
                                    </div>

                                    <div className="relative mb-6 md:mb-10 z-10">
                                        <p className="text-[11px] md:text-xl leading-relaxed text-zinc-400 max-w-xl">
                                            {carouselStories[currentIndex].quote}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 md:gap-6 w-max">
                                    <button
                                        onClick={() => navigate(`/story/${carouselStories[currentIndex].id}`)}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 md:px-6 md:py-3 bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 rounded-lg md:rounded-xl text-white font-semibold transition-all group/btn text-[10px] md:text-base"
                                    >
                                        Read more
                                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>

                                    <div className="flex flex-col gap-1 md:gap-2">
                                        <span className="text-zinc-500 md:text-zinc-400 font-medium text-[9px] md:text-sm">Story by {carouselStories[currentIndex].creator}</span>
                                        <div className="flex gap-0.5 md:gap-1">
                                            {[...Array(carouselStories[currentIndex].rating)].map((_, i) => (
                                                <Star key={i} className="w-2.5 md:w-3.5 h-2.5 md:h-3.5 fill-yellow-500 text-yellow-500" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-1/3 md:h-auto md:w-1/2 relative group overflow-hidden order-first md:order-last">
                                <img src={carouselStories[currentIndex].image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-110 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Stories;
