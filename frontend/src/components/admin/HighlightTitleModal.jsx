import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';

const HighlightTitleModal = ({ isOpen, onClose, onSave, initialTitle = '' }) => {
    const [title, setTitle] = useState(initialTitle);

    useEffect(() => {
        if (isOpen) setTitle(initialTitle);
    }, [isOpen, initialTitle]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(title);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                    <Star className="w-6 h-6 fill-amber-600" />
                                </div>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <h3 className="text-xl font-black text-zinc-900 mb-2">Highlight Hover Title</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                                Enter a brief catchy title that will show when users hover over this highlight in the stories page.
                            </p>

                            <div className="space-y-1.5 mb-8">
                                <label className="text-[13px] font-medium text-zinc-500 ml-1">Hover Title</label>
                                <input
                                    type="text"
                                    autoFocus
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Google Success"
                                    className="w-full px-5 py-3 bg-zinc-100 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm font-medium"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 bg-zinc-100 text-zinc-600 font-bold rounded-xl hover:bg-zinc-200 transition-all text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-amber-600/20"
                                >
                                    Save Highlight
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default HighlightTitleModal;
