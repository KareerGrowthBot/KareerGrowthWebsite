import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BarChart3, Save, Loader2, Users, FileText, TrendingUp, Star } from 'lucide-react';
import {
    createImpactStat,
    updateImpactStat,
    createBlogStat,
    updateBlogStat
} from '../../utils/api';

const availableIcons = [
    { id: 'Users', icon: Users, label: 'Community' },
    { id: 'FileText', icon: FileText, label: 'Articles' },
    { id: 'TrendingUp', icon: TrendingUp, label: 'Readers' },
    { id: 'Star', icon: Star, label: 'Mentors' }
];

const StatsManagerModal = ({ isOpen, onClose, initialData, onSave, type = 'stories' }) => {
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        value: '',
        label: '',
        sub: '',
        icon: 'Users'
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                value: initialData.value,
                label: initialData.label,
                sub: initialData.sub || '',
                icon: initialData.icon || 'Users'
            });
        } else {
            setFormData({ value: '', label: '', sub: '', icon: 'Users' });
        }
    }, [initialData, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (type === 'stories') {
                if (initialData) {
                    await updateImpactStat(initialData.id, formData);
                } else {
                    await createImpactStat(formData);
                }
            } else {
                if (initialData) {
                    await updateBlogStat(initialData.id, formData);
                } else {
                    await createBlogStat(formData);
                }
            }
            onSave();
            onClose();
        } catch (err) {
            alert('Failed to save stat');
        } finally {
            setSaving(false);
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
                    className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <BarChart3 className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-zinc-900">
                                    {initialData ? `Edit ${type === 'stories' ? 'Impact' : 'Blog'} Stat` : `Add ${type === 'stories' ? 'Impact' : 'Blog'} Stat`}
                                </h3>
                                <p className="text-xs text-zinc-500 font-medium">Define your key {type === 'stories' ? 'impact' : 'blog'} metric.</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-zinc-200/50 rounded-full transition-colors text-zinc-400">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-medium text-zinc-500 ml-1">Stat Value</label>
                                <input
                                    required
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                    placeholder="e.g. 10,000+"
                                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-medium text-zinc-500 ml-1">Label</label>
                                <input
                                    required
                                    value={formData.label}
                                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                    placeholder="e.g. Monthly Readers"
                                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-bold"
                                />
                            </div>
                        </div>

                        {type === 'stories' ? (
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-medium text-zinc-500 ml-1">Description (Subtext)</label>
                                <textarea
                                    value={formData.sub}
                                    onChange={(e) => setFormData({ ...formData, sub: e.target.value })}
                                    rows={3}
                                    placeholder="Brief description for the stat..."
                                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm resize-none"
                                />
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <label className="text-[13px] font-medium text-zinc-500 ml-1">Select Icon</label>
                                <div className="grid grid-cols-4 gap-3">
                                    {availableIcons.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, icon: item.id })}
                                                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${formData.icon === item.id
                                                    ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm'
                                                    : 'bg-zinc-50 border-zinc-100 text-zinc-400 hover:bg-zinc-100'
                                                    }`}
                                            >
                                                <Icon className="w-5 h-5" />
                                                <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-bold text-zinc-500 hover:bg-zinc-100 rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 text-sm"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {initialData ? 'Update Stat' : 'Add Stat'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default StatsManagerModal;
