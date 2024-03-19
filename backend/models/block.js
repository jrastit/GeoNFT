const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const BLOCK = sequelize.define('block', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    chain_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    block_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    transactions_count: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    logs_count: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nft_mint_count: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nft_transfer_count: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nft_error_id_count: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    error_count: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('init', 'ok', 'error'),
        allowNull: true
    },
}, {
    // Define any additional table options here
    tableName: 'block',
    timestamps: true,
    indexes: [
        {
                unique: false,
                fields: ['chain_id'], // Add index for chain_id
                name: 'block_chain_id_index'
            },
            {
                unique: true,
                fields: ['chain_id','block_id'],
                name: 'block_block_id_index'
            },
            {
                unique: false,
                fields: ['status'], // Add index for status
                name: 'block_status_index'
            }
            ]
        });

module.exports = BLOCK;