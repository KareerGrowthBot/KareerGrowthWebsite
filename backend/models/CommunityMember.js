const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CommunityMember = sequelize.define('CommunityMember', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
    },
    company: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    joinedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Active',
    }
});

module.exports = CommunityMember;
