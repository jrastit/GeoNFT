const { DataTypes } = require('sequelize');
const { mySequelize } = require('../server.js'); // Assuming you have a database configuration file

const NFT = mySequelize.define('NFT', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false
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
    chain_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contract_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
    // Add more properties as needed
}, {
    tableName: 'nfts', // Specify the table name
    timestamps: true // Enable timestamps (createdAt and updatedAt)
});

module.exports = NFT;
