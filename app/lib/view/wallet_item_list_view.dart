import 'package:flutter/material.dart';
import 'package:geonft/model/wallet_argument.dart';
import 'package:geonft/service/wallet.dart';

import '../settings/settings_view.dart';
import 'wallet_item_details_view.dart';

/// Displays a list of WalletItems.
class WalletItemListView extends StatefulWidget {
  const WalletItemListView({
    super.key,
  });

  static const routeName = '/wallet_list';

  @override
  State<WalletItemListView> createState() => _WalletItemListViewState();
}

class _WalletItemListViewState extends State<WalletItemListView> {
  List<WalletWeb3> items = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wallet Items'),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {
              // Navigate to the settings page. If the user leaves and returns
              // to the app after it has been killed while running in the
              // background, the navigation stack is restored.
              Navigator.restorablePushNamed(context, SettingsView.routeName);
            },
          ),
        ],
      ),

      // To work with lists that may contain a large number of items, it’s best
      // to use the ListView.builder constructor.
      //
      // In contrast to the default ListView constructor, which requires
      // building all Widgets up front, the ListView.builder constructor lazily
      // builds Widgets as they’re scrolled into view.
      body: ListView.builder(
        // Providing a restorationId allows the ListView to restore the
        // scroll position when a user leaves and returns to the app after it
        // has been killed while running in the background.
        restorationId: 'walletItemListView',
        itemCount: items.length,
        itemBuilder: (BuildContext context, int index) {
          final item = items[index];

          return ListTile(
            title: Text('${item.address()}'),
            leading: const CircleAvatar(
              // Display the Flutter Logo image asset.
              foregroundImage: AssetImage('assets/images/flutter_logo.png'),
            ),
            onTap: () {
              // Navigate to the details page. If the user leaves and returns to
              // the app after it has been killed while running in the
              // background, the navigation stack is restored.
              Navigator.restorablePushNamed(
                context,
                WalletItemDetailsView.routeName,
                arguments: WalletArguments(item.address().toString()),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Replace this with your function to create a new wallet
          var newWallet = WalletWeb3.random();

          // Add the new wallet to your items list
          setState(() {
            items = [...items, newWallet];
            //items.add(newWallet);
          });
        },
        backgroundColor: Colors.green,
        child: const Icon(Icons.add),
      ),
    );
  }
}
