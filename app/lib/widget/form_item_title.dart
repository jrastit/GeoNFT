import 'package:flutter/material.dart';
import 'package:tekflat_design/tekflat_design.dart';

class FormItemTitleWidget extends StatelessWidget {
  const FormItemTitleWidget({
    super.key,
    required this.title,
    this.heightSpace,
    required this.child,
    this.isRequired = false,
  });

  final String title;
  final double? heightSpace;
  final Widget child;
  final bool isRequired;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        if (title.isNotEmpty)
          Padding(
            padding: EdgeInsets.only(
              bottom: heightSpace ?? TekSpacings().p4,
            ),
            child: Stack(
              clipBehavior: Clip.none,
              children: <Widget>[
                TekTypography(
                  text: title,
                  type: TekTypographyType.bodyMedium,
                  fontWeight: FontWeight.w600,
                ),
                if (isRequired)
                  const Positioned(
                    top: 0,
                    right: -15,
                    child: TekTypography(
                      text: "*",
                      type: TekTypographyType.body,
                      fontWeight: FontWeight.w600,
                      color: Colors.red,
                    ),
                  ),
              ],
            ),
          ),
        child,
      ],
    );
  }
}
