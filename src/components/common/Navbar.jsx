import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../assets/images/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const location = useLocation();
    const { theme } = useTheme();

    const links = [
        { name: 'Home', path: '#home' },
        {
            name: 'About',
            path: '#about',
            subLinks: [
                { name: 'Our Stories', path: '/stories' }
            ]
        },
        { name: 'Features', path: '#features' },
        { name: 'Services', path: '#services' },
        { name: 'AI Workflow', path: '#ai-workflow' },
        { name: 'Process', path: '#process' },
        {
            name: 'Contact',
            path: '/contact',
            subLinks: [
                { name: 'Blog', path: '/blog' }
            ]
        },
    ];

    const isHome = location.pathname === '/';

    const handleScroll = (e, path) => {
        if (path.startsWith('#')) {
            e.preventDefault();
            setIsOpen(false);
            setOpenSubMenu(null);

            if (!isHome) {
                window.location.href = '/' + path;
                return;
            }

            const id = path.substring(1);
            const element = document.getElementById(id);
            if (element) {
                const navHeight = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                window.history.pushState(null, '', path);
            }
        }
    };

    return (
        <nav className="bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 dark:border-zinc-800 transition-colors">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group transition-transform active:scale-95" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img src={logo} alt="KareerGrowth" className="h-9 md:h-10 w-auto group-hover:rotate-3 transition-transform" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <div key={link.name} className="relative group/nav">
                                <a
                                    href={link.path}
                                    onClick={(e) => handleScroll(e, link.path)}
                                    className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${isHome && location.hash === link.path
                                        ? 'text-indigo-600 dark:text-indigo-400'
                                        : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                                        }`}
                                >
                                    {link.name}
                                    {link.subLinks && <ChevronDown className="w-4 h-4 transition-transform group-hover/nav:rotate-180" />}
                                </a>

                                {/* Dropdown Menu */}
                                {link.subLinks && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[140px] w-max py-2 bg-white dark:bg-black border border-slate-100 dark:border-zinc-800 rounded-xl shadow-xl opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 translate-y-2 group-hover/nav:translate-y-0 overflow-hidden">
                                        {link.subLinks.map((sub) => (
                                            <a
                                                key={sub.name}
                                                href={sub.path}
                                                onClick={(e) => handleScroll(e, sub.path)}
                                                className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors"
                                            >
                                                {sub.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <button className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-black border-t border-slate-100 dark:border-zinc-800 overflow-hidden"
                    >
                        <div className="px-6 py-4 space-y-2">
                            {links.map((link) => (
                                <div key={link.name} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <a
                                            href={link.path}
                                            onClick={(e) => handleScroll(e, link.path)}
                                            className="block py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                        {link.subLinks && (
                                            <button
                                                onClick={() => setOpenSubMenu(openSubMenu === link.name ? null : link.name)}
                                                className="p-2 text-slate-400"
                                            >
                                                <ChevronDown className={`w-4 h-4 transition-transform ${openSubMenu === link.name ? 'rotate-180' : ''}`} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Mobile Submenu */}
                                    <AnimatePresence>
                                        {link.subLinks && openSubMenu === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="pl-4 space-y-1 overflow-hidden"
                                            >
                                                {link.subLinks.map((sub) => (
                                                    <a
                                                        key={sub.name}
                                                        href={sub.path}
                                                        onClick={(e) => handleScroll(e, sub.path)}
                                                        className="block py-2 text-sm text-slate-500 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                    >
                                                        {sub.name}
                                                    </a>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                            <div className="pt-4">
                                <button className="w-full px-5 py-3 bg-indigo-600 text-white text-base font-semibold rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
