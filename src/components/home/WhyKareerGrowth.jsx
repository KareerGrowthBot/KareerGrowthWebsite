import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Counter = ({ end, duration = 2, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            let startTime = null;
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = (timestamp - startTime) / (duration * 1000);
                if (progress < 1) {
                    setCount(Math.floor(progress * end));
                    requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [isInView, end, duration]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}{suffix}
        </span>
    );
};

const WhyKareerGrowth = () => {
    const features = [
        {
            title: "Daily Jobs",
            desc: "Fresh opportunities every single day.",
            image: "/images/why/daily_jobs_v3.png",
            color: "border-blue-400 text-blue-500"
        },
        {
            title: "Mock Interview",
            desc: "Simulate real industry leaders' interviews.",
            image: "/images/why/mock_interview_v3.png",
            color: "border-sky-400 text-sky-500"
        },
        {
            title: "AI Driven Test",
            desc: "Technical skill evaluation with precision.",
            image: "/images/why/ai_test_v1.png",
            color: "border-indigo-400 text-indigo-500"
        },
        {
            title: "Resume Guiding",
            desc: "ATS-ready resume with expert AI help.",
            image: "/images/why/resume_guiding_v3.png",
            color: "border-blue-500 text-blue-600"
        },
        {
            title: "Practice Session",
            desc: "Unlimited drills for coding and aptitude.",
            image: "/images/why/practice_session_v1.png",
            color: "border-sky-500 text-sky-600"
        }
    ];

    const stats = [
        { label: "Job Seekers", value: 10000, suffix: "+" },
        { label: "Expert Mentors", value: 500, suffix: "+" },
        { label: "Mock Tests", value: 20000, suffix: "+" },
        { label: "Success Rate", value: 95, suffix: "%" }
    ];

    return (
        <section className="font-sans overflow-hidden pt-12 pb-6 lg:pt-24 lg:pb-10 bg-white dark:bg-black relative transition-colors">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl lg:text-5xl font-bold text-black dark:text-white mb-4 leading-tight">
                            Why <span className="text-indigo-600 dark:text-indigo-400">KareerGrowth</span>?
                        </h2>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="relative mb-16 lg:mb-32">
                    {/* Desktop/Tablet Grid */}
                    <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center text-center relative group"
                            >
                                <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 relative transition-transform hover:-translate-y-2 duration-500 cursor-pointer flex items-center justify-center mb-4 md:mb-6">
                                    <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>

                                <h3 className="text-base md:text-lg lg:text-xl font-bold text-black dark:text-white leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile optimized layout (3 + 2 centered) */}
                    <div className="sm:hidden flex flex-col gap-10">
                        {/* First Row: 3 Items */}
                        <div className="grid grid-cols-3 gap-2">
                            {features.slice(0, 3).map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col items-center text-center"
                                >
                                    <div className="w-16 h-16 shrink-0 relative mb-3">
                                        <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                                            <img
                                                src={feature.image}
                                                alt={feature.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-[10px] font-bold text-black dark:text-white leading-tight px-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[8px] text-zinc-500 mt-1 leading-tight px-0.5">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Second Row: 2 Items Centered */}
                        <div className="flex justify-center gap-10">
                            {features.slice(3, 5).map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col items-center text-center w-[28%]"
                                >
                                    <div className="w-16 h-16 shrink-0 relative mb-3">
                                        <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                                            <img
                                                src={feature.image}
                                                alt={feature.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-[10px] font-bold text-black dark:text-white leading-tight px-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[8px] text-zinc-500 mt-1 leading-tight px-0.5">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-indigo-600 text-white py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-4 gap-1 sm:gap-4 md:gap-12 text-center divide-white/10">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col items-center justify-center">
                                <div className="text-[15px] sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1 tracking-tight">
                                    <Counter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <p className="text-indigo-100 text-[8px] sm:text-[11px] md:text-xs font-bold uppercase tracking-widest leading-tight opacity-80">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyKareerGrowth;
