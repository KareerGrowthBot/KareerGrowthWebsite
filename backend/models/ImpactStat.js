const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ImpactStat = sequelize.define('ImpactStat', {
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sub: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = ImpactStat;
