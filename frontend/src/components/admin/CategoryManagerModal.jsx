import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Loader2, Tag } from 'lucide-react';

const CategoryManagerModal = ({
    isOpen,
    onClose,
    categories,
    onAdd,
    onDelete,
    title = "Manage Categories"
}) => {
    const [newCategory, setNewCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        setLoading(true);
        setError('');
        try {
            await onAdd({ name: newCategory.trim() });
            setNewCategory('');
        } catch (err) {
            setError(err.message || 'Failed to add category');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;

        try {
            await onDelete(id);
        } catch (err) {
            setError(err.message || 'Failed to delete category');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white w-full max-w-md rounded-[2rem] overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <Tag className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-zinc-900">{title}</h3>
                                <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">Dynamic Management</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-zinc-200/50 rounded-xl transition-colors text-zinc-400"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-medium">
                                {error}
                            </div>
                        )}

                        {/* Add Form */}
                        <form onSubmit={handleAdd} className="flex gap-2">
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="New category name..."
                                className="flex-1 px-4 py-2.5 bg-zinc-100 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm outline-none"
                            />
                            <button
                                type="submit"
                                disabled={loading || !newCategory.trim()}
                                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-300 text-white p-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                            </button>
                        </form>

                        {/* List */}
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {categories.length === 0 ? (
                                <div className="text-center py-10">
                                    <Tag className="w-8 h-8 text-zinc-200 mx-auto mb-2" />
                                    <p className="text-zinc-400 text-sm">No categories added yet</p>
                                </div>
                            ) : (
                                categories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        className="flex items-center justify-between p-3 bg-zinc-50 border border-zinc-100 rounded-xl hover:border-zinc-200 transition-colors group"
                                    >
                                        <span className="text-sm font-semibold text-zinc-700">{cat.name}</span>
                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-zinc-50 border-t border-zinc-100 text-center">
                        <button
                            onClick={onClose}
                            className="text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest"
                        >
                            Close Manager
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CategoryManagerModal;
