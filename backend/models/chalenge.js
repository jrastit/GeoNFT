const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const CHALENGE = sequelize.define('chalenge', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    chalenge: {
        type: DataTypes.String,
        allowNull: false,
    },
}, {
    // Define any additional table options here
    tableName: 'chalenge',
    timestamps: true,
    indexes: [
            {
                unique: true,
                fields: ['chalenge'], // Add index for status
                name: 'chalenge_chalenge_index'
            }
            ]
        });

module.exports = CHALENGE;