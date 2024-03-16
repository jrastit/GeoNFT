import 'package:flutter/material.dart';

class NFTView extends StatefulWidget {
  @override
  _NFTViewState createState() => _NFTViewState();
}

class _NFTViewState extends State<NFTView> {
  List<String> nftList = [];

  void createNFT() {
    // Logic to create NFT
    // Add the created NFT to the nftList
    setState(() {
      nftList.add('New NFT');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('NFT View'),
      ),
      body: Column(
        children: [
          ElevatedButton(
            onPressed: createNFT,
            child: Text('Create NFT'),
          ),
          SizedBox(height: 20),
          Text(
            'NFT List:',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: nftList.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(nftList[index]),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
