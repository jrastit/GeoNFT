import 'package:serializable/serializable.dart';

@serializable
class WalletArguments extends SerializableMap {
  String address;

  WalletArguments(this.address);

  @override
  Map<String, dynamic> toMap() {
    return {
      "address": address,
    };
  }

  factory WalletArguments.fromMap(Map<String, dynamic> map) {
    return WalletArguments(map['address'] as String);
  }

  @override
  operator [](Object? key) {
    switch (key) {
      case 'address':
        return address;
    }
    throwFieldNotFoundException(key, 'WalletArgument');
  }

  @override
  void operator []=(String key, value) {
    switch (key) {
      case 'address':
        address = value as String;
        return;
    }
    throwFieldNotFoundException(key, 'WalletArgument');
  }
}
