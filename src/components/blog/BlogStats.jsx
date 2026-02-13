import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, TrendingUp, Star } from 'lucide-react';

const icons = {
    Users: Users,
    FileText: FileText,
    TrendingUp: TrendingUp,
    Star: Star
};

const BlogStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-4 gap-2 md:gap-8 mb-16 px-2 md:px-0">
            {stats.map((stat, index) => {
                const Icon = icons[stat.icon];
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group p-3 md:p-6 rounded-2xl md:rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="p-1.5 md:p-3 rounded-lg md:rounded-2xl bg-indigo-500/10 text-indigo-500 mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-500">
                                {Icon && <Icon className="w-4 h-4 md:w-6 md:h-6" />}
                            </div>
                            <h3 className="text-sm md:text-3xl font-bold text-white mb-0.5 md:mb-1">{stat.value}</h3>
                            <p className="text-[8px] md:text-sm text-zinc-500 font-medium uppercase tracking-wider">{stat.label}</p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default BlogStats;
