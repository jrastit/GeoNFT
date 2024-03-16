import 'dart:math'; //used for the random number generator
import 'package:http/http.dart'; //You can also import the browser version
import 'package:geonft/service/my_ether_amount.dart';
import 'package:web3dart/web3dart.dart';

/// Represents a network connection to a Web3 provider.
class NetworkWeb3 {
  Web3Client ethClient;

  static String apiUrl = "http://127.0.0.1:8545"; //Replace with your API

  static Client httpClient = Client();

  /// Creates a [NetworkWeb3] instance with the default network configuration.
  factory NetworkWeb3.defaultNetwork() {
    return NetworkWeb3(Web3Client(NetworkWeb3.apiUrl, NetworkWeb3.httpClient));
  }

  NetworkWeb3(this.ethClient);
}

/// Represents a Web3 wallet.
class WalletWeb3 {
  Credentials _wallet;

  /// Creates a [WalletWeb3] instance with a randomly generated key.
  factory WalletWeb3.random() {
    var rng = Random.secure();
    Credentials localWallet = EthPrivateKey.createRandom(rng);
    return WalletWeb3(localWallet);
  }

  /// Creates a [WalletWeb3] instance from a private key.
  factory WalletWeb3.fromPrivateKey(String privateKey) {
    Credentials localWallet = EthPrivateKey.fromHex(privateKey);
    return WalletWeb3(localWallet);
  }

  WalletWeb3(this._wallet);

  address() {
    return _wallet.address;
  }

  /// Retrieves the balance of the wallet.
  balance() {
    return NetworkWeb3.defaultNetwork().ethClient.getBalance(_wallet.address);
  }

  /// Sends an ETH transaction from the wallet to the specified address.
  sendETHTransaction(String to, String amount) {
    return NetworkWeb3.defaultNetwork().ethClient.sendTransaction(
        _wallet,
        Transaction(
          to: EthereumAddress.fromHex(to),
          value: MyEtherAmount.fromStringUnit(EtherUnit.ether, amount),
        ),
        chainId: 1337,
        fetchChainIdFromNetworkId: false);
  }

  faucet(String amount) {
    WalletWeb3 faucetWallet = WalletWeb3.fromPrivateKey(
        "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d");
    return faucetWallet.sendETHTransaction(_wallet.address.hex, amount);
  }
}
