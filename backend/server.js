
const express = require("express");
const cors = require("cors");
const routes = require('./routes');
const config = require("./config.json");
const app = express();
NFT = require("./model/nft.js").NFT;

var corsOptions = {
  origin: "https://geonft.fexhu.com/"
};

const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: 'postgres',
    port: config.database.port, // Add port configuration
});



// Synchronize the models with the database
sequelize.sync()
    .then(() => {
        console.log('NFTs table created successfully.');
    })
    .catch((error) => {
        console.error('Error creating NFTs table:', error);
    });

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to GeoNFT server." });
});




app.use('/', routes);

// set port, listen for requests
const PORT = process.env.PORT || 5601;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

provider = require("./blockchain/provider.js").provider;
watchNode = require("./blockchain/watch_node.js").watchNode;
watchNode(provider);
