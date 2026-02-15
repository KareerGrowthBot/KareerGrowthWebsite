import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Image as ImageIcon,
    Loader2,
    Bell,
    Globe,
    Star,
    X,
    Trophy
} from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';
import {
    createStory,
    updateStory,
    fetchAdminStoryById,
    fetchCategories,
    fetchSeoData,
    updateAdminSeo
} from '../utils/api';
import SeoModal from '../components/admin/SeoModal';

const AdminStoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        company: '',
        image: '',
        title: '',
        quote: '',
        content: '',
        category: 'Career Switch',
        rating: 5,
        creator: 'Admin',
        storyId: ''
    });

    const [categories, setCategories] = useState([]);
    const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
    const [seoData, setSeoData] = useState(null);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            const getStory = async () => {
                try {
                    const story = await fetchAdminStoryById(id);
                    if (story) {
                        setFormData(story);
                    } else {
                        setError('Story not found');
                    }
                } catch (err) {
                    setError('Failed to fetch story details');
                } finally {
                    setFetching(false);
                }
            };

            const getSeo = async () => {
                try {
                    const story = await fetchAdminStoryById(id);
                    if (story && story.storyId) {
                        const seo = await fetchSeoData(`/story/${story.storyId}`);
                        if (seo) setSeoData(seo);
                    }
                } catch (err) {
                    console.error('Error fetching SEO:', err);
                }
            };

            getStory();
            getSeo();
        }

        const getCategories = async () => {
            try {
                const res = await fetchCategories();
                setCategories(res.stories || []);
                if (!isEdit && res.stories && res.stories.length > 0) {
                    setFormData(prev => ({ ...prev, category: res.stories[0].name }));
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
                await updateStory(id, formData);
            } else {
                await createStory(formData);
            }
            navigate('/admin/stories');
        } catch (err) {
            setError(err.message || 'Failed to save story');
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
                    onClick={() => navigate('/admin/stories')}
                    className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-6 transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Stories
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-medium text-zinc-500 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Alex Rivera"
                                    className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm placeholder:text-zinc-400"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-medium text-zinc-500 ml-1">Current Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    required
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="e.g. Senior Product Manager"
                                    className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm placeholder:text-zinc-400"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-medium text-zinc-500 ml-1">Rating</label>
                                <div className="flex items-center gap-1.5 px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl h-[46px]">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star
                                                className={`w-5 h-5 ${star <= formData.rating
                                                    ? 'fill-yellow-500 text-yellow-500'
                                                    : 'text-zinc-300'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-medium text-zinc-500 ml-1">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    required
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="e.g. Google"
                                    className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm placeholder:text-zinc-400"
                                />
                            </div>
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-medium text-zinc-500 ml-1">Highlight Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Journey from Local College to Silicon Valley"
                                    className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm placeholder:text-zinc-400"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-medium text-zinc-500 ml-1">Route ID (Slug)</label>
                                <input
                                    type="text"
                                    name="storyId"
                                    required
                                    value={formData.storyId}
                                    onChange={handleChange}
                                    placeholder="e.g. alex-google-story"
                                    className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm placeholder:text-zinc-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[13px] font-medium text-zinc-500 ml-1">Card Quote (Short Summary)</label>
                            <textarea
                                name="quote"
                                required
                                rows={2}
                                value={formData.quote}
                                onChange={handleChange}
                                placeholder="A brief impactful quote for the story card..."
                                className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm placeholder:text-zinc-400 resize-none"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[13px] font-medium text-zinc-500 ml-1">Detailed Story (Full content)</label>
                            <textarea
                                name="content"
                                required
                                rows={8}
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Write the full success story here..."
                                className="w-full px-5 py-3 bg-zinc-100/50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-sm placeholder:text-zinc-400 resize-none"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[13px] font-medium text-zinc-500 ml-1">Profile Image URL</label>
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
                                <div className="mt-3 w-20 h-20 rounded-xl overflow-hidden border border-zinc-200">
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
                                    {isEdit ? 'Update Story' : 'Publish Story'}
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
                            onClick={() => navigate('/admin/stories')}
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
                    const path = formData.storyId ? `/story/${formData.storyId}` : '';
                    if (!path) {
                        alert('Please define a Route ID/Slug for the story before saving SEO.');
                        return;
                    }
                    await updateAdminSeo({ ...data, page_path: path });
                    setSeoData(data);
                }}
                initialData={seoData}
                pagePath={formData.storyId ? `/story/${formData.storyId}` : ''}
            />
        </AdminLayout>
    );
};

export default AdminStoryForm;
