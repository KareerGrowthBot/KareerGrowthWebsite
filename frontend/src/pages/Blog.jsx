import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { fetchBlogs, fetchBlogStats, fetchCategories } from '../utils/api';
import BlogCard from '../components/blog/BlogCard';
import BlogStats from '../components/blog/BlogStats';
import FeaturedSection from '../components/blog/FeaturedSection';
import { Search, RotateCcw } from 'lucide-react';
import { BlogSkeleton, FeaturedSkeleton, StatSkeleton } from '../components/common/Skeleton';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [categories, setCategories] = useState(['All']);

    const getBlogData = async () => {
        setLoading(true);
        setError(false);
        try {
            const [blogsRes, statsData, categoriesRes] = await Promise.all([
                fetchBlogs(1, 50), // Fetch more for filtering on client side for now
                fetchBlogStats(),
                fetchCategories()
            ]);
            setBlogs(blogsRes.data || []);
            setStats(statsData);
            setCategories(['All', ...(categoriesRes.blogs || []).map(c => c.name)]);
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getBlogData();
    }, []);

    const mainPost = blogs.length > 0 ? (blogs.length > 1 ? blogs[1] : blogs[0]) : null;
    const sidebarPosts = blogs.length > 2 ? blogs.slice(2, 7) : [];

    const filteredBlogs = useMemo(() => {
        if (activeCategory === 'All') return blogs.slice(0, 12);
        return blogs.filter(b => b.category === activeCategory);
    }, [blogs, activeCategory]);

    return (
        <div className="pt-24 bg-black min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-6 py-2">
                {/* 1. Header with smaller title */}
                <div className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
                    >
                        Insights for Modern Careers.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 text-sm md:text-lg"
                    >
                        Expert advice and strategies for your growth.
                    </motion.p>
                </div>

                {loading ? (
                    <>
                        <FeaturedSkeleton />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                        </div>
                    </>
                ) : error ? (
                    <div className="py-24 text-center border border-zinc-900 rounded-[3rem] bg-zinc-950/50 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-4">No Blogs Available</h2>
                        <p className="text-zinc-500 max-w-sm mx-auto">We're currently updating our content. Please check back later for more career insights.</p>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="py-24 text-center border border-zinc-900 rounded-[3rem] bg-zinc-950/50">
                        <h2 className="text-2xl font-bold mb-4">No Blogs Available</h2>
                        <p className="text-zinc-500">Check back later for more career insights.</p>
                    </div>
                ) : (
                    <>
                        {/* 2. Featured Section (Main + Sidebar) */}
                        <FeaturedSection mainPost={mainPost} sidebarPosts={sidebarPosts} />

                        {/* 3. Recent Posts Section */}
                        <div className="mt-12">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                <h2 className="text-3xl font-bold">Recent Posts</h2>
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

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {filteredBlogs.map((post, index) => (
                                    <BlogCard key={post.id || post.customId} post={post} index={index} />
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* 4. Stats Section (Refined) */}
                <div className="mt-8 pt-8 border-t border-zinc-900">
                    {loading ? (
                        <div className="grid grid-cols-4 gap-2 md:gap-8 mb-16 px-2 md:px-0">
                            <StatSkeleton />
                            <StatSkeleton />
                            <StatSkeleton />
                            <StatSkeleton />
                        </div>
                    ) : (
                        <BlogStats stats={stats.length > 0 ? stats : []} />
                    )}
                </div>

                {/* 5. Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 p-8 md:p-24 rounded-[3rem] bg-indigo-600 relative overflow-hidden text-center"
                >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-2xl md:text-5xl font-black text-white mb-6">Stay ahead of the curve.</h2>
                        <p className="text-indigo-100/80 text-sm md:text-lg mb-12">
                            Weekly career insights delivered straight to your inbox.
                        </p>
                        <form className="flex flex-col md:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:bg-white/20 transition-all text-sm md:text-base"
                            />
                            <button className="px-8 py-3 md:px-10 md:py-4 bg-white text-indigo-600 font-bold rounded-xl md:rounded-2xl hover:scale-105 transition-transform text-sm md:text-base">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Blog;
