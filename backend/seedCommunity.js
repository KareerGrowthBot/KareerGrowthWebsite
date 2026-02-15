const sequelize = require('./config/db');
const CommunityMember = require('./models/CommunityMember');

const members = [
    {
        name: 'Alex Rivera',
        role: 'Senior Frontend Engineer',
        company: 'Meta',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
        status: 'Active'
    },
    {
        name: 'Priya Sharma',
        role: 'Product Manager',
        company: 'Google',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
        status: 'Active'
    },
    {
        name: 'Jordan Smith',
        role: 'Data Scientist',
        company: 'Amazon',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop',
        status: 'Active'
    },
    {
        name: 'Chen Wei',
        role: 'UX Designer',
        company: 'Airbnb',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop',
        status: 'Active'
    },
    {
        name: 'Sarah Chen',
        role: 'Backend Architect',
        company: 'Netflix',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
        status: 'Active'
    }
];

async function seed() {
    try {
        await sequelize.sync();
        await CommunityMember.bulkCreate(members);
        console.log('Community members seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding community members:', error);
        process.exit(1);
    }
}

seed();
