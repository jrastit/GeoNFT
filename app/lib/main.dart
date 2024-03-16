import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:geonft/section/login_section.dart';
import 'package:tekflat_design/tekflat_design.dart';
import 'package:geonft/section/counter_section.dart';
import 'package:geonft/section/mobile_auth_section.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'geonft',
      theme: TekThemes.light,
      home: TekResponsive.appResBuilder(
        MyHomePage(title: 'geonft'),
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({super.key, required this.title});

  final String title;

  final bool isMobile = defaultTargetPlatform == TargetPlatform.android ||
      defaultTargetPlatform == TargetPlatform.iOS;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    List<Widget> tabsHeader = [];
    List<Widget> tabsContent = [];

    tabsHeader.add(const Tab(
      icon: Icon(Icons.lock),
    ));
    tabsContent.add(const CounterSection());

    if (widget.isMobile) {
      tabsHeader.add(const Tab(
        icon: Icon(Icons.smartphone),
      ));
      tabsContent.add(const MobileAuthSection());
    }

    tabsHeader.add(const Tab(
      icon: Icon(Icons.person),
    ));
    tabsContent.add(const LoginSection());
    tabsHeader.add(const Tab(
      icon: Icon(Icons.settings),
    ));
    tabsContent.add(const Center(child: Column()));

    return DefaultTabController(
        initialIndex: 1,
        length: tabsHeader.length,
        child: Scaffold(
          appBar: AppBar(
            backgroundColor: Theme.of(context).colorScheme.inversePrimary,
            title: Text(widget.title),
            bottom: TabBar(tabs: tabsHeader),
          ),
          body: TabBarView(children: tabsContent),
        ));
  }
}
