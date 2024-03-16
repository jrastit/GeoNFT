import 'package:flutter/material.dart';
import 'package:tekflat_design/tekflat_design.dart';

class LoadingSection extends StatelessWidget {
  const LoadingSection({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
        child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
          TekTypography(
            text: "Loading",
            fontWeight: FontWeight.bold,
          ),
        ]));
  }
}
