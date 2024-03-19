const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');
const NFT = require('./nft.js');
const GeoNFT = require('./geo_nft.js');

const NFTToGeo = sequelize.define('nftToGeo', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.ENUM('init', 'ok', 'error', '404', 'timeout'),
        allowNull: true
    },
}, {
    // Define any additional table options here
    tableName: 'nfttogeo',
    timestamps: true,
    indexes: [
            {
                unique: false,
                fields: ['status'], // Add index for status
                name: 'nfttogeo_status_index'
            }
            ]
        });

NFT.belongsToMany(GeoNFT, { through: NFTToGeo });
GeoNFT.belongsToMany(NFT, { through: NFTToGeo });

module.exports = NFTToGeo;