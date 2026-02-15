const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Story = sequelize.define('Story', {
    storyId: { // To match original string IDs (e.g., 'ai-interview')
        type: DataTypes.STRING,
        unique: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
    },
    creator: {
        type: DataTypes.STRING,
    },
    rating: {
        type: DataTypes.INTEGER,
    },
    role: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    quote: {
        type: DataTypes.TEXT,
    },
    metric: {
        type: DataTypes.STRING,
    },
    challenge: {
        type: DataTypes.TEXT,
    },
    strategy: {
        type: DataTypes.TEXT,
    },
    result: {
        type: DataTypes.TEXT,
    },
    content: {
        type: DataTypes.TEXT,
    },
    category: {
        type: DataTypes.STRING,
    },
    isHighlight: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    highlightTitle: {
        type: DataTypes.STRING,
    },
});

module.exports = Story;
