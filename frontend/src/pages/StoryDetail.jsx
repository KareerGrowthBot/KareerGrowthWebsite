import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, Quote, Trophy, TrendingUp, ArrowRight, RotateCcw } from 'lucide-react';
import { fetchStoryById, getImageUrl } from '../utils/api';
import { StoryDetailSkeleton } from '../components/common/Skeleton';

const StoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getStory = async () => {
        setLoading(true);
        setError(false);
        try {
            const data = await fetchStoryById(id);
            setStory(data);
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getStory();
    }, [id]);

    if (loading) {
        return <StoryDetailSkeleton />;
    }

    if (error || !story) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
                {error ? (
                    <RotateCcw className="w-16 h-16 text-red-500/20 mb-6" />
                ) : (
                    <Trophy className="w-16 h-16 text-zinc-800 mb-6 opacity-20" />
                )}
                <h1 className="text-2xl md:text-4xl font-bold mb-4">
                    {error ? "Connection Error" : "Story Not Found"}
                </h1>
                <p className="text-zinc-500 mb-8 max-w-sm text-sm">
                    {error
                        ? "We couldn't reach the server. Please check your connection or try again."
                        : "We couldn't find the specific story you're looking for. It might have been moved or renamed."}
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('/stories')}
                        className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors text-sm font-semibold"
                    >
                        <ChevronLeft className="w-5 h-5" /> Back to Stories
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-20">
            {/* Back Navigation Bar - COMPLETELY ON TOP, NOT OVER IMAGE */}
            <div className="border-b border-zinc-900/50 bg-black/40 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 py-1 flex items-center">
                    <button
                        onClick={() => navigate('/stories')}
                        className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors group text-[10px] md:text-sm font-semibold uppercase tracking-widest px-3 py-1 rounded-full hover:bg-white/5"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Stories
                    </button>
                </div>
            </div>

            {/* 1. Full-Height Hero Section */}
            <div className="relative h-[50vh] md:h-[70vh] overflow-hidden flex flex-col">
                <div className="absolute inset-0 z-0">
                    <img src={getImageUrl(story.image)} alt="" className="w-full h-full object-cover opacity-40 scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Content - Bottom Aligned */}
                <div className="max-w-5xl mx-auto w-full px-6 pb-12 mt-auto relative z-10 text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl md:text-7xl font-bold mb-6 md:mb-8 leading-tight">{story.title}</h1>
                        <div className="flex flex-wrap items-center gap-3 md:gap-8">
                            <div className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full backdrop-blur-md">
                                <span className="text-indigo-400 font-bold text-[10px] md:text-sm uppercase tracking-widest">{story.role}</span>
                            </div>
                            <div className="flex gap-1 bg-zinc-950/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-800">
                                {[...Array(story.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 md:w-3.5 md:h-3.5 fill-yellow-500 text-yellow-500" />
                                ))}
                                <span className="ml-2 text-[10px] md:text-xs font-bold text-zinc-400">Verified Success</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 2. Content Sections - "The Boxes" */}
            <div className="max-w-5xl mx-auto px-6 pb-24 md:pb-32">
                <div className="grid grid-cols-1 gap-6 md:gap-8">
                    {/* Intro Quote Card */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] bg-zinc-900/20 border border-zinc-800 relative overflow-hidden group"
                    >
                        <Quote className="w-12 h-12 md:w-16 md:h-16 text-indigo-500/10 absolute -top-4 -left-4 rotate-12" />
                        <p className="text-base md:text-3xl font-medium leading-relaxed text-zinc-200 relative z-10 italic">
                            "{story.quote}"
                        </p>
                        <div className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4 relative z-10">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-bold text-white text-sm md:text-base">
                                {story.creator ? story.creator.charAt(0) : 'U'}
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm md:text-base">{story.creator}</p>
                                <p className="text-zinc-500 text-[10px] uppercase tracking-tighter">Success Contributor</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Full Detailed Story */}
                    {story.content && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-8 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] bg-zinc-900/10 border border-zinc-900/50"
                        >
                            <h3 className="text-indigo-400 font-bold uppercase tracking-widest text-[10px] mb-6">The Journey</h3>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-zinc-300 leading-relaxed text-sm md:text-lg whitespace-pre-wrap">
                                    {story.content}
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Detailed Analysis Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {/* Challenge Box */}
                        <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-zinc-900/40 border border-zinc-800 space-y-3 md:space-y-4">
                            <h3 className="text-indigo-400 font-bold uppercase tracking-widest text-[10px]">The Challenge</h3>
                            <p className="text-zinc-400 leading-relaxed text-xs md:text-base">
                                {story.challenge}
                            </p>
                        </div>
                        {/* Strategy Box */}
                        <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-zinc-900/40 border border-zinc-800 space-y-3 md:space-y-4 font-sans">
                            <h3 className="text-indigo-400 font-bold uppercase tracking-widest text-[10px]">The Strategy</h3>
                            <p className="text-zinc-400 leading-relaxed text-xs md:text-base">
                                {story.strategy}
                            </p>
                        </div>
                    </div>

                    {/* Result Card - The High Impact Box */}
                    <div className="p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-indigo-900/20 to-zinc-950 border border-indigo-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                            <div className="max-w-xl space-y-4 md:space-y-6 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    <Trophy className="w-3.5 h-3.5" /> Final Outcome
                                </div>
                                <h2 className="text-2xl md:text-5xl font-bold leading-tight">Driving Real-World Results</h2>
                                <p className="text-zinc-400 text-xs md:text-xl leading-relaxed">
                                    {story.result}
                                </p>
                            </div>

                            {story.metric && (
                                <div className="flex-shrink-0 text-center space-y-1 md:space-y-2">
                                    <div className="text-5xl md:text-7xl font-bold text-white tracking-tighter">{story.metric.split(' ')[0]}</div>
                                    <div className="text-indigo-400 font-bold uppercase tracking-tighter text-[10px] md:text-base">{story.metric.split(' ').slice(1).join(' ')}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CTA Box */}
                    <div className="mt-8 md:mt-12 p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-indigo-600 text-center space-y-4 md:space-y-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                        <h2 className="text-2xl md:text-5xl font-bold text-white relative z-10">Start Your Own Success Story</h2>
                        <p className="text-indigo-100 text-sm md:text-xl relative z-10 max-w-2xl mx-auto">
                            Join elite tech professionals who have already accelerated their careers using our proprietary AI tools and mentorship.
                        </p>
                        <button
                            onClick={() => navigate('/contact')}
                            className="relative z-10 px-6 py-3 md:px-8 md:py-4 bg-white text-indigo-600 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 mx-auto"
                        >
                            Get Started Now <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryDetail;
