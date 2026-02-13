import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Users, TrendingUp, Code2, Bell, MessageSquare, Monitor, ArrowRight } from 'lucide-react';

const ServiceCard = ({ title, description, icon, bgColor, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -45, zIndex: 50 }}
            viewport={{ once: true }}
            transition={{
                type: "tween",
                ease: "easeOut",
                duration: 0.1
            }}
            className={`group rounded-3xl p-8 border-2 border-black/5 shadow-sm hover:shadow-2xl flex flex-col h-full min-h-[350px] text-black ${bgColor} relative`}
        >
            <div className="w-16 h-16 rounded-2xl bg-black/10 flex items-center justify-center mb-8 transition-transform duration-300">
                {React.cloneElement(icon, { size: 32, strokeWidth: 2.5 })}
            </div>

            <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight">
                {title}
            </h3>

            <p className="text-black/80 text-sm md:text-base font-bold leading-relaxed mb-8 flex-grow">
                {description}
            </p>

            <div className="flex items-center font-black text-sm group/btn cursor-pointer mt-auto">
                <span className="tracking-widest">EXPLORE MORE</span>
                <ArrowRight className="w-5 h-5 ml-2 transition-transform" />
            </div>
        </motion.div>
    );
};

const Services = () => {
    const [isPaused, setIsPaused] = React.useState(false);

    const features = [
        {
            title: "Comprehensive Practice",
            description: "Master technical skills across multiple domains. Access 5000+ practice questions in DSA, System Design, and Core Engineering subjects to sharpen your expertise and confidence.",
            icon: <BookOpen />,
            bgColor: "bg-[#B6FF60]" // Neon Green
        },
        {
            title: "Resume Builder",
            description: "Create high-impact, ATS-optimized resumes in minutes. Get real-time feedback on your content, formatting, and keyword density to ensure you stand out from the crowd.",
            icon: <FileText />,
            bgColor: "bg-[#FFD700]" // Yellow
        },
        {
            title: "Mock Test Simulations",
            description: "Experience true-to-life interview scenarios. Our AI analyzes your technical depth, body language, and tone to provide actionable insights for your continuous improvement.",
            icon: <Users />,
            bgColor: "bg-[#FF69B4]" // Pink
        },
        {
            title: "Trending Questions",
            description: "Stay ahead of the curve with real-time interview insights. We aggregate recent questions from top tech giants like Google, Amazon, and Meta to help you prepare effectively.",
            icon: <TrendingUp />,
            bgColor: "bg-[#87CEEB]" // Sky Blue
        },
        {
            title: "Coding Challenges",
            description: "Solve real-world coding problems in our integrated environment. Progress through curated challenges from easy to hard, covering all major data structures and algorithms.",
            icon: <Code2 />,
            bgColor: "bg-[#FF8C00]" // Orange
        },
        {
            title: "Daily Job Alerts",
            description: "Never miss an opportunity with our smart job updates. We scan 100+ job boards daily to bring you personalized listings that perfectly match your skills and career aspirations.",
            icon: <Bell />,
            bgColor: "bg-[#B6FF60]" // Neon Green
        },
        {
            title: "Company-Specific Prep",
            description: "Get ready for your dream role with targeted preparation. Access company-specific guides and role-based question banks designed to give you a definitive competitive edge.",
            icon: <MessageSquare />,
            bgColor: "bg-[#FFD700]" // Yellow
        },
        {
            title: "Advanced Code Editor",
            description: "Code like a pro with our powerful web-based IDE. Featuring multi-language support, syntax highlighting, and an integrated debugger for a seamless development experience.",
            icon: <Monitor />,
            bgColor: "bg-[#FF69B4]" // Pink
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

            <div className="max-w-7xl mx-auto px-6 mb-8">
                {/* Header */}
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-[0.2em] uppercase block mb-3">Our Expertise</span>
                        <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                            Tailored <span className="text-indigo-600 dark:text-indigo-400">Services</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full mb-6"></div>
                    </motion.div>
                </div>
            </div>

            {/* Marquee Container */}
            <div
                className="relative flex overflow-hidden cursor-pointer pt-14 pb-16"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    className="flex gap-8 px-4 py-4 animate-marquee-left"
                    style={{
                        animationDuration: '30s',
                        animationPlayState: isPaused ? 'paused' : 'running'
                    }}
                >
                    {doubledFeatures.map((feature, index) => (
                        <div key={index} className="w-[320px] flex-shrink-0">
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
