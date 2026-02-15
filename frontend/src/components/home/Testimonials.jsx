import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Software Engineer @ TechFlow",
        text: "KareerGrowth transformed my interview prep. The mock tests were harder than the real thing!",
        rating: 5
    },
    {
        name: "Michael Chen",
        role: "Data Scientist @ DataCorp",
        text: "The personalized roadmap was a game changer. I knew exactly what to study and when.",
        rating: 5
    },
    {
        name: "Jessica Williams",
        role: "Product Manager @ Innovate",
        text: "Incredible support team and resources. I landed my dream job in just 3 weeks.",
        rating: 5
    },
    {
        name: "David Miller",
        role: "Frontend Developer @ Pixels",
        text: "The real-time coding practice helped me get over my fear of live interviews.",
        rating: 5
    },
    {
        name: "Emily Rodriguez",
        role: "UX Designer @ CreativePulse",
        text: "A must-have for anyone serious about career growth in the modern market.",
        rating: 5
    },
    {
        name: "Alex Thompson",
        role: "Backend Engineer @ CloudScale",
        text: "The AI-driven insights pointed out weaknesses I didn't even know I had.",
        rating: 5
    },
    {
        name: "Sophia Lee",
        role: "DevOps Engineer @ SecureOps",
        text: "From zero to offer in a month. The structure provided by KareerGrowth is top-notch.",
        rating: 5
    },
    {
        name: "Ryan Patel",
        role: "Product Designer @ UserFirst",
        text: "The portfolio guidance was exactly what I needed to stand out to recruiters.",
        rating: 5
    },
    {
        name: "Olivia Brown",
        role: "HR Manager @ TalentAcquire",
        text: "I recommend KareerGrowth to all my candidates who need a bit of extra polish.",
        rating: 5
    }
];

const Testimonials = () => {
    const [isPaused, setIsPaused] = React.useState(false);
    // Duplicate for seamless looping
    const doubledTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="py-24 lg:py-32 bg-white dark:bg-black relative overflow-hidden transition-colors">
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="text-center">
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase block mb-3">Success Stories</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight">What Our Users Say</h2>
                </div>
            </div>

            <div
                className="flex flex-col gap-10 cursor-pointer"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Row 1: Leftward Marquee */}
                <div className="relative flex overflow-hidden">
                    <div
                        className="flex gap-6 px-4 animate-marquee-left"
                        style={{
                            animationDuration: '40s',
                            animationPlayState: isPaused ? 'paused' : 'running'
                        }}
                    >
                        {doubledTestimonials.map((t, index) => (
                            <div
                                key={`r1-${index}`}
                                className="w-[300px] sm:w-[380px] flex-shrink-0 bg-white dark:bg-black p-5 sm:p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-indigo-600 dark:hover:border-indigo-600 transition-all duration-300 relative group"
                            >
                                <Quote className="w-6 h-6 text-indigo-50/50 dark:text-zinc-800/50 absolute top-4 right-4 group-hover:text-indigo-100 dark:group-hover:text-indigo-900/30 transition-colors" />

                                <div className="flex gap-1 mb-3 text-amber-400">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-current" />
                                    ))}
                                </div>

                                <p className="text-zinc-600 dark:text-zinc-400 text-[13px] sm:text-[15px] italic mb-4 leading-relaxed line-clamp-3">"{t.text}"</p>

                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-black dark:text-white leading-tight">{t.name}</h4>
                                        <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2: Rightward Marquee */}
                <div className="relative flex overflow-hidden">
                    <div
                        className="flex gap-6 px-4 animate-marquee-right"
                        style={{
                            animationDuration: '45s',
                            animationPlayState: isPaused ? 'paused' : 'running'
                        }}
                    >
                        {/* Use reversed array for variety if desired, or same array */}
                        {[...doubledTestimonials].reverse().map((t, index) => (
                            <div
                                key={`r2-${index}`}
                                className="w-[300px] sm:w-[380px] flex-shrink-0 bg-white dark:bg-black p-5 sm:p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-indigo-600 dark:hover:border-indigo-600 transition-all duration-300 relative group"
                            >
                                <Quote className="w-6 h-6 text-indigo-50/50 dark:text-zinc-800/50 absolute top-4 right-4 group-hover:text-indigo-100 dark:group-hover:text-indigo-900/30 transition-colors" />

                                <div className="flex gap-1 mb-3 text-amber-400">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-current" />
                                    ))}
                                </div>

                                <p className="text-zinc-600 dark:text-zinc-400 text-[13px] sm:text-[15px] italic mb-4 leading-relaxed line-clamp-3">"{t.text}"</p>

                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-black dark:text-white leading-tight">{t.name}</h4>
                                        <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
