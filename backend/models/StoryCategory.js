const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const StoryCategory = sequelize.define('StoryCategory', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

module.exports = StoryCategory;
