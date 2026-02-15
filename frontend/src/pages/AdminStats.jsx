import React, { useState, useEffect } from 'react';
import {
    Plus,
    BarChart3,
    Edit,
    Trash2,
    Loader2,
    Trophy,
    Save
} from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';
import {
    fetchAdminImpactStats,
    deleteImpactStat,
    fetchAdminBlogStats,
    deleteBlogStat
} from '../utils/api';
import StatsManagerModal from '../components/admin/StatsManagerModal';

const AdminStats = ({ type = 'stories' }) => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStat, setEditingStat] = useState(null);

    const getStats = async () => {
        setLoading(true);
        try {
            const data = type === 'stories'
                ? await fetchAdminImpactStats()
                : await fetchAdminBlogStats();
            setStats(data || []);
        } catch (err) {
            console.error(`Error fetching ${type} stats:`, err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getStats();
    }, [type]);

    const handleEdit = (stat) => {
        setEditingStat(stat);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm(`Are you sure you want to delete this ${type === 'stories' ? 'impact' : 'blog'} stat?`)) return;
        try {
            if (type === 'stories') {
                await deleteImpactStat(id);
            } else {
                await deleteBlogStat(id);
            }
            getStats();
        } catch (err) {
            alert('Failed to delete stat');
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 text-zinc-900">
                <div>
                    <h1 className="text-2xl font-black text-zinc-900 mb-1">
                        {type === 'stories' ? 'Impact Statistics' : 'Blog Statistics'}
                    </h1>
                    <p className="text-zinc-500 text-sm">
                        {type === 'stories'
                            ? 'Manage the key metrics shown on the website home page.'
                            : 'Manage the engagement metrics shown on the blogs page.'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            setEditingStat(null);
                            setIsModalOpen(true);
                        }}
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Stat
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden text-zinc-900">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                    </div>
                ) : stats.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <BarChart3 className="w-8 h-8 text-zinc-400" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 mb-1">No stats found</h3>
                        <p className="text-zinc-500">Add your first impact metric to show it on the website.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-zinc-50/50">
                                    <th className="px-6 py-4 text-xs font-black text-zinc-400 uppercase tracking-wider">Stat Value</th>
                                    <th className="px-6 py-4 text-xs font-black text-zinc-400 uppercase tracking-wider">Label</th>
                                    {type === 'stories' && <th className="px-6 py-4 text-xs font-black text-zinc-400 uppercase tracking-wider">Description</th>}
                                    {type === 'blogs' && <th className="px-6 py-4 text-xs font-black text-zinc-400 uppercase tracking-wider">Icon</th>}
                                    <th className="px-6 py-4 text-xs font-black text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {stats.map((stat) => (
                                    <tr key={stat.id} className="hover:bg-zinc-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="text-lg font-black text-indigo-600">{stat.value}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-zinc-900">{stat.label}</span>
                                        </td>
                                        {type === 'stories' ? (
                                            <td className="px-6 py-4">
                                                <p className="text-xs text-zinc-500 max-w-xs truncate">{stat.sub}</p>
                                            </td>
                                        ) : (
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-zinc-100 rounded-lg text-[10px] font-bold text-zinc-600">{stat.icon || 'No Icon'}</span>
                                            </td>
                                        )}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => handleEdit(stat)}
                                                    className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(stat.id)}
                                                    className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <StatsManagerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={editingStat}
                onSave={getStats}
                type={type}
            />
        </AdminLayout>
    );
};

export default AdminStats;
