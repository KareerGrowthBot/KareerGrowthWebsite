import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2,
    FileText,
    Loader2,
    ChevronLeft,
    ChevronRight,
    Tag,
    BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import ConfirmationModal from '../components/common/ConfirmationModal';
import {
    fetchAdminBlogs,
    deleteBlog,
    fetchCategories,
    addBlogCategory,
    deleteBlogCategory
} from '../utils/api';
import CategoryManagerModal from '../components/admin/CategoryManagerModal';

const AdminBlogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, pages: 1, currentPage: 1 });
    const [page, setPage] = useState(1);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [categories, setCategories] = useState([]);
    const limit = 10;

    const getBlogs = async () => {
        try {
            setLoading(true);
            const res = await fetchAdminBlogs(page, limit);
            setBlogs(res.data || []);
            setPagination({
                total: res.total,
                pages: res.pages,
                currentPage: res.currentPage
            });
        } catch (err) {
            console.error('Error fetching blogs:', err);
        } finally {
            setLoading(false);
        }
    };

    const getCategories = async () => {
        try {
            const res = await fetchCategories();
            setCategories(res.blogs || []);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    useEffect(() => {
        getBlogs();
        getCategories();
    }, [page]);

    const handleDeleteClick = (blog) => {
        setSelectedBlog(blog);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedBlog) return;
        try {
            await deleteBlog(selectedBlog.id);
            setBlogs(prev => prev.filter(blog => blog.id !== selectedBlog.id));
        } catch (err) {
            alert('Failed to delete blog');
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 text-zinc-900">
                <div>
                    <h1 className="text-2xl font-black text-zinc-900 mb-1">Manage Blogs</h1>
                    <p className="text-zinc-500 text-sm">Create, edit, and organize your career insights.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/admin/blogs/stats')}
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
                        onClick={() => navigate('/admin/blogs/new')}
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        New Blog Post
                    </button>
                </div>
            </div>

            <CategoryManagerModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                categories={categories}
                onAdd={async (data) => {
                    await addBlogCategory(data);
                    getCategories();
                }}
                onDelete={async (id) => {
                    await deleteBlogCategory(id);
                    getCategories();
                }}
                title="Blog Categories"
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Blog"
                message={`Are you sure you want to delete "${selectedBlog?.title}"? This action cannot be undone.`}
                confirmText="Delete Blog"
                variant="danger"
            />

            <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden text-zinc-900">
                <div className="p-5 border-b border-zinc-200 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search blogs..."
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
                                        <th className="px-5 py-3.5 text-xs font-black text-zinc-400 uppercase tracking-wider">Blog Details</th>
                                        <th className="px-5 py-3.5 text-xs font-black text-zinc-400 uppercase tracking-wider">Category</th>
                                        <th className="px-5 py-3.5 text-xs font-black text-zinc-400 uppercase tracking-wider">Date</th>
                                        <th className="px-5 py-3.5 text-xs font-black text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                    {blogs.map((blog) => (
                                        <tr key={blog.id} className="hover:bg-zinc-50 transition-colors group text-sm">
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-zinc-100 overflow-hidden flex-shrink-0">
                                                        {blog.image && <img src={blog.image} alt="" className="w-full h-full object-cover" />}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-bold text-zinc-900 truncate group-hover:text-indigo-600 transition-colors text-sm">{blog.title}</h4>
                                                        <p className="text-[11px] text-zinc-500 truncate">By {blog.author}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-wider border border-indigo-100/50">
                                                    {blog.category}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="text-xs text-zinc-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
                                            </td>
                                            <td className="px-5 py-3 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => navigate(`/admin/blogs/edit/${blog.id}`)}
                                                        className="p-1.5 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(blog)}
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
                                    Showing {blogs.length} of {pagination.total} blogs
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

                {!loading && blogs.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-zinc-400" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 mb-1">No blogs found</h3>
                        <p className="text-zinc-500">Get started by creating your first blog post.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminBlogs;
