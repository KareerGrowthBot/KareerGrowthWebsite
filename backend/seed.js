const sequelize = require('./config/db');
const Blog = require('./models/Blog');
const Story = require('./models/Story');
const Highlight = require('./models/Highlight');
const ImpactStat = require('./models/ImpactStat');
const BlogStat = require('./models/BlogStat');

const blogs = [
    {
        customId: 1,
        title: "10 Essential Resume Tips for 2026",
        excerpt: "Learn how to make your resume stand out in the age of AI recruiting and automated screening systems.",
        category: "Career Advice",
        author: "Sarah Johnson",
        date: "Feb 12, 2026",
        image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=800&q=80",
        readTime: "5 min read",
        stats: { views: "1.2k", shares: "450" }
    },
    {
        customId: 2,
        title: "Mastering the System Design Interview",
        excerpt: "A comprehensive guide to tackling complex architecture questions in high-stakes technical interviews.",
        category: "Tech Interview",
        author: "David Chen",
        date: "Feb 10, 2026",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        readTime: "8 min read",
        stats: { views: "2.5k", shares: "890" }
    },
    {
        customId: 3,
        title: "Negotiating Your Salary Like a Pro",
        excerpt: "Don't leave money on the table. Discover proven strategies for salary negotiation and benefit packages.",
        category: "Salary",
        author: "Michael Ross",
        date: "Feb 08, 2026",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        readTime: "6 min read",
        stats: { views: "3.1k", shares: "1.2k" }
    },
    {
        customId: 4,
        title: "The Rise of Remote Leadership",
        excerpt: "How to effectively manage and lead distributed teams in the new era of work-from-anywhere.",
        category: "Leadership",
        author: "Emma Wilson",
        date: "Feb 05, 2026",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
        readTime: "7 min read",
        stats: { views: "980", shares: "320" }
    },
    {
        customId: 5,
        title: "Switching from IC to Management",
        excerpt: "Everything you need to know about making the transition from Individual Contributor to Engineering Manager.",
        category: "Career Pivot",
        author: "James Miller",
        date: "Feb 01, 2026",
        image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
        readTime: "10 min read",
        stats: { views: "1.8k", shares: "670" }
    },
    {
        customId: 6,
        title: "Building a Standout Tech Portfolio",
        excerpt: "Project ideas and presentation tips to showcase your skills and land your next big role.",
        category: "Portfolio",
        author: "Alex Turner",
        date: "Jan 28, 2026",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        readTime: "4 min read",
        stats: { views: "2.2k", shares: "940" }
    }
];

const stories = [
    {
        storyId: "ai-interview",
        title: "AI Interview Success",
        name: "Mock Interview Master",
        creator: "Sarah Jenkins",
        rating: 5,
        role: "Skill Advancement",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
        quote: "Our AI-driven mock interviews simulate real-world technical rounds with high precision, helping candidates build confidence and bridge system design gaps.",
        metric: "98% Confidence Boost",
        challenge: "Many candidates struggle with the high-pressure environment of technical interviews, often losing focus or failing to articulate their thought process clearly under stress.",
        strategy: "We implemented an advanced AI simulation that adapts to the candidate's level, providing real-time feedback on both technical accuracy and communication clarity.",
        result: "Candidates showed a 98% increase in confidence scores and significantly higher pass rates at top-tier tech companies like Google and Meta."
    },
    {
        storyId: "resume-revamp",
        title: "Strategic Resume Revamp",
        name: "Portfolio Perfection",
        creator: "David Chen",
        rating: 5,
        role: "Brand Positioning",
        image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=800&h=600&fit=crop",
        quote: "We transform standard resumes into powerful career marketing tools that highlight high-impact achievements and catch the eyes of top-tier recruiters.",
        metric: "5x Profile Visibility",
        challenge: "In a crowded market, brilliant engineers often have resumes that fail to pass through ATS systems or capture recruiter attention within the initial 6-second scan.",
        strategy: "Our career experts worked with AI to analyze job descriptions and optimize resumes for both human impact and system readability, focusing on data-backed achievements.",
        result: "Average profile visibility increased by 5x, leading to a massive surge in interview invites from recruiters at Fortune 500 companies."
    },
    {
        storyId: "salary-negotiation",
        title: "Salary Negotiation",
        name: "Financial Growth",
        creator: "Michael Rodriguez",
        rating: 5,
        role: "Market Valuation",
        image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=600&fit=crop",
        quote: "Master the art of negotiation with data-backed insights. Our members consistently secure salary hikes that reflect their true market worth.",
        metric: "Avg 120% Hike",
        challenge: "Most professionals leave money on the table because they lack real-time market data or the specific psychological frameworks needed for effective negotiation.",
        strategy: "We provided comprehensive market valuation reports and 1:1 negotiation coaching, empowering members to advocate for their market worth with confidence.",
        result: "Members saw an average of 120% salary increase upon switching roles, with many securing sign-on bonuses and equity packages far exceeding initial offers."
    },
    {
        storyId: "global-network",
        title: "Global Tech Network",
        name: "Community Connect",
        creator: "Priyanka Sharma",
        rating: 5,
        role: "Strategic Networking",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
        quote: "Join a global community of elite tech professionals. share insights, resources, and referrals that accelerate your journey into Big Tech.",
        metric: "Global Referral Access",
        challenge: "Strategic networking is often the 'hidden' barrier for international candidates trying to break into global tech hubs.",
        strategy: "We built a structured community platform that facilitates high-quality referrals and insider knowledge sharing across borders and time zones.",
        result: "Over 85% of our members secured interviews through internal community referrals, bypassing traditional application hurdles."
    }
];

const highlights = [
    { name: "Tech Success", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop" },
    { name: "Growth Mindset", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop" },
    { name: "Career Peak", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop" },
    { name: "Network Hub", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=400&fit=crop" },
    { name: "Global Reach", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop" },
    { name: "Mentorship", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=400&fit=crop" },
    { name: "Innovation", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop" },
    { name: "Leadership", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop" }
];

const impactStats = [
    { label: "Success Stories", value: "500+", sub: "Connecting ambitious professionals with their dream careers.", icon: "Trophy" },
    { label: "Global Presence", value: "24", sub: "Expanding our network of success across 24 countries.", icon: "Globe" },
    { label: "Community Builders", value: "10K+", sub: "A vibrant network of tech professionals growing together.", icon: "Users" }
];

const blogStats = [
    { label: "COMMUNITY MEMBERS", value: "10,000+", icon: "Users" },
    { label: "ARTICLES PUBLISHED", value: "250+", icon: "FileText" },
    { label: "MONTHLY READERS", value: "50,000+", icon: "TrendingUp" },
    { label: "EXPERT MENTORS", value: "100+", icon: "Star" }
];

async function seed() {
    await sequelize.sync({ force: true });
    console.log('Database synced.');

    await Blog.bulkCreate(blogs);
    console.log('Blogs seeded.');

    await Story.bulkCreate(stories);
    console.log('Stories seeded.');

    await Highlight.bulkCreate(highlights);
    console.log('Highlights seeded.');

    await ImpactStat.bulkCreate(impactStats);
    console.log('Impact Stats seeded.');

    await BlogStat.bulkCreate(blogStats);
    console.log('Blog Stats seeded.');

    await sequelize.close();
}

seed().catch(err => {
    console.error('Error seeding data:', err);
    process.exit(1);
});
