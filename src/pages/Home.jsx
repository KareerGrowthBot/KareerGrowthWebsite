import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import About from '../components/home/About';
import Services from '../components/home/Services';
import WhyKareerGrowth from '../components/home/WhyKareerGrowth';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
    return (
        <main>
            <Hero />
            <About />
            <Features />
            <Services />
            <WhyKareerGrowth />
            <HowItWorks />
            <Testimonials />
        </main>
    );
};

export default Home;
