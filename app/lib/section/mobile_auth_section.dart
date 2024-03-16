import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:local_auth/local_auth.dart';
import 'package:tekflat_design/tekflat_design.dart';

class MobileAuthSection extends StatefulWidget {
  const MobileAuthSection({super.key});

  @override
  State<MobileAuthSection> createState() => _MobileAuthSection();
}

class _MobileAuthSection extends State<MobileAuthSection> {
  final LocalAuthentication auth = LocalAuthentication();

  bool? _canAuthenticateWithBiometrics;
  bool? _canAuthenticate;
  List<BiometricType>? _availableBiometrics;
  bool? _didAuthenticate;
  PlatformException? _platformException;

  void _auth() async {
    final bool canAuthenticateWithBiometrics = await auth.canCheckBiometrics;
    final bool canAuthenticate =
        canAuthenticateWithBiometrics || await auth.isDeviceSupported();

    final List<BiometricType> availableBiometrics =
        await auth.getAvailableBiometrics();

    setState(() {
      _canAuthenticateWithBiometrics = canAuthenticateWithBiometrics;
      _canAuthenticate = canAuthenticate;
      _availableBiometrics = availableBiometrics;
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
    });
    bool? didAuthenticate;
    PlatformException? platformException;
    try {
      didAuthenticate = await auth.authenticate(
        localizedReason: 'Please authenticate to show account balance',
        options: const AuthenticationOptions(),
      );
      // ···
    } on PlatformException catch (e) {
      platformException = e;
    }

    setState(() {
      _platformException = platformException;
      _didAuthenticate = didAuthenticate;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
          TekTypography(
            text: "Can authentificate $_canAuthenticate",
            fontWeight: FontWeight.bold,
          ),
          TekTypography(
            text:
                "Can authentificate with biometrics $_canAuthenticateWithBiometrics",
            fontWeight: FontWeight.bold,
          ),
          TekTypography(
            text: "Availlable biometrics $_availableBiometrics",
            fontWeight: FontWeight.bold,
          ),
          TekTypography(
            text: "Platform exception $_platformException",
            fontWeight: FontWeight.bold,
          ),
          TekTypography(
            text: 'Did authentificate $_didAuthenticate',
            fontWeight: FontWeight.bold,
          ),
          TekButton(onPressed: _auth, text: 'Mobile Authentificate'),
        ]));
  }
}
