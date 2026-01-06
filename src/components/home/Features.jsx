import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, LayoutTemplate, Eye, FileDown, CheckCircle2, Layers, Brain, Target, Zap } from 'lucide-react';
import KGLogo from '../../assets/images/KG-logo.png';

const features = [
    {
        icon: <Wand2 className="w-6 h-6" />,
        title: "AI Feedback",
        description: "Get instant, AI-driven feedback on your mock interviews and resume."
    },
    {
        icon: <Target className="w-6 h-6" />,
        title: "Targeted Practice",
        description: "Role-specific questions and scenarios tailored to your dream company."
    },
    {
        icon: <Brain className="w-6 h-6" />,
        title: "Skill Assessment",
        description: "Comprehensive evaluation of your technical and soft skills."
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Fast-Track Growth",
        description: "Accelerate your career trajectory with proven strategies and mentorship."
    },
    {
        icon: <LayoutTemplate className="w-6 h-6" />,
        title: "Resume Optimization",
        description: "ATS-friendly templates and content suggestions to get you noticed."
    },
    {
        icon: <Layers className="w-6 h-6" />,
        title: "Holistic Approach",
        description: "From preparation to negotiation, we cover every step of the journey."
    }
];

const Features = () => {
    return (
        <section id="features" className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-yellow-200/20 rounded-full blur-[100px]" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-slate-200/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-10 lg:mb-0"
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">A Comprehensive Overview of Our Features</h2>
                </motion.div>

                {/* Desktop Radial Layout Area - Hidden on Mobile */}
                <div className="hidden lg:block relative w-full h-[800px] -mt-24">

                    {/* Center Bot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        {/* Connecting Circle/Aura - Scaled up for the larger area */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-200/50 rounded-full pointer-events-none" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-slate-100/50 rounded-full pointer-events-none" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative w-[280px] h-[280px]"
                        >
                            {/* Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-yellow-100/40 rounded-full blur-3xl -z-10" />

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
                                    {/* Left Arm */}
                                    <circle cx="175" cy="290" r="6" fill="#94a3b8" />
                                    <line x1="175" y1="290" x2="145" y2="290" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                                    <circle cx="145" cy="290" r="18" fill="url(#softMetal)" stroke="#cbd5e1" strokeWidth="1" />

                                    {/* Right Arm */}
                                    <circle cx="325" cy="290" r="6" fill="#94a3b8" />
                                    <motion.g
                                        animate={{ y: [0, -3, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
                                    >
                                        <line x1="325" y1="290" x2="355" y2="290" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                                        <circle cx="355" cy="290" r="18" fill="url(#softMetal)" stroke="#cbd5e1" strokeWidth="1" />
                                    </motion.g>

                                    {/* Body */}
                                    <rect x="175" y="250" width="150" height="110" rx="45" fill="url(#softMetal)" stroke="#cbd5e1" strokeWidth="1" />
                                    <image href={KGLogo} x="225" y="280" height="50" width="50" />

                                    {/* Head */}
                                    <motion.g
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                                    >
                                        <line x1="250" y1="140" x2="250" y2="110" stroke="#94a3b8" strokeWidth="3" />
                                        <circle cx="250" cy="110" r="6" fill="#eab308" />
                                        <motion.circle
                                            cx="250" cy="110" r="12" fill="none" stroke="#eab308" strokeWidth="1.5"
                                            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />

                                        <rect x="160" y="140" width="180" height="120" rx="50" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                                        <rect x="180" y="165" width="140" height="70" rx="25" fill="#1e293b" />

                                        {/* Eyes */}
                                        <g>
                                            <rect x="205" y="190" width="22" height="20" rx="4" fill="#fbbf24" filter="url(#glow)" />
                                            <rect x="273" y="190" width="22" height="20" rx="4" fill="#fbbf24" filter="url(#glow)" />
                                        </g>
                                    </motion.g>
                                </motion.g>
                            </svg>
                        </motion.div>
                    </div>

                    {/* Connecting Lines SVG Layer */}
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" style={{ overflow: 'visible' }}>
                        {/* Lines radiating from center (50% 50%) to the estimated positions of icons */}
                        {/* Note: Coordinate system is relative to the container 800px wide (variable percent) x 800px height */}
                        {/* We use percentages in lines to match CSS positioning */}

                        {/* Left Side Lines */}
                        <line x1="50%" y1="50%" x2="25%" y2="20%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" className="opacity-50" />
                        <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" className="opacity-50" />
                        <line x1="50%" y1="50%" x2="25%" y2="80%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" className="opacity-50" />

                        {/* Right Side Lines */}
                        <line x1="50%" y1="50%" x2="75%" y2="20%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" className="opacity-50" />
                        <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" className="opacity-50" />
                        <line x1="50%" y1="50%" x2="75%" y2="80%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" className="opacity-50" />
                    </svg>

                    {/* Features Components */}
                    {/* Top Left */}
                    <motion.div
                        className="absolute top-[18%] left-[20%] w-[300px] text-right flex flex-col items-end gap-3"
                        initial={{ opacity: 0, x: -20, y: -20 }} whileInView={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-xl font-bold text-yellow-600">{features[0].title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{features[0].description}</p>
                        <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-yellow-600 mt-2">
                            {features[0].icon}
                        </div>
                    </motion.div>

                    {/* Middle Left */}
                    <motion.div
                        className="absolute top-[50%] left-[5%] -translate-y-[60%] w-[300px] text-right flex flex-col items-end gap-3"
                        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-xl font-bold text-yellow-600">{features[1].title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{features[1].description}</p>
                        <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-yellow-600 mt-2">
                            {features[1].icon}
                        </div>
                    </motion.div>

                    {/* Bottom Left */}
                    <motion.div
                        className="absolute bottom-[18%] left-[20%] w-[300px] text-right flex flex-col items-end gap-3"
                        initial={{ opacity: 0, x: -20, y: 20 }} whileInView={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-xl font-bold text-yellow-600">{features[2].title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{features[2].description}</p>
                        <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-yellow-600 mt-2">
                            {features[2].icon}
                        </div>
                    </motion.div>


                    {/* Top Right */}
                    <motion.div
                        className="absolute top-[18%] right-[20%] w-[300px] text-left flex flex-col items-start gap-3"
                        initial={{ opacity: 0, x: 20, y: -20 }} whileInView={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-xl font-bold text-yellow-600">{features[3].title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{features[3].description}</p>
                        <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-yellow-600 mt-2">
                            {features[3].icon}
                        </div>
                    </motion.div>

                    {/* Middle Right */}
                    <motion.div
                        className="absolute top-[50%] right-[5%] -translate-y-[60%] w-[300px] text-left flex flex-col items-start gap-3"
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                    >
                        <h3 className="text-xl font-bold text-yellow-600">{features[4].title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{features[4].description}</p>
                        <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-yellow-600 mt-2">
                            {features[4].icon}
                        </div>
                    </motion.div>

                    {/* Bottom Right */}
                    <motion.div
                        className="absolute bottom-[18%] right-[20%] w-[300px] text-left flex flex-col items-start gap-3"
                        initial={{ opacity: 0, x: 20, y: 20 }} whileInView={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.6 }}
                    >
                        <h3 className="text-xl font-bold text-yellow-600">{features[5].title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{features[5].description}</p>
                        <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-yellow-600 mt-2">
                            {features[5].icon}
                        </div>
                    </motion.div>

                </div>

                {/* Mobile/Tablet Fallback (Stacked) */}
                <div className="lg:hidden mt-10 space-y-12">
                    <div className="flex justify-center">
                        <div className="relative w-[80%] aspect-square max-w-[300px]">
                            {/* Bot SVG copy for mobile (simplified reused code logic or just same structure) */}
                            {/* For simplicity allowing re-render of bot here or we could componentize it. 
                                Since user asked for layout change, I'll copy the SVG briefly or just show the items properly.
                                Let's show the Bot First.
                            */}
                            <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible drop-shadow-xl">
                                <defs>
                                    <linearGradient id="softMetalMobile" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#f8fafc" />
                                        <stop offset="100%" stopColor="#e2e8f0" />
                                    </linearGradient>
                                </defs>
                                <motion.g
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {/* Simplified Bot for Mobile - Just Body/Head to avoid code bloat if needed, but keeping full is better */}
                                    <circle cx="175" cy="290" r="6" fill="#94a3b8" />
                                    <line x1="175" y1="290" x2="145" y2="290" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                                    <circle cx="145" cy="290" r="18" fill="url(#softMetalMobile)" stroke="#cbd5e1" strokeWidth="1" />
                                    <circle cx="325" cy="290" r="6" fill="#94a3b8" />
                                    <line x1="325" y1="290" x2="355" y2="290" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                                    <circle cx="355" cy="290" r="18" fill="url(#softMetalMobile)" stroke="#cbd5e1" strokeWidth="1" />
                                    <rect x="175" y="250" width="150" height="110" rx="45" fill="url(#softMetalMobile)" stroke="#cbd5e1" strokeWidth="1" />
                                    <image href={KGLogo} x="225" y="280" height="50" width="50" />
                                    <g transform="translate(0, -5)">
                                        <line x1="250" y1="140" x2="250" y2="110" stroke="#94a3b8" strokeWidth="3" />
                                        <circle cx="250" cy="110" r="6" fill="#eab308" />
                                        <rect x="160" y="140" width="180" height="120" rx="50" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                                        <rect x="180" y="165" width="140" height="70" rx="25" fill="#1e293b" />
                                        <rect x="205" y="190" width="22" height="20" rx="4" fill="#fbbf24" />
                                        <rect x="273" y="190" width="22" height="20" rx="4" fill="#fbbf24" />
                                    </g>
                                </motion.g>
                            </svg>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center"
                            >
                                <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600 mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-slate-600 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Features;
