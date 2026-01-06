import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Code2, Presentation, Briefcase, ArrowRight } from 'lucide-react';

const steps = [
    {
        icon: <UserPlus className="w-8 h-8" />,
        title: "Sign Up & Profile",
        description: "Create your professional identity. Verify email, set goals, and build your base profile."
    },
    {
        icon: <Code2 className="w-8 h-8" />,
        title: "Start Practicing",
        description: "Access AI-driven coding challenges, aptitude tests, and communication drills."
    },
    {
        icon: <Presentation className="w-8 h-8" />,
        title: "Take Mock Tests",
        description: "Simulate real interviews with our advanced AI. Get instant, detailed feedback."
    },
    {
        icon: <Briefcase className="w-8 h-8" />,
        title: "Apply to Jobs",
        description: "Use your verified score to apply directly to top tech companies."
    }
];

const HowItWorks = () => {
    return (
        <section id="process" className="py-20 lg:py-32 bg-white relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50"></div>

            {/* Decorative Patterns */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-sm font-bold text-yellow-600 tracking-[0.2em] uppercase block mb-3">The Process</span>
                    <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">Your Path to <span className="text-yellow-600">Glory</span></h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">From preparation to placement, we guide you every step of the way.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-yellow-500/0 via-yellow-500/30 to-yellow-500/0 -translate-y-1/2"></div>

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
                                <div className="bg-white border border-slate-200 p-8 rounded-2xl relative z-10 h-full hover:border-yellow-200 hover:shadow-xl transition-all duration-300">
                                    <div className="w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600 mb-6 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300">
                                        {step.icon}
                                    </div>
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-400 group-hover:text-yellow-600 group-hover:border-yellow-200 transition-colors shadow-sm">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black rounded-full font-bold hover:bg-yellow-400 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        <span>Get Started Now</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
