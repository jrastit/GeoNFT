const axios = require("axios");
const NFT = require("../models/nft");
const GeoNFT = require("../models/geo_nft");

function extractInfoFromJSON(json, nftId) {
    let name = json.name;
    let description = json.description;
    let image = json.image;
    let url = json.url;
    let location = json.location;
    nftObj = {
        name: name,
        description: description,
        image: image && image.startsWith("data:") ? "data": image,
        url: url,
        location: location,
        status: "active",
    }
    GeoNFT.findOne({ where: { id : nftId }})
    .then(function(geonft) {
        if (geonft) {
            geonft.update(nftObj);
            NFT.findOne({ where: { id : nftId }}).then(function(nft) {
                if (nft) {
                    nft.update({
                        status: "ok",
                    });
                }
            });
        } else {
            GeoNFT.create(nftObj);
            NFT.findOne({ where: { id : nftId }}).then(function(nft) {
                if (nft) {
                    nft.update({
                        status: "ok",
                    });
                }
            });
        }   
        
    })

}

function getJsonFromURL(url, nftId) {
    axios.get(url).then(response => {
                        const json = response.data;
                        //console.log("JSON content:", json);
                        extractInfoFromJSON(json, nftId);
                    })
                    .catch(error => {
                        console.error("Error fetching JSON from URL:", url);
                        NFT.findOne({ where: { id : nftId }}).then(function(nft) {
                            if (nft) {
                                nft.update({
                                    status: "404",
                                });
                            }
                        });
                    });
}

function URItoJSON(uri, nftId) {
    if (uri.startsWith("data:")) {
        //console.log("is data URI");
        data = uri.substring(5);
        if (data.startsWith("application/json;base64,")) {
            //console.log("is json 64");
            json_b64_data = data.substring(24);
            let json_data = Buffer.from(json_b64_data, 'base64').toString('utf-8');
            let json = JSON.parse(json_data);
            extractInfoFromJSON(json, nftId);
            //console.log("NFT JSON:", json);
        }
    } else if (uri.startsWith("ipfs://")) {
        const ipfsHash = uri.substring(7);
        const httpsURI = `https://ipfs.io/ipfs/${ipfsHash}`;
        
        //console.log("is https URI:", httpsURI);
        getJsonFromURL(httpsURI, nftId);
    } else if (uri.startsWith("https://")) {
        //console.log("is https URI");
        getJsonFromURL(uri, nftId);
    } else if (uri.startsWith("http://")) {
        //console.log("is http URI");
        getJsonFromURL(uri, nftId);
    } else {
        console.error("Invalid NFT URI:", uri.substring(10));
    }
}

module.exports = {
    URItoJSON
}