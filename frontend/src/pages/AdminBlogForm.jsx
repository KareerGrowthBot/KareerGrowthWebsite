import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Image as ImageIcon,
    Loader2,
    X,
    Globe
} from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';
import {
    createBlog,
    updateBlog,
    fetchAdminBlogById,
    fetchCategories,
    fetchSeoData,
    updateAdminSeo
} from '../utils/api';
import SeoModal from '../components/admin/SeoModal';

const AdminBlogForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        category: 'Career Advice',
        author: 'Admin',
        image: '',
        readTime: '5 min read',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        content: ''
    });

    const [categories, setCategories] = useState([]);
    const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
    const [seoData, setSeoData] = useState(null);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            const getBlog = async () => {
                try {
                    const blog = await fetchAdminBlogById(id);
                    if (blog) {
                        setFormData(blog);
                    } else {
                        setError('Blog not found');
                    }
                } catch (err) {
                    setError('Failed to fetch blog details');
                } finally {
                    setFetching(false);
                }
            };

            const getSeo = async () => {
                try {
                    // We need the customId to fetch the SEO by path
                    const blog = await fetchAdminBlogById(id);
                    if (blog && blog.customId) {
                        const seo = await fetchSeoData(`/blog/${blog.customId}`);
                        if (seo) setSeoData(seo);
                    }
                } catch (err) {
                    console.error('Error fetching SEO:', err);
                }
            };

            getBlog();
            getSeo();
        }

        const getCategories = async () => {
            try {
                const res = await fetchCategories();
                setCategories(res.blogs || []);
                if (!isEdit && res.blogs && res.blogs.length > 0) {
                    setFormData(prev => ({ ...prev, category: res.blogs[0].name }));
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };
        getCategories();
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEdit) {
                await updateBlog(id, formData);
            } else {
                await createBlog(formData);
            }
            navigate('/admin/blogs');
        } catch (err) {
            setError(err.message || 'Failed to save blog');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="">
                <button
                    onClick={() => navigate('/admin/blogs')}
                    className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-6 transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blogs
                </button>


                {error && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center justify-between">
                        <span className="text-sm font-medium">{error}</span>
                        <button onClick={() => setError('')} className="p-1 hover:bg-red-100 rounded-lg">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 text-zinc-900">
                    <div className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[13px] font-medium text-zinc-500 ml-1">Blog Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. 10 Tips for Landing Your Dream Job"
                                className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm placeholder:text-zinc-400"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-medium text-zinc-500 ml-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm appearance-none"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-medium text-zinc-500 ml-1">Author Name</label>
                                <input
                                    type="text"
                                    name="author"
                                    required
                                    value={formData.author}
                                    onChange={handleChange}
                                    placeholder="e.g. John Doe"
                                    className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm placeholder:text-zinc-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[13px] font-medium text-zinc-500 ml-1">Card Excerpt (Short Summary)</label>
                            <textarea
                                name="excerpt"
                                required
                                rows={3}
                                value={formData.excerpt}
                                onChange={handleChange}
                                placeholder="A brief summary for the blog card..."
                                className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm placeholder:text-zinc-400 resize-none"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[13px] font-medium text-zinc-500 ml-1">Main Content (Detailed View)</label>
                            <textarea
                                name="content"
                                required
                                rows={8}
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="The full content of your blog post..."
                                className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm placeholder:text-zinc-400 resize-none"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[13px] font-medium text-zinc-500 ml-1">Cover Image URL</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-indigo-500 transition-colors">
                                    <ImageIcon className="w-4 h-4" />
                                </div>
                                <input
                                    type="url"
                                    name="image"
                                    required
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full pl-10 pr-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm placeholder:text-zinc-400"
                                />
                            </div>
                            {formData.image && (
                                <div className="mt-3 aspect-video w-48 rounded-xl overflow-hidden border border-zinc-200">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 active:scale-95 text-sm"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    {isEdit ? 'Update Post' : 'Publish Blog'}
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsSeoModalOpen(true)}
                            className="bg-white text-zinc-600 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border border-zinc-200 hover:bg-zinc-50 transition-all text-sm"
                        >
                            <Globe className="w-4 h-4" />
                            Configure SEO
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/blogs')}
                            className="px-6 py-3 text-zinc-500 font-bold hover:bg-zinc-100 rounded-xl transition-all text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <SeoModal
                isOpen={isSeoModalOpen}
                onClose={() => setIsSeoModalOpen(false)}
                onSave={async (data) => {
                    const path = formData.customId ? `/blog/${formData.customId}` : '';
                    if (!path) {
                        alert('Please define a URL/CustomId for the blog before saving SEO.');
                        return;
                    }
                    await updateAdminSeo({ ...data, page_path: path });
                    setSeoData(data);
                }
                }
                initialData={seoData}
                pagePath={formData.customId ? `/blog/${formData.customId}` : ''}
            />
        </AdminLayout>
    );
};

export default AdminBlogForm;
