import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2,
    Trophy,
    Loader2,
    ChevronLeft,
    ChevronRight,
    Tag,
    Star,
    BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import CategoryManagerModal from '../components/admin/CategoryManagerModal';
import HighlightTitleModal from '../components/admin/HighlightTitleModal';
import ConfirmationModal from '../components/common/ConfirmationModal';
import {
    fetchAdminStories,
    deleteStory,
    fetchCategories,
    addStoryCategory,
    deleteStoryCategory,
    updateStory
} from '../utils/api';

const AdminStories = () => {
    const navigate = useNavigate();
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, pages: 1, currentPage: 1 });
    const [page, setPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isHighlightModalOpen, setIsHighlightModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
    const limit = 10;

    const getStories = async () => {
        try {
            setLoading(true);
            const res = await fetchAdminStories(page, limit);
            setStories(res.data || []);
            setPagination({
                total: res.total,
                pages: res.pages,
                currentPage: res.currentPage
            });
        } catch (err) {
            console.error('Error fetching stories:', err);
        } finally {
            setLoading(false);
        }
    };

    const getCategories = async () => {
        try {
            const res = await fetchCategories();
            setCategories(res.stories || []);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    useEffect(() => {
        getStories();
        getCategories();
    }, [page]);

    const handleToggleHighlight = (story) => {
        setSelectedStory(story);
        if (!story.isHighlight) {
            setIsHighlightModalOpen(true);
        } else {
            if (window.confirm('Remove this from highlights?')) {
                performToggleHighlight(story, false);
            }
        }
    };

    const performToggleHighlight = async (story, isHighlight, title = null) => {
        try {
            await updateStory(story.id, {
                isHighlight,
                highlightTitle: isHighlight ? title : null
            });
            getStories();
        } catch (err) {
            alert('Failed to update highlight status');
        }
    };

    const handleDeleteClick = (story) => {
        setSelectedStory(story);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedStory) return;
        try {
            await deleteStory(selectedStory.id);
            setStories(prev => prev.filter(s => s.id !== selectedStory.id));
        } catch (err) {
            alert('Failed to delete story');
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 text-zinc-900">
                <div>
                    <h1 className="text-2xl font-black text-zinc-900 mb-1">Manage Stories</h1>
                    <p className="text-zinc-500 text-sm">Inspire others by sharing success journeys.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/admin/stories/stats')}
                        className="bg-white text-zinc-600 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-50 border border-zinc-200 transition-all text-sm"
                    >
                        <BarChart3 className="w-4 h-4" />
                        Stats Count
                    </button>
                    <button
                        onClick={() => setIsCategoryModalOpen(true)}
                        className="bg-white text-zinc-600 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-50 border border-zinc-200 transition-all text-sm"
                    >
                        <Tag className="w-4 h-4" />
                        Manage Categories
                    </button>
                    <button
                        onClick={() => navigate('/admin/stories/new')}
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        New Success Story
                    </button>
                </div>
            </div>

            <CategoryManagerModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                categories={categories}
                onAdd={async (data) => {
                    await addStoryCategory(data);
                    getCategories();
                }}
                onDelete={async (id) => {
                    await deleteStoryCategory(id);
                    getCategories();
                }}
                title="Story Categories"
            />

            <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden text-zinc-900">
                <div className="p-5 border-b border-zinc-200 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search stories..."
                            className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-600 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-all">
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto text-zinc-900">
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                        </div>
                    ) : (
                        <>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-zinc-50/50">
                                        <th className="px-5 py-3.5 text-xs font-black text-zinc-400 uppercase tracking-wider">Success Story</th>
                                        <th className="px-5 py-3.5 text-xs font-black text-zinc-400 uppercase tracking-wider">Role</th>
                                        <th className="px-5 py-3.5 text-xs font-black text-zinc-400 uppercase tracking-wider">Highlight</th>
                                        <th className="px-5 py-3.5 text-xs font-black text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                    {stories.map((story) => (
                                        <tr key={story.id} className="hover:bg-zinc-50 transition-colors group text-sm">
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-zinc-100 overflow-hidden flex-shrink-0">
                                                        {story.image && <img src={story.image} alt="" className="w-full h-full object-cover" />}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-bold text-zinc-900 truncate group-hover:text-indigo-600 transition-colors text-sm">{story.title}</h4>
                                                        <p className="text-[11px] text-zinc-500 truncate">{story.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 text-xs text-zinc-600 font-medium">
                                                {story.role}
                                            </td>
                                            <td className="px-5 py-3">
                                                <button
                                                    onClick={() => handleToggleHighlight(story)}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${story.isHighlight ? 'bg-amber-500' : 'bg-zinc-200'
                                                        }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${story.isHighlight ? 'translate-x-6' : 'translate-x-1'
                                                            }`}
                                                    />
                                                </button>
                                                {story.isHighlight && (
                                                    <span className="ml-2 text-[10px] font-bold text-amber-600 truncate max-w-[80px] inline-block">
                                                        {story.highlightTitle}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-5 py-3 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => navigate(`/admin/stories/edit/${story.id}`)}
                                                        className="p-1.5 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(story)}
                                                        className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="p-4 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/30">
                                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                    Showing {stories.length} of {pagination.total} stories
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                        disabled={page === 1}
                                        className="p-2 text-zinc-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-zinc-400 transition-all bg-white border border-zinc-200 rounded-lg"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <span className="text-sm font-black text-zinc-900 w-8 text-center">{page}</span>
                                    <button
                                        onClick={() => setPage(prev => Math.min(pagination.pages, prev + 1))}
                                        disabled={page === pagination.pages}
                                        className="p-2 text-zinc-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-zinc-400 transition-all bg-white border border-zinc-200 rounded-lg"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {!loading && stories.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Trophy className="w-8 h-8 text-zinc-400" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 mb-1">No stories found</h3>
                        <p className="text-zinc-500">Get started by sharing your first success story.</p>
                    </div>
                )}
            </div>

            <HighlightTitleModal
                isOpen={isHighlightModalOpen}
                onClose={() => setIsHighlightModalOpen(false)}
                onSave={(title) => performToggleHighlight(selectedStory, true, title)}
                initialTitle={selectedStory?.title}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Story"
                message={`Are you sure you want to delete "${selectedStory?.title}"? This action cannot be undone.`}
                confirmText="Delete"
            />
        </AdminLayout>
    );
};

export default AdminStories;
