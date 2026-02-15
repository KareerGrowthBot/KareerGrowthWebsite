import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if credentials are saved in localStorage
        const savedEmail = localStorage.getItem('kg_admin_email');
        const savedPassword = localStorage.getItem('kg_admin_password');
        if (savedEmail && savedPassword) {
            setCredentials({
                email: savedEmail,
                password: savedPassword,
                rememberMe: true
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const DEFAULT_EMAIL = 'admin@kareergrowth.com';
        const DEFAULT_PASSWORD = 'SystemMindz@2025';

        if (credentials.email === DEFAULT_EMAIL && credentials.password === DEFAULT_PASSWORD) {
            // Save to localStorage if "Remember Me" is checked
            if (credentials.rememberMe) {
                localStorage.setItem('kg_admin_email', credentials.email);
                localStorage.setItem('kg_admin_password', credentials.password);
            } else {
                localStorage.removeItem('kg_admin_email');
                localStorage.removeItem('kg_admin_password');
            }

            // Save token
            localStorage.setItem('kg_admin_token', 'dummy-jwt-token-' + Date.now());

            navigate('/admin/dashboard');
        } else {
            setError('Invalid email or password');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="inline-flex p-4 rounded-2xl bg-indigo-600/10 text-indigo-500 mb-6"
                    >
                        <Lock className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Admin Portal</h1>
                    <p className="text-zinc-500">Sign in to manage KareerGrowth content</p>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-indigo-500 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={credentials.email}
                                    onChange={handleChange}
                                    placeholder="admin@kareergrowth.com"
                                    className="w-full pl-12 pr-4 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-white placeholder:text-zinc-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-indigo-500 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    value={credentials.password}
                                    onChange={handleChange}
                                    placeholder="••••••••••••"
                                    className="w-full pl-12 pr-12 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-white placeholder:text-zinc-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={credentials.rememberMe}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-5 h-5 border border-zinc-700 rounded-md bg-zinc-950 peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all" />
                                    <div className="absolute opacity-0 peer-checked:opacity-100 transition-opacity left-1 text-white">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">Remember me</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 group overflow-hidden relative"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Sign in</span>
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-zinc-500 text-sm">
                    Protected by KareerGrowth Security
                </p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
