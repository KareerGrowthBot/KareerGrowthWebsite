import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchStories, fetchHighlights, fetchImpactStats, getImageUrl, fetchCategories } from '../utils/api';
import { ChevronLeft, ChevronRight, Quote, Trophy, TrendingUp, Users, Star, RotateCcw, Globe } from 'lucide-react';
import { StorySkeleton, StatSkeleton } from '../components/common/Skeleton';
import StoryCard from '../components/stories/StoryCard';

const Stories = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [stories, setStories] = useState([]);
    const [highlights, setHighlights] = useState([]);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');

    const [categories, setCategories] = useState(['All']);

    const getStoriesData = async () => {
        setLoading(true);
        setError(false);
        try {
            const [storiesRes, highlightsData, statsData, categoriesRes] = await Promise.all([
                fetchStories(1, 10), // Limit of 10 as requested
                fetchHighlights(),
                fetchImpactStats(),
                fetchCategories()
            ]);
            console.log('Stories Data Received:', storiesRes);
            setStories(storiesRes.data || []);
            setHighlights(highlightsData);
            setStats(statsData);
            setCategories(['All', ...(categoriesRes.stories || []).map(c => c.name)]);
        } catch (err) {
            console.error('Error in getStoriesData:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getStoriesData();
    }, []);

    useEffect(() => {
        if (stories.length <= 1) return;
        const timer = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex, stories]);

    const next = () => {
        if (stories.length <= 1) return;
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % stories.length);
    };
    const prev = () => {
        if (stories.length <= 1) return;
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
    };

    const filteredStories = useMemo(() => {
        if (activeCategory === 'All') return stories;
        return stories.filter(s => s.category === activeCategory);
    }, [stories, activeCategory]);

    // Create a robust marquee list that always fills at least 2x screen width
    const marqueeItems = useMemo(() => {
        if (!highlights.length) return [];
        // Aim for at least 30 items total to ensure it spans and loops on all screens
        const minItems = 30;
        const repeatCount = Math.max(2, Math.ceil(minItems / highlights.length));
        let result = [];
        for (let i = 0; i < repeatCount; i++) {
            result = [...result, ...highlights];
        }
        return result;
    }, [highlights]);

    return (
        <div className="pt-24 bg-black min-h-screen text-white">
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
                {loading ? (
                    <div className="flex gap-8 justify-center opacity-50">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-zinc-800 animate-pulse" />
                        ))}
                    </div>
                ) : highlights.length > 0 ? (
                    <div className="relative flex overflow-hidden whitespace-nowrap">
                        <div
                            className="flex gap-10 px-4 py-8 animate-marquee-left"
                            style={{
                                animationDuration: highlights.length > 5 ? '40s' : '25s',
                                animationPlayState: 'running',
                                minWidth: 'max-content'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                            onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
                        >
                            {marqueeItems.map((item, i) => (
                                <div key={i} className="inline-block relative group/item">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-zinc-800 relative overflow-hidden shadow-xl transition-all duration-500 bg-zinc-900 flex-shrink-0">
                                        <img
                                            src={getImageUrl(item.image)}
                                            alt={item.name}
                                            className="w-full h-full object-cover scale-110 group-hover/item:scale-125 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover/item:bg-black/0 transition-colors" />
                                    </div>

                                    {/* Hover Tooltip */}
                                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full text-[10px] font-bold text-white whitespace-nowrap opacity-0 group-hover/item:opacity-100 transition-all shadow-xl pointer-events-none z-50">
                                        {item.highlightTitle || item.title}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-4 text-zinc-600">No highlights available</div>
                )}
            </div>

            {/* 3. Impact Stats */}
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {loading ? (
                        <>
                            <StatSkeleton />
                            <StatSkeleton />
                            <StatSkeleton />
                        </>
                    ) : stats.length > 0 ? (
                        stats.map((stat, i) => (
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
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-8 text-zinc-600">No impact stats recorded yet.</div>
                    )}
                </div>
            </div>

            {/* 4. Carousel Section */}
            <div className="max-w-7xl mx-auto px-6 pb-32">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold">Stories of Impact</h2>
                    {!loading && !error && stories.length > 1 && (
                        <div className="flex gap-4">
                            <button onClick={prev} className="p-3 rounded-full border border-zinc-800 hover:bg-zinc-900 transition-colors">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button onClick={next} className="p-3 rounded-full border border-zinc-800 hover:bg-zinc-900 transition-colors">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>

                {loading ? (
                    <StorySkeleton />
                ) : error ? (
                    <div className="py-24 text-center border border-zinc-800 rounded-[3rem] bg-zinc-950/50 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-4">No Stories Yet</h2>
                        <p className="text-zinc-500 max-w-sm mx-auto">We're currently curating our success stories. Please check back soon!</p>
                    </div>
                ) : stories.length === 0 ? (
                    <div className="py-24 text-center border border-zinc-800 rounded-[3rem] bg-zinc-950/50">
                        <h2 className="text-2xl font-bold mb-4">No Stories Yet</h2>
                        <p className="text-zinc-500">Initial success stories are being curated. Check back soon!</p>
                    </div>
                ) : (
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
                                            <h4 className="text-xl md:text-5xl font-bold text-white mb-1 md:mb-2 leading-tight">{stories[currentIndex].title}</h4>
                                            <p className="text-indigo-400 font-semibold text-[10px] md:text-lg uppercase tracking-wide">{stories[currentIndex].role}</p>
                                        </div>

                                        <div className="relative mb-6 md:mb-10 z-10">
                                            <p className="text-[11px] md:text-xl leading-relaxed text-zinc-400 max-w-xl">
                                                {stories[currentIndex].quote}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4 md:gap-6 w-max">
                                        <button
                                            onClick={() => {
                                                const storyId = stories[currentIndex].storyId || stories[currentIndex].id;
                                                console.log('Navigating from carousel to story:', storyId);
                                                navigate(`/story/${storyId}`);
                                            }}
                                            className="inline-flex items-center gap-1.5 px-4 py-2 md:px-6 md:py-3 bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 rounded-lg md:rounded-xl text-white font-semibold transition-all group/btn text-[10px] md:text-base"
                                        >
                                            Read more
                                            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>

                                        <div className="flex flex-col gap-1 md:gap-2">
                                            <span className="text-zinc-500 md:text-zinc-400 font-medium text-[9px] md:text-sm">Story by {stories[currentIndex].creator}</span>
                                            <div className="flex gap-0.5 md:gap-1">
                                                {[...Array(stories[currentIndex].rating)].map((_, i) => (
                                                    <Star key={i} className="w-2.5 md:w-3.5 h-2.5 md:h-3.5 fill-yellow-500 text-yellow-500" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-1/3 md:h-auto md:w-1/2 relative group overflow-hidden order-first md:order-last">
                                    <img src={getImageUrl(stories[currentIndex].image)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-110 transition-all duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent" />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* 5. Categorized Cards Section */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Explore All Stories</h2>
                        <p className="text-zinc-500 text-sm">Real journeys from real professionals across different industries.</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeCategory === cat
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="aspect-[16/10] rounded-[1.5rem] bg-zinc-900 animate-pulse" />
                        ))}
                    </div>
                ) : filteredStories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-16">
                        {filteredStories.map((story, index) => (
                            <StoryCard key={story.id} story={story} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border border-dashed border-zinc-800 rounded-3xl">
                        <Trophy className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-zinc-500">No stories found in this category</h3>
                        <p className="text-zinc-600 text-sm mt-1">Try selecting a different category or check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stories;
