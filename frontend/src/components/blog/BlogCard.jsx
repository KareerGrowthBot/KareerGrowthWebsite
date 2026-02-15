import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Eye, Share2, ArrowUpRight } from 'lucide-react';
import { getImageUrl } from '../../utils/api';

const BlogCard = ({ post, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col h-full cursor-pointer"
        >
            {/* Image Section */}
            <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden mb-6">
                <img
                    src={getImageUrl(post.image)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors leading-tight">
                    {post.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                </p>

                <div className="mt-auto flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
                        <img
                            src={`https://ui-avatars.com/api/?name=${post.author}&background=6366f1&color=fff`}
                            alt={post.author}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                        <span className="text-zinc-300">{post.author}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogCard;
