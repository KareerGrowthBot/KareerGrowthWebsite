import React, { useState, useEffect } from 'react';
import {
    Users,
    Search,
    Filter,
    MoreHorizontal,
    Mail,
    Shield,
    Trash2,
    Loader2,
    Plus,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';
import { fetchAdminCommunity } from '../utils/api';

const AdminCommunity = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, pages: 1, currentPage: 1 });
    const [page, setPage] = useState(1);
    const limit = 10;

    const getCommunity = async () => {
        try {
            setLoading(true);
            const res = await fetchAdminCommunity(page, limit);
            setMembers(res.data || []);
            setPagination({
                total: res.total,
                pages: res.pages,
                currentPage: res.currentPage
            });
        } catch (err) {
            console.error('Error fetching community:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCommunity();
    }, [page]);

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-black text-zinc-900 mb-1">Community</h1>
                    <p className="text-zinc-500 text-sm">Monitor and manage your professional community network.</p>
                </div>
                <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 text-sm">
                    <Plus className="w-4 h-4" />
                    Add Member
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden text-zinc-900">
                <div className="p-5 border-b border-zinc-200 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search members..."
                            className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-600 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-all">
                            <Filter className="w-4 h-4" />
                            Status
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto text-zinc-900 text-sm">
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                        </div>
                    ) : (
                        <>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-zinc-50/50">
                                        <th className="px-5 py-3.5 text-xs font-black text-zinc-400 uppercase tracking-wider">Member</th>
                                        <th className="px-5 py-3.5 text-xs font-black text-zinc-400 uppercase tracking-wider">Role & Company</th>
                                        <th className="px-5 py-3.5 text-xs font-black text-zinc-400 uppercase tracking-wider">Status</th>
                                        <th className="px-5 py-3.5 text-xs font-black text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                    {members.map((member) => (
                                        <tr key={member.id} className="hover:bg-zinc-50 transition-colors group">
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-zinc-100 overflow-hidden flex-shrink-0 border border-zinc-200">
                                                        {member.image ? (
                                                            <img src={member.image} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold text-xs">
                                                                {member.name.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-bold text-zinc-900 truncate group-hover:text-indigo-600 transition-colors text-sm">{member.name}</h4>
                                                        <p className="text-[11px] text-zinc-500 truncate">Joined {new Date(member.joinedDate).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-zinc-700">{member.role}</span>
                                                    <span className="text-[11px] text-zinc-400">{member.company}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className={`px-2 px-1 rounded-full text-[9px] font-black uppercase tracking-wider ${member.status === 'Active'
                                                    ? 'bg-green-50 text-green-600'
                                                    : 'bg-zinc-100 text-zinc-500'
                                                    }`}>
                                                    {member.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button title="Message" className="p-1.5 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                                        <Mail className="w-4 h-4" />
                                                    </button>
                                                    <button title="Permissions" className="p-1.5 text-zinc-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all">
                                                        <Shield className="w-4 h-4" />
                                                    </button>
                                                    <button title="Delete" className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                                        <Trash2 className="w-4 h-4" />
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
                                    Showing {members.length} of {pagination.total} members
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

                {!loading && members.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-zinc-400" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 mb-1">No members found</h3>
                        <p className="text-zinc-500">Invite people to join your professional network.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminCommunity;
