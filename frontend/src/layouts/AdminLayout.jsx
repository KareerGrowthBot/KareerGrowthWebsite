import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    FileText,
    Trophy,
    TrendingUp,
    Bell,
    Search,
    LogOut,
    Menu,
    X,
    Globe,
    Settings,
    Mail
} from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { fetchAdminContacts, markContactAsRead } from '../utils/api';

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const menuItems = [
        { label: 'Dashboard', icon: TrendingUp, path: '/admin/dashboard' },
        { label: 'Blogs', icon: FileText, path: '/admin/blogs' },
        { label: 'Stories', icon: Trophy, path: '/admin/stories' },
        { label: 'Community', icon: Users, path: '/admin/community' },
        { label: 'Messages', icon: Mail, path: '/admin/contact' },
        { label: 'SEO', icon: Globe, path: '/admin/seo' },
        { label: 'AI Settings', icon: Settings, path: '/admin/settings' },
    ];

    // Notification Logic
    const [unreadCount, setUnreadCount] = React.useState(0);
    const [notifications, setNotifications] = React.useState([]);
    const [isNotifOpen, setIsNotifOpen] = React.useState(false);

    const fetchNotifications = async () => {
        try {
            const contacts = await fetchAdminContacts();
            const unread = contacts.filter(c => !c.isRead);
            setUnreadCount(unread.length);
            setNotifications(unread.slice(0, 5)); // Show top 5
        } catch (err) {
            console.error('Failed to fetch notifications', err);
        }
    };

    React.useEffect(() => {
        fetchNotifications();
        // Poll every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleNotificationClick = async (contact) => {
        try {
            await markContactAsRead(contact.id);
            setIsNotifOpen(false);
            navigate('/admin/contact');
            fetchNotifications(); // Refresh
        } catch (err) {
            console.error('Failed to mark read', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('kg_admin_token');
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-indigo-100 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => {
                        setIsSidebarOpen(false);
                        setIsNotifOpen(false);
                    }}
                />
            )}

            {/* Notification Overlay (Click outside to close) */}
            {isNotifOpen && (
                <div
                    className="fixed inset-0 z-30 bg-transparent"
                    onClick={() => setIsNotifOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:relative inset-y-0 left-0 w-64 bg-white border-r border-zinc-200 z-50 
                transition-transform duration-300 lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-8 flex items-center justify-between">
                    <h2 className="text-xl font-black tracking-tight text-indigo-600 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        KareerGrowth <span className="text-[10px] bg-indigo-50 px-2 py-0.5 rounded-full">ADMIN</span>
                    </h2>
                    <button className="lg:hidden p-2 text-zinc-500 hover:bg-zinc-100 rounded-xl" onClick={() => setIsSidebarOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="px-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => {
                                    navigate(item.path);
                                    setIsSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? '' : 'group-hover:scale-110'}`} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="absolute bottom-8 left-0 w-full px-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition-all group"
                    >
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-4 md:px-8 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative group max-w-md w-full hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                            />
                        </div>
                        {/* Mobile Logo */}
                        <h2 className="lg:hidden text-lg font-black tracking-tight text-indigo-600">
                            KareerGrowth
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                        <div className="relative">
                            <button
                                onClick={() => setIsNotifOpen(!isNotifOpen)}
                                className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full relative transition-colors"
                            >
                                <Bell className="w-5 h-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotifOpen && (
                                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden z-50">
                                    <div className="p-4 border-b border-zinc-50 flex justify-between items-center bg-zinc-50/50">
                                        <h4 className="font-bold text-sm text-zinc-900">Notifications</h4>
                                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                                            {unreadCount} New
                                        </span>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="p-8 text-center text-zinc-400 text-sm">
                                                No new notifications
                                            </div>
                                        ) : (
                                            notifications.map(notif => (
                                                <div
                                                    key={notif.id}
                                                    onClick={() => handleNotificationClick(notif)}
                                                    className="p-4 hover:bg-zinc-50 border-b border-zinc-50 last:border-0 cursor-pointer transition-colors"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-1">
                                                            <Mail className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-zinc-800 line-clamp-1">{notif.subject}</p>
                                                            <p className="text-xs text-zinc-500 mt-0.5 font-medium">{notif.name}</p>
                                                            <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{notif.message}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="p-2 bg-zinc-50 border-t border-zinc-100 text-center">
                                        <button
                                            onClick={() => {
                                                navigate('/admin/contact');
                                                setIsNotifOpen(false);
                                            }}
                                            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 w-full py-2"
                                        >
                                            View All Messages
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className="flex items-center gap-2 p-1 md:p-1.5 hover:bg-zinc-100 rounded-xl transition-colors">
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                                AD
                            </div>
                            <span className="text-sm font-bold pr-1 hidden sm:block">Admin</span>
                        </button>

                        {/* Mobile Menu Icon on the Right */}
                        <button
                            className="lg:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-xl transition-all active:scale-95"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
