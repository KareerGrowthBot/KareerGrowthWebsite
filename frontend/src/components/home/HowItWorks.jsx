import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Code2, Presentation, Briefcase, ArrowRight } from 'lucide-react';

const steps = [
    {
        icon: <UserPlus className="w-8 h-8" />,
        title: "Signup & Create Profile",
        description: "Create your professional identity. Verify email, set goals, and build your base profile."
    },
    {
        icon: <Code2 className="w-8 h-8" />,
        title: "Practice Session",
        description: "Access customized drills for General, Position, Coding, and Aptitude tests."
    },
    {
        icon: <Presentation className="w-8 h-8" />,
        title: "Attend Mock Test",
        description: "Simulate real interviews with our advanced AI. Get instant, detailed feedback."
    },
    {
        icon: <Briefcase className="w-8 h-8" />,
        title: "Apply Daily New Jobs",
        description: "Use your verified performance to apply for daily updated job opportunities."
    }
];

const HowItWorks = () => {
    return (
        <section id="process" className="pt-4 pb-4 lg:pt-12 lg:pb-32 bg-white dark:bg-black relative overflow-hidden transition-colors">
            {/* Decorative Patterns */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-6 sm:mb-20">
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-[0.2em] uppercase block mb-3">The Process</span>
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">Your Path to <span className="text-indigo-600 dark:text-indigo-400">Glory</span></h2>
                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto px-4">From preparation to placement, we guide you every step of the way.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 -translate-y-1/2"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative group"
                            >
                                <div className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl relative z-10 h-full hover:border-indigo-600 dark:hover:border-indigo-600 hover:shadow-xl transition-all duration-300 shadow-sm">
                                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                        {step.icon}
                                    </div>
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-400 dark:text-zinc-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:border-indigo-200 dark:group-hover:border-indigo-600 transition-colors shadow-sm">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-black dark:text-white mb-2 sm:mb-3">{step.title}</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <span>Get Started Now</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
