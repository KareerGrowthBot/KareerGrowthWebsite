import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="relative pt-8 pb-4 lg:pt-16 lg:pb-32 overflow-hidden bg-white dark:bg-black transition-colors">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-200/30 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply animate-float" />
                <div className="absolute bottom-[10%] right-[20%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-slate-200/40 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">

                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-sm font-semibold tracking-wide uppercase"
                    >
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        Next-Gen Career Platform
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black dark:text-white leading-[1.15] mb-6 md:mb-8 max-w-5xl px-2"
                    >
                        An AI-Driven Practice & <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500 relative">
                            Job-Readiness Platform
                            <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-indigo-100 -z-10 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </span> <br />
                        to Build Your Career.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8 sm:mb-10 leading-relaxed max-w-3xl"
                    >
                        Your complete path to a better career. Create a perfect resume with AI, master your skills through real-time coding practice and proctored mock exams, and access daily job updates to land your dream role.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-12 w-full sm:w-auto px-6 sm:px-0"
                    >
                        <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-indigo-600 text-white rounded-xl font-bold text-base sm:text-lg hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-indigo-200/50 min-w-full sm:min-w-[200px] overflow-hidden group relative">
                            <span className="relative z-10 flex items-center">
                                Start Practicing Now
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine" />
                        </button>
                        <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black border border-zinc-200 rounded-xl font-bold text-base sm:text-lg hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-300 min-w-full sm:min-w-[200px]">
                            <PlayCircle className="w-5 h-5 mr-2 text-indigo-500" />
                            Watch Demo
                        </button>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
