import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Users, TrendingUp, Code2, Bell, MessageSquare, Monitor, ArrowRight } from 'lucide-react';

const ServiceCard = ({ title, description, icon, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white dark:bg-black rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-indigo-600 dark:hover:border-indigo-600 transition-all duration-300 flex flex-col h-full"
        >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                {React.cloneElement(icon, { size: 24 })}
            </div>

            <h3 className="text-lg font-bold text-black dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {title}
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                {description}
            </p>

            <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-bold text-sm group/btn cursor-pointer">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </div>
        </motion.div>
    );
};

const Services = () => {
    const [isPaused, setIsPaused] = React.useState(false);

    const features = [
        {
            title: "Comprehensive Practice",
            description: "Master essential skills with unlimited practice across multiple domains.",
            icon: <BookOpen />
        },
        {
            title: "Resume Builder",
            description: "Build professional, ATS-friendly resumes with instant scores and tips.",
            icon: <FileText />
        },
        {
            title: "Mock Tests",
            description: "Realistic simulations based on your performance history.",
            icon: <Users />
        },
        {
            title: "Trending Questions",
            description: "Access the latest and most asked interview questions in one place.",
            icon: <TrendingUp />
        },
        {
            title: "Coding Problems",
            description: "Custom coding challenges with real-time execution and test cases.",
            icon: <Code2 />
        },
        {
            title: "Daily Job Updates",
            description: "Daily curated job openings matched to your profile.",
            icon: <Bell />
        },
        {
            title: "Job-Specific Prep",
            description: "Prepare with questions tailored to specific roles and companies.",
            icon: <MessageSquare />
        },
        {
            title: "Code Editor",
            description: "Pro-level editor with syntax highlighting and debug tools.",
            icon: <Monitor />
        }
    ];

    // Duplicate for seamless scroll
    const doubledFeatures = [...features, ...features];

    return (
        <section id="services" className="py-16 lg:py-24 bg-white dark:bg-black relative overflow-hidden transition-colors">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-[10%] -left-[5%] w-[30%] h-[30%] bg-indigo-100/30 rounded-full blur-[80px]" />
                <div className="absolute top-[60%] -right-[5%] w-[25%] h-[25%] bg-slate-200/30 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 mb-16">
                {/* Header */}
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-[0.2em] uppercase block mb-3">Our Expertise</span>
                        <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                            Tailored <span className="text-indigo-600 dark:text-indigo-400">Services</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full mb-6"></div>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto font-medium">
                            Comprehensive tools and guidance designed to accelerate your career growth in the tech industry.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Marquee Container */}
            <div
                className="relative flex overflow-hidden cursor-pointer"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    className="flex gap-6 px-4 animate-marquee-left"
                    style={{
                        animationDuration: '35s',
                        animationPlayState: isPaused ? 'paused' : 'running'
                    }}
                >
                    {doubledFeatures.map((feature, index) => (
                        <div key={index} className="w-[300px] flex-shrink-0">
                            <ServiceCard
                                index={index}
                                {...feature}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
