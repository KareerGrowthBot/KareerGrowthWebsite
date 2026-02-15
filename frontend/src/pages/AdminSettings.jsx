import React, { useState, useEffect } from 'react';
import {
    Settings,
    Save,
    Loader2,
    Key,
    Cpu,
    CheckCircle2,
    AlertCircle,
    X
} from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';
import { fetchAdminSettings, updateAdminSetting } from '../utils/api';

const AdminSettings = () => {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [groqKey, setGroqKey] = useState('');

    const loadSettings = async () => {
        setLoading(true);
        try {
            const data = await fetchAdminSettings();
            setSettings(data || []);

            // Find specific settings
            const groqSetting = data.find(s => s.key === 'groq_api_key');
            if (groqSetting) setGroqKey(groqSetting.value || '');
        } catch (err) {
            setError('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            await updateAdminSetting({
                key: 'groq_api_key',
                value: groqKey,
                description: 'API Key for Groq AI inference'
            });
            setSuccess('Settings updated successfully');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-zinc-900 mb-1">AI & System Settings</h1>
                    <p className="text-zinc-500 text-sm">Configure API keys and dynamic system behaviors.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                        <button onClick={() => setError('')} className="p-1 hover:bg-red-100 rounded-lg">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-medium">{success}</span>
                    </div>
                )}

                <div className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-zinc-100 bg-zinc-50/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                <Cpu className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-zinc-900">Groq AI Configuration</h2>
                                <p className="text-xs text-zinc-500">Manage your Groq API credentials for dynamic AI features.</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSave} className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-zinc-500 ml-1 flex items-center gap-2">
                                <Key className="w-3.5 h-3.5" />
                                Groq API Key
                            </label>
                            <div className="relative group">
                                <input
                                    type="password"
                                    value={groqKey}
                                    onChange={(e) => setGroqKey(e.target.value)}
                                    placeholder="gsk_..."
                                    className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500 transition-all outline-none text-sm placeholder:text-zinc-400 font-mono"
                                />
                                {groqKey && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                                        Configured
                                    </div>
                                )}
                            </div>
                            <p className="text-[11px] text-zinc-400 ml-1">
                                This key allows the system to communicate with Groq's LPU™ Inference Engine. Ensure you use a valid API key from the Groq Cloud Console.
                            </p>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={saving || loading}
                                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-8 py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-600/25 active:scale-[0.98] text-sm"
                            >
                                {saving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Settings
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-3xl border border-zinc-200 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                            <Settings className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-zinc-900 mb-1">Developer Notice</h3>
                            <p className="text-xs text-zinc-500 leading-relaxed">
                                Settings stored here are persistent in the database. When the backend initializes, it can fetch these values to override environment variables.
                            </p>
                        </div>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-zinc-200 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-zinc-900 mb-1">Security Status</h3>
                            <p className="text-xs text-zinc-500 leading-relaxed">
                                API keys are stored in standard text format. For high-security environments, consider additional encryption layers at the database level.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminSettings;
