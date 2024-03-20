const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const USER = sequelize.define('user', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    address: {
        type: DataTypes.String,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('enable', 'disabled'),
        allowNull: true
    },
}, {
    // Define any additional table options here
    tableName: 'user',
    timestamps: true,
    indexes: [
            {
                unique: false,
                fields: ['status'], // Add index for status
                name: 'user_status_index'
            }
            ]
        });

module.exports = USER;