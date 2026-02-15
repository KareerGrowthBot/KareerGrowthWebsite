import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Save, AlertCircle, Image as ImageIcon } from 'lucide-react';

const SeoModal = ({ isOpen, onClose, onSave, initialData, pagePath }) => {
    const [formData, setFormData] = useState({
        page_path: '',
        page_title: '',
        meta_description: '',
        meta_keywords: '',
        canonical_url: '',
        og_title: '',
        og_description: '',
        og_image: '',
        og_type: 'website',
        twitter_card: 'summary_large_image',
        is_active: true
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...formData,
                ...initialData
            });
        } else if (pagePath) {
            setFormData(prev => ({ ...prev, page_path: pagePath }));
        }
    }, [initialData, pagePath, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await onSave(formData);
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to save SEO data');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <Globe className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-zinc-900">SEO Settings</h3>
                                <p className="text-xs text-zinc-500 font-medium">Configure metadata for {formData.page_path || 'this page'}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-zinc-200/50 rounded-full transition-colors text-zinc-400"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column: Basic SEO */}
                            <div className="space-y-6">

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-zinc-500 ml-1">Page Path (Route)</label>
                                    <input
                                        name="page_path"
                                        value={formData.page_path}
                                        onChange={handleChange}
                                        required
                                        readOnly={!!pagePath}
                                        className={`w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-sm font-mono ${pagePath
                                            ? 'bg-zinc-100 text-zinc-500 border-zinc-200 cursor-not-allowed'
                                            : 'bg-zinc-100/50 border-zinc-200 focus:bg-white'
                                            }`}
                                        placeholder="e.g. /about or /blog/my-post"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-zinc-500 ml-1">Page Title</label>
                                    <input
                                        name="page_title"
                                        value={formData.page_title}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm"
                                        placeholder="Enter focus keyword rich title"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-zinc-500 ml-1">Meta Description</label>
                                    <textarea
                                        name="meta_description"
                                        value={formData.meta_description}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm resize-none"
                                        placeholder="Brief summary of the page (150-160 characters suggested)"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-zinc-500 ml-1">Meta Keywords</label>
                                    <input
                                        name="meta_keywords"
                                        value={formData.meta_keywords}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm"
                                        placeholder="Comma separated keywords"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-zinc-500 ml-1">Canonical URL</label>
                                    <input
                                        name="canonical_url"
                                        value={formData.canonical_url}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm"
                                        placeholder="https://example.com/page"
                                    />
                                </div>
                            </div>

                            {/* Right Column: Social Media (OG) */}
                            <div className="space-y-6">

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-zinc-500 ml-1">OG Title</label>
                                    <input
                                        name="og_title"
                                        value={formData.og_title}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm"
                                        placeholder="Social media share title"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-zinc-500 ml-1">OG Description</label>
                                    <textarea
                                        name="og_description"
                                        value={formData.og_description}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm resize-none"
                                        placeholder="Social media share description"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-zinc-500 ml-1 flex items-center gap-1.5">
                                        <ImageIcon className="w-3.5 h-3.5" />
                                        OG Image URL
                                    </label>
                                    <input
                                        name="og_image"
                                        value={formData.og_image}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-medium text-zinc-500 ml-1">OG Type</label>
                                        <select
                                            name="og_type"
                                            value={formData.og_type}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm"
                                        >
                                            <option value="website">Website</option>
                                            <option value="article">Article</option>
                                            <option value="profile">Profile</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-medium text-zinc-500 ml-1">Twitter Card</label>
                                        <select
                                            name="twitter_card"
                                            value={formData.twitter_card}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm"
                                        >
                                            <option value="summary">Summary</option>
                                            <option value="summary_large_image">Large Image</option>
                                            <option value="app">App</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_active"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={handleChange}
                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-zinc-300 rounded"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-zinc-700">
                                This SEO configuration is active
                            </label>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="p-6 border-t border-zinc-100 flex items-center justify-end gap-3 bg-zinc-50/50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl font-bold text-zinc-500 hover:bg-zinc-200 transition-all text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !formData.page_title}
                            className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Save Changes
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SeoModal;
