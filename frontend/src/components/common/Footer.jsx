import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../../assets/images/logo.png';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-black pt-16 pb-8 border-t border-zinc-200 dark:border-zinc-800 transition-colors relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
                    <div className="col-span-2 md:col-span-1 lg:col-span-1 space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img src={logo} alt="KareerGrowth" className="h-10 w-auto group-hover:rotate-3 transition-transform" />
                            {/* <span className="text-xl font-bold text-black tracking-tight">
                                Kareer<span className="text-indigo-600">Growth</span>
                            </span> */}
                        </Link>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs mb-6">
                            Empowering your career journey with AI-driven tools, expert mentorship, and real-world practice.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="p-2 rounded-full bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-black dark:text-white mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-zinc-500 dark:text-zinc-400">
                            {['Home', 'About Us', 'Services', 'Process', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-black dark:text-white mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-zinc-500 dark:text-zinc-400">
                            {['Blog', 'Community', 'FAQ', 'Privacy Policy', 'Terms of Service'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1 lg:col-span-1">
                        <h4 className="font-semibold text-black dark:text-white mb-6">Stay Updated</h4>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                            Subscribe to our newsletter for the latest job updates and career tips.
                        </p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg py-2.5 px-4 text-sm text-black dark:text-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all placeholder:text-zinc-400"
                            />
                            <button className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <p>© 2025 KareerGrowth. All rights reserved.</p>
                    <div className="flex items-center gap-1">
                        Powered by <a href="https://www.systemmindz.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">SystemMindz</a>
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
