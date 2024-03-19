const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const NFT = sequelize.define('nft', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    chain_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    contract_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nft_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    uri: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('init', 'ok', 'error', '404', 'timeout'),
        allowNull: true
    },
}, {
    // Define any additional table options here
    tableName: 'nft',
    timestamps: true,
    indexes: [
        {
                unique: false,
                fields: ['chain_id'], // Add index for chain_id
                name: 'nft_chain_id_index'
            },
            {
                unique: false,
                fields: ['contract_address'],
                name: 'nft_contract_address_index'
            },
            {
                unique: true,
                fields: ['chain_id','contract_address', 'nft_id'],
                name: 'nft_nft_id_index'
            },
            {
                unique: false,
                fields: ['status'], // Add index for status
                name: 'nft_status_index'
            }
            ]
        });

module.exports = NFT;