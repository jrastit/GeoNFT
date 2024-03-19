
const express = require("express");
const cors = require("cors");
const routes = require('./routes');
const sequelize = require('./database');
const GeoNFT = require('./models/geo_nft');
const NFT = require('./models/nft');
const NFTToGeo = require('./models/nft_to_geo');
const app = express();


var corsOptions = {
  origin: "https://geonft.fexhu.com/"
};

sequelize.sync({ alter: true });
// NFT.sync({ alter: true });
// GeoNFT.sync({ alter: true });
// NFTToGeo.sync({ alter: true });

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