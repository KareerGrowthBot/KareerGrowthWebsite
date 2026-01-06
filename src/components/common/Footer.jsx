import React from 'react';
import { Twitter, Linkedin, Instagram, Facebook, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../../assets/images/logo.png';

const Footer = () => {
    return (
        <footer className="bg-white pt-20 pb-10 border-t border-slate-100 font-sans">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <img src={logo} alt="KareerGrowth" className="h-10 w-auto" />
                            {/* <span className="text-xl font-bold text-slate-900 tracking-tight">
                                Kareer<span className="text-yellow-600">Growth</span>
                            </span> */}
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
                            Accelerating your career through AI-driven insights and expert mentorship.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Linkedin, href: '#' },
                                { icon: Twitter, href: '#' },
                                { icon: Instagram, href: '#' },
                                { icon: Facebook, href: '#' }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="p-2 rounded-full bg-slate-50 text-slate-500 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            {['Home', 'About Us', 'Services', 'Process'].map((link) => (
                                <li key={link}>
                                    <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="hover:text-yellow-600 transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            {['Mock Tests', 'Interview Tips', 'Career Path', 'Success Stories'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-yellow-600 transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter (Optional adaptation) */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-6">Stay Updated</h4>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600 transition-all placeholder:text-slate-400"
                            />
                            <button className="absolute right-2 top-2 p-1 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors">
                                <ArrowRightIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    <p>© 2025 KareerGrowth. All rights reserved.</p>
                    <div className="flex items-center gap-1">
                        Powered by <span className="font-semibold text-slate-700">SystemMinds</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const ArrowRightIcon = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14m-7-7 7 7-7 7" />
    </svg>
);

export default Footer;
