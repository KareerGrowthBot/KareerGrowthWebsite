import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-white">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-yellow-200/30 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-[120px] mix-blend-multiply" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">

                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-yellow-50 border border-yellow-100 text-yellow-700 text-sm font-semibold tracking-wide uppercase"
                    >
                        <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                        Next-Gen Career Platform
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.15] mb-8 max-w-5xl"
                    >
                        An AI-Driven Practice & <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-500">
                            Job-Readiness Platform
                        </span> <br />
                        to Build Your Career.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl"
                    >
                        Your complete path to a better career. Create a perfect resume with AI, master your skills through real-time coding practice and proctored mock exams, and access daily job updates to land your dream role.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 mb-12"
                    >
                        <button className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-slate-900 rounded-xl font-bold text-lg hover:bg-yellow-400 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-yellow-200/50 min-w-[200px]">
                            Start Practicing Now
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                        <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 min-w-[200px]">
                            <PlayCircle className="w-5 h-5 mr-2 text-slate-400" />
                            Watch Demo
                        </button>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
