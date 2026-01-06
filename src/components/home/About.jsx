import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import KGLogo from '../../assets/images/KG-logo.png';

const About = () => {
    return (
        <section id="about" className="py-20 lg:py-32 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Content Side - Clean Reference-Style Bot */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: -30 }} // Shifted left
                    whileInView={{ opacity: 1, scale: 1, x: -30 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative flex justify-center items-center -ml-8" // Additional left margin adjustment
                >
                    <div className="relative w-full max-w-2xl aspect-square">
                        {/* Subtle Backdrop */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-slate-100/50 rounded-full blur-3xl -z-10" />

                        <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible drop-shadow-xl">
                            <defs>
                                <linearGradient id="softMetal" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#f8fafc" />
                                    <stop offset="100%" stopColor="#e2e8f0" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>



                            {/* Shadow */}
                            <motion.ellipse
                                cx="250" cy="410" rx="50" ry="6" fill="#000" opacity="0.1"
                                animate={{ scale: [1, 0.85, 1], opacity: [0.1, 0.05, 0.1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* THE BOT */}
                            <motion.g
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {/* Left Arm (Balanced Wire) */}
                                <circle cx="175" cy="290" r="6" fill="#94a3b8" /> {/* Shoulder Joint */}
                                <line x1="175" y1="290" x2="145" y2="290" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                                <circle cx="145" cy="290" r="18" fill="url(#softMetal)" stroke="#cbd5e1" strokeWidth="1" />

                                {/* Right Arm (Balanced Wire + Subtle Shake) */}
                                <circle cx="325" cy="290" r="6" fill="#94a3b8" /> {/* Shoulder Joint */}
                                <motion.g
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
                                >
                                    <line x1="325" y1="290" x2="355" y2="290" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                                    <circle cx="355" cy="290" r="18" fill="url(#softMetal)" stroke="#cbd5e1" strokeWidth="1" />
                                </motion.g>

                                {/* Body (Rounded Rectangle) */}
                                <rect x="175" y="250" width="150" height="110" rx="45" fill="url(#softMetal)" stroke="#cbd5e1" strokeWidth="1" />
                                {/* KG Logo on Chest */}
                                <image href={KGLogo} x="225" y="280" height="50" width="50" />

                                {/* Head (Large Rounded Rectangle) */}
                                <motion.g
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                                >
                                    {/* Antenna */}
                                    <line x1="250" y1="140" x2="250" y2="110" stroke="#94a3b8" strokeWidth="3" />
                                    <circle cx="250" cy="110" r="6" fill="#eab308" />
                                    <motion.circle
                                        cx="250" cy="110" r="12" fill="none" stroke="#eab308" strokeWidth="1.5"
                                        animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />

                                    {/* Head Shape */}
                                    <rect x="160" y="140" width="180" height="120" rx="50" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

                                    {/* Face Screen (Dark Rounded) */}
                                    <rect x="180" y="165" width="140" height="70" rx="25" fill="#1e293b" />

                                    {/* Eyes (Static Yellow Squares) */}
                                    <g>
                                        <rect x="205" y="190" width="22" height="20" rx="4" fill="#fbbf24" filter="url(#glow)" />
                                        <rect x="273" y="190" width="22" height="20" rx="4" fill="#fbbf24" filter="url(#glow)" />
                                    </g>
                                </motion.g>
                            </motion.g>

                            {/* Floating Message Bubble - Moved to Left Side */}
                            <motion.g
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            >
                                <rect x="70" y="195" width="110" height="60" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" className="drop-shadow-lg" />

                                {/* ID Details (Centered layout without avatar) */}
                                <text x="85" y="218" fill="#1e293b" fontSize="12" fontWeight="700" fontFamily="sans-serif">KareerBot</text>
                                <text x="85" y="232" fill="#64748b" fontSize="8" fontWeight="500" fontFamily="sans-serif">ID: Verified • 2025</text>

                                {/* Verified Badge */}
                                <circle cx="165" cy="235" r="10" fill="#dcfce7" stroke="#ffffff" strokeWidth="2" />
                                <path d="M 162 235 L 164 237 L 168 233" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </motion.g>

                        </svg>
                    </div>
                </motion.div>

                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-sm font-bold text-yellow-600 tracking-wider uppercase mb-2 block">Who We Are</span>
                    <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        Bridging the Gap Between <span className="text-yellow-600">Ambition</span> and <span className="text-yellow-600">Achievement</span>.
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">
                        Our AI-driven platform and expert mentorship provide the tools you need to master interviews, refine your skills, and secure your dream role. We combine personalized learning paths with cutting-edge technology to ensure your success.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 mb-10">
                        {[
                            { text: "AI Resume Scoring", icon: <TrendingUp className="w-5 h-5 text-yellow-600" /> },
                            { text: "Proctored Mock Tests", icon: <ShieldCheck className="w-5 h-5 text-yellow-600" /> },
                            { text: "Real-time Coding", icon: <CheckCircle2 className="w-5 h-5 text-yellow-600" /> },
                            { text: "Expert Mentorship", icon: <Users className="w-5 h-5 text-yellow-600" /> }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-yellow-200 transition-colors">
                                {item.icon}
                                <span className="text-slate-800 font-medium text-sm">{item.text}</span>
                            </div>
                        ))}
                    </div>


                </motion.div>

            </div>
        </section>
    );
};

export default About;
