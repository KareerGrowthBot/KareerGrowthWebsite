const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BlogStat = sequelize.define('BlogStat', {
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = BlogStat;
