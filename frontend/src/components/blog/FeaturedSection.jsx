import React from 'react';
import { motion } from 'framer-motion';
import { getImageUrl } from '../../utils/api';

const FeaturedSection = ({ mainPost, sidebarPosts }) => {
    return (
        <section className="flex flex-col lg:flex-row gap-8 mb-16">
            {/* Main Featured Post */}
            <div className="flex-[2] relative group rounded-3xl overflow-hidden aspect-[16/10] lg:aspect-auto">
                <img
                    src={getImageUrl(mainPost.image)}
                    alt={mainPost.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider mb-4">
                        {mainPost.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight max-w-2xl">
                        {mainPost.title}
                    </h2>
                </div>
            </div>

            {/* Other Featured Posts Sidebar */}
            <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-6">Other featured posts</h3>
                <div className="space-y-6">
                    {sidebarPosts.map((post, index) => (
                        <motion.div
                            key={post.id || post.customId}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-4 group cursor-pointer"
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0">
                                <img
                                    src={getImageUrl(post.image)}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h4 className="text-sm md:text-base font-bold text-zinc-300 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                                    {post.title}
                                </h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;
