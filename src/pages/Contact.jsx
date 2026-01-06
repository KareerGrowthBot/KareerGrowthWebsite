import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-semibold text-yellow-600 tracking-wider uppercase mb-2 block">Get in Touch</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Let's Start a Conversation</h1>
                    <p className="text-lg text-slate-600">Have questions about our AI tools or mentorship programs? We're here to help you accelerate your career.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Contact Info Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10 space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
                                <p className="text-slate-300">Fill out the form or reach us directly.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-slate-700/50 rounded-lg">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Email</p>
                                        <a href="mailto:hello@kareergrowth.com" className="text-lg font-semibold hover:text-yellow-300 transition-colors">hello@kareergrowth.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-slate-700/50 rounded-lg">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Phone</p>
                                        <a href="tel:+918001234567" className="text-lg font-semibold hover:text-yellow-300 transition-colors">+91 (800) 123-4567</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-slate-700/50 rounded-lg">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Office</p>
                                        <p className="text-lg font-semibold">Bangalore, Karnataka, India</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 mt-auto">
                                <p className="text-sm text-slate-400 mb-4">Connect with us</p>
                                <div className="flex gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors">
                                            {/* Social Icons Placeholder */}
                                            <div className="w-4 h-4 bg-white rounded-sm opacity-50"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-xl border border-slate-100"
                    >
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-semibold text-slate-700">First Name</label>
                                    <input type="text" id="firstName" placeholder="John" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-semibold text-slate-700">Last Name</label>
                                    <input type="text" id="lastName" placeholder="Doe" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</label>
                                    <input type="email" id="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone Number</label>
                                    <input type="tel" id="phone" placeholder="+1 (555) 000-0000" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Topic of Interest</label>
                                <div className="flex flex-wrap gap-3">
                                    {['Mock Interviews', 'Resume Review', 'Mentorship', 'Partnership', 'Other'].map((topic) => (
                                        <label key={topic} className="cursor-pointer">
                                            <input type="radio" name="topic" className="peer sr-only" />
                                            <span className="inline-block px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-sm font-medium peer-checked:bg-yellow-500 peer-checked:text-black peer-checked:border-yellow-500 hover:bg-slate-100 transition-all">
                                                {topic}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-slate-700">Message</label>
                                <textarea id="message" rows="4" placeholder="How can we help you?" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all resize-none"></textarea>
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black rounded-xl font-bold hover:bg-yellow-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    <span>Send Message</span>
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
