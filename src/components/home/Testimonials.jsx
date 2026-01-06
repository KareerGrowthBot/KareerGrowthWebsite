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
    }
];

const Testimonials = () => {
    return (
        <section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold text-yellow-600 tracking-wider uppercase block mb-2">Success Stories</span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">What Our Users Say</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative"
                        >
                            <Quote className="w-10 h-10 text-yellow-100 absolute top-6 right-6" />

                            <div className="flex gap-1 mb-6 text-yellow-400">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <p className="text-slate-600 text-lg italic mb-6 leading-relaxed">"{t.text}"</p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-lg">
                                    {t.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                                    <p className="text-sm text-yellow-600 font-medium">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
