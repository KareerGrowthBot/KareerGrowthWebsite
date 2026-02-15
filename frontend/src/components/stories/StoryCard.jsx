import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight, Trophy } from 'lucide-react';
import { getImageUrl } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const StoryCard = ({ story, index }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col h-full cursor-pointer"
            onClick={() => navigate(`/story/${story.storyId || story.id}`)}
        >
            {/* Image Section */}
            <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden mb-6">
                <img
                    src={getImageUrl(story.image)}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                    <div className="flex gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-[10px] font-black text-white uppercase tracking-wider">{story.rating}</span>
                    </div>
                </div>
                <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest">
                        {story.category || 'Career Success'}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{story.role}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors leading-tight line-clamp-2">
                    {story.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3 italic">
                    "{story.quote}"
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
                            <img
                                src={`https://ui-avatars.com/api/?name=${story.name}&background=6366f1&color=fff`}
                                alt={story.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-zinc-300">{story.name}</span>
                            <span className="text-[10px] text-zinc-500 font-medium">Contributor</span>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StoryCard;
