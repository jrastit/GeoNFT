// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:geonft/service/wallet.dart';

void main() {
  test('Test wallet save', () async {
    var wallet1 = WalletWeb3.random();
    var address = wallet1.address();
    var jsonExport = wallet1.export();
    var wallet2 = WalletWeb3.fromJSON(jsonExport);
    var address2 = wallet2.address();
    expect(address, address2);
  });
}
