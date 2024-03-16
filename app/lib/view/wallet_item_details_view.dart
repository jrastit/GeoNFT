import 'package:flutter/material.dart';
import 'package:geonft/model/wallet_argument.dart';
import 'package:geonft/service/my_ether_amount.dart';
import 'package:geonft/service/wallet.dart';
import 'package:web3dart/web3dart.dart';

/// Displays detailed information about a SampleItem.
class WalletItemDetailsView extends StatefulWidget {
  const WalletItemDetailsView({
    super.key,
  });

  static const routeName = '/wallet_item';

  @override
  State<WalletItemDetailsView> createState() => _WalletItemDetailsView();
}

class _WalletItemDetailsView extends State<WalletItemDetailsView> {
  WalletWeb3? wallet;

  MyEtherAmount? balance;

  @override
  void initState() {
    super.initState();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final walletArg =
        ModalRoute.of(context)!.settings.arguments as WalletArguments?;
    if (walletArg == null) {
      return;
    }
    wallet = WalletWeb3.fromPrivateKey(walletArg.address.toString());
    updateBalance();
  }

  void updateBalance() {
    if (wallet == null) {
      return;
    }
    wallet?.balance().then((value) {
      setState(() {
        balance = MyEtherAmount(value);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wallet Details'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(wallet?.address().toString() ?? 'Wallet not set'),
            Text(balance == null
                ? 'Loading...'
                : "${balance!.toStringUnit(EtherUnit.ether)} ETH"),
            ElevatedButton(
              onPressed: () {
                // Call the wallet faucet here
                // Replace `wallet` with your actual wallet instance
                wallet?.faucet("0.01").then((result) {
                  updateBalance();
                });
              },
              child: const Text('Call Wallet Faucet'),
            )
          ],
        ),
      ),
    );
  }
}
