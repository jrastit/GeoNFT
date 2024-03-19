const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const GeoNFT = sequelize.define('GeoNFT', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: true
    },
    position: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: true
    },
    h3_1: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    h3_2: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    h3_4: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    h3_6: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    h3_8: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    h3_10: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    h3_12: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    h3_14: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: true
    },
    
    // Add more properties as needed
}, {
    tableName: 'geonft', // Specify the table name
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
    indexes: [
        {
            unique: false,
            fields: ['status'], // Add index for status
            name: 'geonft_status_index',
        }
        ]
    });



module.exports = GeoNFT;
