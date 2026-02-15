import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    FileText,
    Trophy,
    TrendingUp,
    ExternalLink,
    Loader2,
    Calendar,
    Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { fetchAdminStats, fetchAdminBlogs, fetchAdminStories } from '../utils/api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [statsData, setStatsData] = useState(null);
    const [recentData, setRecentData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const [stats, blogsRes, storiesRes] = await Promise.all([
                    fetchAdminStats(),
                    fetchAdminBlogs(1, 6),
                    fetchAdminStories(1, 6)
                ]);

                setStatsData(stats);

                // Combine and sort recent activities
                const combined = [
                    ...(blogsRes.data || []).map(b => ({ ...b, type: 'Blog', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' })),
                    ...(storiesRes.data || []).map(s => ({ ...s, type: 'Story', icon: Trophy, color: 'text-orange-600', bg: 'bg-orange-50' }))
                ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 6);

                setRecentData(combined);
            } catch (err) {
                console.error('Error fetching admin data:', err);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    const stats = [
        { label: 'Total Blogs', value: statsData?.blogs || '0', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Success Stories', value: statsData?.stories || '0', icon: Trophy, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Community Members', value: statsData?.users?.toLocaleString() || '0', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Platform Growth', value: '12%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 text-zinc-900">
                <div>
                    <h1 className="text-2xl font-black text-zinc-900 mb-1">Welcome back, Admin 👋</h1>
                    <p className="text-zinc-500 text-sm">Here's a live overview of KareerGrowth.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => window.open('/', '_blank')}
                        className="bg-white border border-zinc-200 text-zinc-700 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-100 transition-all text-xs"
                    >
                        View Site
                        <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 text-zinc-900">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-105 transition-transform`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-black text-zinc-900">{stat.value}</h3>
                        </div>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions / Control Center */}
            <div className="mb-6">
                <div className="bg-zinc-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-[80px] -translate-x-1/4 -translate-y-1/4 rounded-full" />
                    <div className="relative z-10 max-w-xl">
                        <h3 className="text-xl font-black mb-2">Admin Control Center</h3>
                        <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-medium">
                            Efficiently manage content and community. share knowledge with blogs or inspire with success stories.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full md:w-auto">
                        <button
                            onClick={() => navigate('/admin/blogs/new')}
                            className="bg-white text-zinc-900 hover:bg-zinc-100 px-6 py-3 rounded-xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2 text-sm"
                        >
                            <FileText className="w-4 h-4 text-indigo-600" />
                            New Blog Post
                        </button>
                        <button
                            onClick={() => navigate('/admin/stories/new')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 text-sm"
                        >
                            <Trophy className="w-4 h-4 text-white" />
                            New Success Story
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 text-zinc-900">
                {/* Recent Activity */}
                <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm text-zinc-900">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-black text-zinc-900">Recent Activity</h2>
                            <p className="text-xs text-zinc-500">Latest updates from blogs and stories.</p>
                        </div>
                    </div>

                    <div className="divide-y divide-zinc-100">
                        {recentData.length > 0 ? (
                            recentData.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="flex items-center gap-4 py-3.5 hover:bg-zinc-50/50 transition-all group cursor-pointer"
                                    onClick={() => navigate(`/admin/${item.type.toLowerCase()}s`)}
                                >
                                    <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <h4 className="font-bold text-zinc-900 truncate pr-4 text-sm">{item.title}</h4>
                                            <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded-full">
                                                {item.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[10px] font-medium text-zinc-400">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className="w-0.5 h-0.5 bg-zinc-300 rounded-full" />
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="py-8 text-center text-zinc-500 text-sm font-medium">
                                No recent activity found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
