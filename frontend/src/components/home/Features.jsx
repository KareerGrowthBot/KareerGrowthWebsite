import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Wand2,
    Target,
    Brain,
    Zap,
    LayoutTemplate,
    Layers,
    Users,
    Code2,
    Check
} from 'lucide-react';

const features = [
    {
        title: "AI Feedback",
        description: "Instant AI feedback on mock interviews.",
        icon: <Wand2 className="w-5 h-5 lg:w-5 lg:h-5 text-white" />,
        color: "bg-blue-500",
        shadow: "shadow-blue-200"
    },
    {
        title: "Targeted Practice",
        description: "Role-specific Prep for your dream company.",
        icon: <Target className="w-5 h-5 lg:w-5 lg:h-5 text-white" />,
        color: "bg-indigo-500",
        shadow: "shadow-indigo-200"
    },
    {
        title: "Skill Assessment",
        description: "Technical and soft skills evaluation.",
        icon: <Brain className="w-5 h-5 lg:w-5 lg:h-5 text-white" />,
        color: "bg-purple-500",
        shadow: "shadow-purple-200"
    },
    {
        title: "Fast-Track Growth",
        description: "Accelerate your career with mentorship.",
        icon: <Zap className="w-5 h-5 lg:w-5 lg:h-5 text-white" />,
        color: "bg-pink-500",
        shadow: "shadow-pink-200"
    },
    {
        title: "Resume Optimization",
        description: "ATS-friendly templates and suggestions.",
        icon: <LayoutTemplate className="w-5 h-5 lg:w-5 lg:h-5 text-white" />,
        color: "bg-orange-500",
        shadow: "shadow-orange-200"
    },
    {
        title: "Holistic Approach",
        description: "From preparation to final negotiation.",
        icon: <Layers className="w-5 h-5 lg:w-5 lg:h-5 text-white" />,
        color: "bg-emerald-500",
        shadow: "shadow-emerald-200"
    },
    {
        title: "Expert Mentorship",
        description: "Connect with world-class mentors.",
        icon: <Users className="w-5 h-5 lg:w-5 lg:h-5 text-white" />,
        color: "bg-cyan-500",
        shadow: "shadow-cyan-200"
    },
    {
        title: "Real-time Coding",
        description: "Practice coding with issue spotting.",
        icon: <Code2 className="w-5 h-5 lg:w-5 lg:h-5 text-white" />,
        color: "bg-rose-500",
        shadow: "shadow-rose-200"
    }
];

const Features = () => {
    const [rotation, setRotation] = useState(0);

    // Infinite rotation loop
    useEffect(() => {
        let animationFrameId;
        const animate = () => {
            setRotation(prev => (prev + 0.2) % 360);
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const radius = 175;
    const hubSize = 180;

    return (
        <section id="features" className="pt-16 pb-12 lg:pt-32 lg:pb-32 bg-white dark:bg-black relative overflow-hidden transition-colors">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center lg:-ml-16">

                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full text-left lg:pr-8"
                    >
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-3 block">Everything you need</span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                            Our <span className="text-indigo-600 dark:text-indigo-400">Core Features</span>
                        </h2>

                        <div className="space-y-4 mb-8 max-w-lg lg:max-w-md">
                            {[
                                { title: "AI-Driven Excellence", desc: "Master every step of your career journey with cutting-edge intelligence." },
                                { title: "Personalized Mock Interviews", desc: "Practice with realistic scenarios and get instant, actionable feedback." },
                                { title: "Expert Resume Optimization", desc: "Build ATS-friendly resumes that stand out to top recruiters." },
                                { title: "Dream Job Success", desc: "Gain the confidence and skills needed to secure your ideal role." }
                            ].map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-4 group"
                                >
                                    <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-emerald-600/20">
                                        <Check className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">{point.title}</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{point.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Desktop Radial Diagram */}
                    <div className="hidden lg:flex items-center justify-center relative h-[600px] w-full">
                        {/* Central Hub Area */}
                        <div className="relative z-20">
                            {/* Decorative Rings synced to extreme compact radius */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-zinc-200/50 dark:border-zinc-800/50 rounded-full" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[225px] h-[225px] border border-zinc-200/20 dark:border-zinc-800/20 rounded-full" />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="bg-white dark:bg-black shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-zinc-100 dark:border-zinc-800 flex items-center justify-center p-6 text-center rounded-full"
                                style={{ width: hubSize, height: hubSize }}
                            >
                                <div className="relative z-10">
                                    <h3 className="text-lg font-black text-black dark:text-white leading-[1.1] tracking-tight">
                                        OUR CORE <br /> FEATURES
                                    </h3>
                                    <div className="flex gap-1 justify-center mt-2.5">
                                        <div className="w-5 h-1 bg-blue-500 rounded-full" />
                                        <div className="w-5 h-1 bg-pink-500 rounded-full" />
                                        <div className="w-5 h-1 bg-orange-500 rounded-full" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Radial Points */}
                        {features.map((item, idx) => {
                            const angle = (idx * (360 / features.length)) - 90 + rotation;
                            const radian = (angle * Math.PI) / 180;

                            const x = radius * Math.cos(radian);
                            const y = radius * Math.sin(radian);

                            const normalizedAngle = ((angle % 360) + 360) % 360;

                            // Elliptical radial text positioning for better horizontal clearance
                            const textRadiusX = 150; // Increased width for sides
                            const textRadiusY = 90;  // Compact height for top/bottom

                            const tx = textRadiusX * Math.cos(radian);
                            const ty = textRadiusY * Math.sin(radian);

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="absolute z-30"
                                    style={{
                                        left: `calc(50% + ${x}px)`,
                                        top: `calc(50% + ${y}px)`,
                                    }}
                                >
                                    <div className="relative flex items-center justify-center">
                                        {/* Icon - Precision Centered */}
                                        <div className={`w-11 h-11 rounded-full ${item.color} ${item.shadow} shadow-lg flex items-center justify-center flex-shrink-0 border-4 border-white dark:border-zinc-900 transition-transform hover:scale-110`}>
                                            {item.icon}
                                        </div>

                                        {/* Text Content - Positioned continuously */}
                                        <div
                                            className="absolute w-[200px] pointer-events-none text-center"
                                            style={{
                                                left: '50%',
                                                top: '50%',
                                                transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`
                                            }}
                                        >
                                            <div className="flex flex-col items-center">
                                                <h4 className="text-[15px] lg:text-[16px] font-bold text-white leading-tight mb-1">{item.title}</h4>
                                                <p className="text-[12px] lg:text-[13px] text-zinc-400 leading-relaxed max-w-[180px] mx-auto">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden mt-8 space-y-4">
                    {features.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="relative flex items-center"
                        >
                            {idx < features.length - 1 && (
                                <div className="absolute left-[24px] top-[48px] w-[2px] h-[calc(100%+8px)] bg-zinc-100 dark:bg-zinc-800 z-0" />
                            )}
                            <div className={`relative z-10 w-12 h-12 rounded-full ${item.color} shadow-md flex items-center justify-center flex-shrink-0 border-2 border-white dark:border-black`}>
                                {item.icon}
                            </div>
                            <div className="ml-[-12px] pl-8 pr-6 py-5 bg-white dark:bg-black rounded-r-xl rounded-l-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-zinc-50 dark:border-zinc-800 w-full">
                                <h4 className="text-[16px] font-bold text-black dark:text-white mb-1">{item.title}</h4>
                                <p className="text-[13px] text-zinc-500 leading-snug">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Features;
