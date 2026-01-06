import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, FileText, Users, TrendingUp, Code2, Bell, MessageSquare, Monitor, ArrowRight } from 'lucide-react';

const FeatureCard = ({ title, description, icon, angle, isActive, isMobile, radius }) => {
    // Only render if within a certain angle range to improve performance/visuals
    // Active is at -90deg (top of circle). 
    // Visible range: -90 +/- 60 degrees.
    const isVisible = Math.abs(angle + 90) < 100;

    // Convert angle to radians for position calculation
    const rad = (angle * Math.PI) / 180;

    // Calculate x, y relative to the center of rotation (0,0)
    // 0,0 is the hub center.
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;

    // Rotation of the card itself. 
    // Usually card rotates with the arm: angle + 90.
    const rotate = angle + 90;

    if (!isVisible) return null;

    // Uniform styling - no dimming for side cards as requested
    const shadow = isActive ? 'shadow-2xl' : 'shadow-lg';
    const zIndex = isActive ? 50 : 10;

    return (
        <motion.div
            animate={{
                x,
                y,
                rotate,
                zIndex,
                // filter: `brightness(${brightness}%)` // Removed to keep uniform color
            }}
            transition={{
                duration: 0.8,
                ease: [0.32, 0.72, 0, 1] // Custom snappy spring-like bezier
            }}
            className={`absolute w-[260px] md:w-[340px] h-[330px] md:h-[440px] rounded-[3rem] bg-[#fffdf5] ${shadow} border border-slate-200/60 flex flex-col items-center justify-center p-8 text-center origin-center shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)]`}
            style={{
                // Center the card on its pivot point
                left: '50%',
                top: '50%',
                marginLeft: isMobile ? -130 : -170, // Half of width
                marginTop: isMobile ? -165 : -220,  // Half of height
                backgroundColor: '#fffbeb' // Lightest yellow (amber-50 equivalent)
            }}
        >
            {/* Text Content - Counter rotated slightly if needed, but wheel usually rotates content too */}
            <div className="flex-1 flex flex-col justify-center items-center">
                <h3 className="text-slate-900 font-bold text-2xl md:text-4xl mb-6 font-display leading-tight">{title}</h3>
                <p className="text-slate-800 text-sm md:text-base leading-relaxed line-clamp-4 font-medium opacity-80">
                    {description}
                </p>
            </div>

            {/* Icon/Button Area */}
            <div className="mt-6 w-full flex justify-center">
                <div className="h-14 px-8 rounded-full border border-slate-700/30 flex items-center gap-3 text-slate-900 font-medium group cursor-pointer hover:bg-slate-800 hover:text-white transition-all">
                    <span>Explore</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </motion.div>
    );
};

const Services = () => {
    const [features] = useState([
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
    ]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-scroll logic
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [features.length]);

    // Geometry Configuration
    const radius = isMobile ? 380 : 800; // Distance from hub to card center
    const angleStep = isMobile ? 35 : 25; // Degrees between cards. 

    // Adjusted spacing: Closer than before, but wide enough to prevent touching
    const safeAngleStep = isMobile ? 47 : 33;

    const baseRotation = -90; // The active card is at -90 degrees (12 o'clock relative to hub center)

    return (
        <section id="services" className="relative py-20 bg-slate-50 overflow-hidden h-screen min-h-[800px] flex flex-col justify-end items-center">
            {/* Decorative Elements - Matching Features Section */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-yellow-200/20 rounded-full blur-[100px]" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-slate-200/20 rounded-full blur-[100px]" />
            </div>

            {/* Section Heading */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute top-30 left-0 w-full z-30 text-center px-4"
            >
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4 font-display">Our Services</h2>
            </motion.div>

            {/* The Pivot Point / Hub Center */}
            {/* We position this at the bottom center of the screen */}
            <div className="absolute bottom-[-200px] md:bottom-[-400px] left-1/2 w-0 h-0 z-20">

                {/* Visual Hub (The semi-circle) */}
                {/* Visual Hub (The semi-circle) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] rounded-full bg-yellow-400 flex justify-center items-start pt-[80px] md:pt-[120px] shadow-[0_-20px_60px_-15px_rgba(234,179,8,0.3)] border-t border-yellow-300">
                    <h2 className="text-slate-900 font-bold text-5xl md:text-8xl tracking-wide uppercase drop-shadow-sm opacity-90">Services</h2>
                </div>

                {/* Rotating Cards Layer */}
                {/* This layer doesn't rotate, the cards position themselves */}
                {features.map((feature, index) => {
                    // Logic to make it look like an infinite wheel
                    // Calculate "distance" from active index
                    // We want index 0 to be at -90deg when activeIndex is 0
                    // index 1 at -90 + step, etc.

                    // To handle infinite looping smoothly, we need to map indices nicely.
                    // But for 8 items, a simple modulo math relative to active works fine for display angle

                    let offset = index - activeIndex;
                    // Wrap shortest path
                    const half = features.length / 2;
                    if (offset > half) offset -= features.length;
                    if (offset < -half) offset += features.length;

                    const angle = baseRotation + (offset * safeAngleStep);

                    return (
                        <FeatureCard
                            key={index}
                            {...feature}
                            angle={angle}
                            isActive={index === activeIndex}
                            isMobile={isMobile}
                            radius={radius}
                        />
                    );
                })}

            </div>

        </section>
    );
};

export default Services;
