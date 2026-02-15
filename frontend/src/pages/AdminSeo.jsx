import React, { useState, useEffect } from 'react';
import {
    Globe,
    Search,
    Plus,
    Edit2,
    Trash2,
    ExternalLink,
    Loader2,
    CheckCircle2,
    XCircle,
    AlertCircle
} from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';
import { fetchAdminSeo, updateAdminSeo, deleteAdminSeo } from '../utils/api';
import SeoModal from '../components/admin/SeoModal';

const AdminSeo = () => {
    const [seoEntries, setSeoEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    const [selectedPath, setSelectedPath] = useState('');


    const getSeoEntries = async () => {
        setLoading(true);
        try {
            const data = await fetchAdminSeo();
            setSeoEntries(data || []);
        } catch (err) {
            console.error('Error fetching SEO entries:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSeoEntries();
    }, []);

    const handleSave = async (formData) => {
        try {
            await updateAdminSeo(formData);
            getSeoEntries();
        } catch (err) {
            throw err;
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this SEO entry?')) return;
        try {
            await deleteAdminSeo(id);
            getSeoEntries();
        } catch (err) {
            alert('Failed to delete SEO entry');
        }
    };

    const filteredEntries = seoEntries.filter(entry =>
        entry.page_path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.page_title.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-zinc-900 mb-1">Search Engine Optimization</h1>
                    <p className="text-zinc-500 text-sm">Manage metadata and social sharing for all your website routes.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            setEditingEntry(null);
                            setSelectedPath('');
                            setIsModalOpen(true);
                        }}
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Configure Route
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Configured</p>
                        <h3 className="text-2xl font-black text-zinc-900">{seoEntries.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Inactive</p>
                        <h3 className="text-2xl font-black text-zinc-900">{seoEntries.filter(e => !e.is_active).length}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-50 text-zinc-600 flex items-center justify-center">
                        <Globe className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Coverage</p>
                        <h3 className="text-2xl font-black text-zinc-900">{Math.round((seoEntries.length / (seoEntries.length + 10)) * 100)}%</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden text-zinc-900">
                <div className="p-5 border-b border-zinc-200 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Filter routes or titles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50/50">
                                <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-200 w-1/4">Page Path</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-200 w-2/4">Page Meta</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-200 w-1/4">Status</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-200 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-24 text-center">
                                        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-4" />
                                        <p className="text-zinc-500 font-medium">Fetching SEO configurations...</p>
                                    </td>
                                </tr>
                            ) : filteredEntries.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-24 text-center">
                                        <div className="w-16 h-16 bg-zinc-50 text-zinc-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Globe className="w-8 h-8" />
                                        </div>
                                        <p className="text-zinc-500 font-bold">No SEO entries found</p>
                                        <p className="text-zinc-400 text-xs mt-1">Start by adding SEO for one of your main routes.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredEntries.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-zinc-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-zinc-900 mb-0.5">{entry.page_path}</span>
                                                <a
                                                    href={`https://kareergrowth.com${entry.page_path}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[10px] text-zinc-400 flex items-center gap-1 hover:text-indigo-600 transition-colors"
                                                >
                                                    View Page <ExternalLink className="w-2.5 h-2.5" />
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col max-w-md">
                                                <span className="text-sm font-bold text-zinc-800 line-clamp-1">{entry.page_title}</span>
                                                <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                                                    {entry.meta_description || 'No description set'}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {entry.is_active ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100 uppercase tracking-wide">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-50 text-zinc-400 text-[10px] font-bold border border-zinc-200 uppercase tracking-wide">
                                                    <XCircle className="w-3 h-3" />
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => {
                                                        setEditingEntry(entry);
                                                        setSelectedPath('');
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                    title="Edit SEO"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(entry.id)}
                                                    className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <SeoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingEntry}
                pagePath={selectedPath}
            />
        </AdminLayout>
    );
};

export default AdminSeo;
