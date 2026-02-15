const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SeoData = sequelize.define('SeoData', {
    page_path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    page_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    meta_description: {
        type: DataTypes.TEXT,
    },
    meta_keywords: {
        type: DataTypes.TEXT,
    },
    canonical_url: {
        type: DataTypes.STRING(512),
    },
    og_title: {
        type: DataTypes.STRING,
    },
    og_description: {
        type: DataTypes.TEXT,
    },
    og_image: {
        type: DataTypes.STRING(512),
    },
    og_type: {
        type: DataTypes.STRING(50),
        defaultValue: 'website',
    },
    twitter_card: {
        type: DataTypes.STRING(50),
        defaultValue: 'summary_large_image',
    },
    structured_data: {
        type: DataTypes.JSON,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'seo_data',
    indexes: [
        { unique: true, fields: ['page_path'] },
        { fields: ['is_active'] }
    ]
});

module.exports = SeoData;
