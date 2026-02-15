const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Blog = sequelize.define('Blog', {
    customId: { // To match original integer IDs
        type: DataTypes.INTEGER,
        unique: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    excerpt: {
        type: DataTypes.TEXT,
    },
    category: {
        type: DataTypes.STRING,
    },
    author: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    readTime: {
        type: DataTypes.STRING,
    },
    stats: {
        type: DataTypes.JSON,
    },
    content: {
        type: DataTypes.TEXT,
    },
});

module.exports = Blog;
