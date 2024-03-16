import 'package:flutter/material.dart';
import 'package:geonft/section/loading_section.dart';
import 'package:tekflat_design/tekflat_design.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

AndroidOptions _getAndroidOptions() => const AndroidOptions(
      encryptedSharedPreferences: true,
    );

class CounterSection extends StatefulWidget {
  const CounterSection({super.key});

  @override
  State<CounterSection> createState() => _CounterSection();
}

class _CounterSection extends State<CounterSection> {
  int _counter = 0;

  final storage = FlutterSecureStorage(aOptions: _getAndroidOptions());

  bool _init = true;

  @override
  void initState() {
    super.initState();
    storage.read(key: "counter").then((value) {
      int counter = 0;
      if (value != null) {
        counter = int.parse(value);
      }
      setState(() {
        _counter = counter;
        _init = false;
      });
    });
  }

  void _incrementCounter() async {
    String? value = await storage.read(key: "counter");
    int counter = 0;
    if (value == null) {
      throw Exception("Counter value is null");
    }
    counter = int.parse(value);
    counter = counter + 1;
    await storage.write(key: "counter", value: counter.toString());
    setState(() {
      _counter = counter;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_init) {
      return const LoadingSection();
    }
    return Center(
        child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
          TekTypography(
            text: "This is a safe local stored Counter $_counter",
            fontWeight: FontWeight.bold,
          ),
          TekButton(onPressed: _incrementCounter, text: 'Click me'),
        ]));
  }
}
