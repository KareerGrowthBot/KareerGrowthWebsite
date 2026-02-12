import React from 'react';
import { motion } from 'framer-motion';

const highlightAI = (text) => {
    const parts = text.split(/(\bAI\b)/gi);
    return parts.map((p, i) =>
        p.toUpperCase() === "AI" ? (
            <span key={i} className="text-[#1a1b4b] dark:text-white font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI</span>
        ) : (
            p
        )
    );
};

const WeCoverItAll = () => {
    return (
        <section id="ai-workflow" className="bg-white dark:bg-black py-16 lg:py-32 px-6 font-sans overflow-hidden transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* LEFT COLUMN: TEXT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight mb-6 md:mb-8 tracking-tight">
                            We Cover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">It All</span> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI.</span>
                        </h2>
                        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-8 max-w-xl">
                            Our <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI</span>-powered strategic workflow is designed to streamline your hiring process from start to finish.
                        </p>

                        {/* Workflow Steps List */}
                        <div className="space-y-5 mb-10">
                            {[
                                "Job Post",
                                "Resume Check",
                                "First Screening",
                                "Shortlist",
                                "Hire"
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 group cursor-default"
                                >
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)] group-hover:scale-125 transition-transform duration-300"></div>
                                    <span className="text-xl md:text-2xl font-bold text-black dark:text-white group-hover:text-blue-600 transition-colors duration-300">
                                        {step}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <button className="px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-xl text-base font-bold hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1">
                            Start Hiring Now
                        </button>


                    </motion.div>

                    {/* RIGHT COLUMN: 2x2 GRID (Boxes) */}
                    <div className="w-full lg:w-1/2">
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            {[
                                { title: "You post job", desc: "Share your requirements instantly.", image: "/images/wc_job_post_ui_1770900130496.png" },
                                { title: "We filter", desc: "AI-powered screening for best match.", image: "/images/wc_ai_filter_ui_1770900148237.png" },
                                { title: "Hire faster", desc: "Reduce time-to-hire by 60% with AI.", image: "/images/wc_fast_hire_ui_1770900167225.png" },
                                { title: "Promise", desc: "Real companies. No fake posts.", image: "/images/wc_promise_badge_ui_1770900184471.png" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                    className={`group relative overflow-hidden p-5 md:p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-500 flex flex-col justify-end h-full min-h-[220px] md:min-h-[280px] ${index % 2 !== 0 ? 'lg:translate-y-8' : ''}`}
                                >

                                    {/* Background Image */}
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 dark:opacity-70 mix-blend-overlay dark:mix-blend-normal"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-black dark:via-black/80 dark:to-transparent opacity-90"></div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="relative z-10 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-lg md:text-xl font-bold text-black dark:text-white mb-1.5 leading-tight">{item.title}</h3>
                                        <p className="text-[10px] md:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                                            {highlightAI(item.desc)}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WeCoverItAll;
