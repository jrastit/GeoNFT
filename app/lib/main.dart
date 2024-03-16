import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:geonft/section/login_section.dart';
import 'package:geonft/settings/settings_controller.dart';
import 'package:geonft/settings/settings_service.dart';
import 'package:geonft/settings/settings_view.dart';
import 'package:geonft/view/nft_view.dart';
import 'package:geonft/view/wallet_item_details_view.dart';
import 'package:geonft/view/wallet_item_list_view.dart';
import 'package:tekflat_design/tekflat_design.dart';
import 'package:geonft/section/mobile_auth_section.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

void main() async {
  // Set up the SettingsController, which will glue user settings to multiple
  // Flutter Widgets.
  final settingsController = SettingsController(SettingsService());

  // Load the user's preferred theme while the splash screen is displayed.
  // This prevents a sudden theme change when the app is first displayed.
  await settingsController.loadSettings();

  // Run the app and pass in the SettingsController. The app listens to the
  // SettingsController for changes, then passes it further down to the
  // SettingsView.
  runApp(MyApp(settingsController: settingsController));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key, required this.settingsController});

  final SettingsController settingsController;

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: settingsController,
      builder: (BuildContext context, Widget? child) {
        return MaterialApp(
          // Providing a restorationScopeId allows the Navigator built by the
          // MaterialApp to restore the navigation stack when a user leaves and
          // returns to the app after it has been killed while running in the
          // background.
          restorationScopeId: 'app',

          // Provide the generated AppLocalizations to the MaterialApp. This
          // allows descendant Widgets to display the correct translations
          // depending on the user's locale.
          localizationsDelegates: const [
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          supportedLocales: const [
            Locale('en', ''), // English, no country code
          ],
          title: 'geonft',
          theme: TekThemes.light,
          // Define a function to handle named routes in order to support
          // Flutter web url navigation and deep linking.
          onGenerateRoute: (RouteSettings routeSettings) {
            return MaterialPageRoute<void>(
              settings: routeSettings,
              builder: (BuildContext context) {
                switch (routeSettings.name) {
                  case SettingsView.routeName:
                    return SettingsView(controller: settingsController);
                  case WalletItemDetailsView.routeName:
                    return const WalletItemDetailsView();
                  case WalletItemListView.routeName:
                  default:
                    return TekResponsive.appResBuilder(
                      MyHomePage(title: 'geonft'),
                    );
                  //return const WalletItemListView();
                }
              },
            );
          },
        );
      },
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
      icon: Icon(Icons.wallet),
    ));
    tabsContent.add(const WalletItemListView());

    tabsHeader.add(const Tab(
      icon: Icon(Icons.language),
    ));
    tabsContent.add(NFTView());

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
