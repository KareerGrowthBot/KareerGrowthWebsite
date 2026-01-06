import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/images/logo.png';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/#about-us' },
        { name: 'Services', path: '/#services' },
        { name: 'Process', path: '/#process' },
        { name: 'Contact', path: '/contact' },
    ];

    const isHome = location.pathname === '/';

    const handleScroll = (id) => {
        setIsOpen(false);
        if (!isHome && id.startsWith('#')) {
             // Let Link handle navigation to /, then we might need to scroll. 
             // ideally we use react-router-hash-link but standard link is fine for now.
             return;
        }
        
        if (isHome && id.startsWith('#')) {
             const element = document.querySelector(id);
             if (element) {
                 element.scrollIntoView({ behavior: 'smooth' });
             }
        }
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img src={logo} alt="KareerGrowth" className="h-10 w-auto" />
                        {/* <span className="text-xl font-bold text-slate-900 tracking-tight">
                            Kareer<span className="text-yellow-600">Growth</span>
                        </span> */}
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            link.path.startsWith('/#') ? (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    className="text-sm font-medium text-slate-600 hover:text-yellow-600 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ) : (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-sm font-medium transition-colors ${
                                        location.pathname === link.path 
                                            ? 'text-yellow-600' 
                                            : 'text-slate-600 hover:text-yellow-600'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            )
                        ))}
                        <button className="px-5 py-2.5 bg-yellow-600 text-white text-sm font-medium rounded-full hover:bg-yellow-700 transition-colors shadow-lg shadow-yellow-600/20">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden p-2 text-slate-600 hover:text-yellow-600 transition-colors"
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
                        className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
                    >
                        <div className="px-6 py-4 space-y-4">
                            {links.map((link) => (
                                link.path.startsWith('/#') ? (
                                    <a
                                        key={link.name}
                                        href={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-base font-medium text-slate-600 hover:text-yellow-600 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ) : (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`block text-base font-medium transition-colors ${
                                            location.pathname === link.path 
                                                ? 'text-yellow-600' 
                                                : 'text-slate-600 hover:text-yellow-600'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}
                            <div className="pt-4">
                                <button className="w-full px-5 py-3 bg-yellow-600 text-white text-base font-medium rounded-lg hover:bg-yellow-700 transition-colors shadow-lg shadow-yellow-600/20">
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
