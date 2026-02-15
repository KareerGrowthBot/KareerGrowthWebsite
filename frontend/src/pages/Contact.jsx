import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, MapPin, Phone, Facebook, Twitter, Linkedin, Youtube, Globe, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactForm } from '../utils/api';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState(null); // 'success' | 'error' | null

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            await submitContactForm(formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus(null), 5000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="pt-6 pb-8 bg-black min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-center">

                    {/* Left Side - Info */}
                    <div className="lg:w-1/3 space-y-4">
                        <div>
                            <h2 className="text-4xl md:text-7xl font-black mb-1">Let's get in touch</h2>
                            <p className="text-xl md:text-2xl font-bold text-indigo-600 mb-4">
                                Don't be afraid to say hello with us!
                            </p>
                            <p className="text-sm md:text-base text-zinc-500 leading-relaxed mb-6 font-normal">
                                We're here to help you navigate your career journey with personalized guidance and expert industry insights. Reach out anytime with your questions or to explore how we can support your growth.
                            </p>
                            <div className="pt-4 border-t border-zinc-900">
                                <p className="text-[10px] md:text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">Email Address</p>
                                <a href="mailto:hello@kareergrowth.com" className="text-lg md:text-2xl font-bold text-white hover:text-[#B6FF60] transition-colors">
                                    hello@kareergrowth.com
                                </a>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-6 pt-4">
                            <Facebook className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                            <Twitter className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                            <Linkedin className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                            <Youtube className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                            <Globe className="w-5 h-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                        </div>
                    </div>

                    {/* Right Side - Neon Green Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:w-2/3 w-full bg-[#B6FF60] rounded-[2.5rem] p-6 md:p-10 text-black"
                    >
                        <div className="space-y-4 pb-4">
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1]">
                                Let's accelerate your <br />
                                career growth.
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Status Message */}
                                <AnimatePresence>
                                    {status && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className={`p-4 rounded-xl flex items-center gap-3 ${status === 'success' ? 'bg-black text-[#B6FF60]' : 'bg-red-500 text-white'
                                                }`}
                                        >
                                            {status === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                            <p className="font-bold text-sm">
                                                {status === 'success'
                                                    ? 'Message sent successfully! We\'ll get back to you soon.'
                                                    : 'Something went wrong. Please try again later.'}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Underline Inputs */}
                                <div className="space-y-6">
                                    <div className="group relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your name"
                                            className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-2 text-lg md:text-xl font-bold placeholder:text-black/30 transition-all"
                                        />
                                    </div>

                                    <div className="group relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your email"
                                            className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-2 text-lg md:text-xl font-bold placeholder:text-black/30 transition-all"
                                        />
                                    </div>

                                    <div className="group relative">
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            placeholder="Subject / Phone number"
                                            className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-2 text-lg md:text-xl font-bold placeholder:text-black/30 transition-all"
                                        />
                                    </div>

                                    <div className="group relative">
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={3}
                                            placeholder="Tell us a little about the project..."
                                            className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-2 text-lg md:text-xl font-bold placeholder:text-black/30 transition-all resize-none"
                                        />
                                    </div>
                                </div>


                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-5 md:py-8 bg-[#0D0D12] disabled:opacity-70 text-white text-lg md:text-xl font-black rounded-2xl md:rounded-3xl hover:bg-black transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-3"
                                >
                                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Let\'s get started!'}
                                </button>
                            </form>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
