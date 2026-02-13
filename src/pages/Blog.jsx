import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { blogPosts, blogStats } from '../data/blogData';
import BlogCard from '../components/blog/BlogCard';
import BlogStats from '../components/blog/BlogStats';
import FeaturedSection from '../components/blog/FeaturedSection';
import { Search } from 'lucide-react';

const Blog = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const mainPost = blogPosts[1]; // Use a high-quality post as main
    const sidebarPosts = blogPosts.slice(2, 7); // Other featured posts
    const recentPosts = blogPosts.slice(0, 3); // Recent posts row

    return (
        <div className="pt-4 bg-black min-h-screen text-white">
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

                {/* 2. Featured Section (Main + Sidebar) */}
                <FeaturedSection mainPost={mainPost} sidebarPosts={sidebarPosts} />

                {/* 3. Recent Posts Section */}
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold">Recent Posts</h2>
                        <button className="px-6 py-2 rounded-full border border-zinc-800 hover:bg-zinc-900 transition-colors text-sm font-bold">
                            All Posts
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {recentPosts.map((post, index) => (
                            <BlogCard key={post.id} post={post} index={index} />
                        ))}
                    </div>
                </div>

                {/* 4. Stats Section (Refined) */}
                <div className="mt-8 pt-8 border-t border-zinc-900">
                    <BlogStats stats={blogStats} />
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
