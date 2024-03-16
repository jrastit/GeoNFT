import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:geonft/action/user_action.dart';
import 'package:geonft/section/loading_section.dart';
import 'package:geonft/widget/form_item_title.dart';
import 'package:geonft/widget/server_status.dart';
import 'package:tekflat_design/tekflat_design.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';

class LoginSection extends StatefulWidget {
  const LoginSection({super.key});

  @override
  State<LoginSection> createState() => _LoginSection();
}

class _LoginSection extends State<LoginSection> {
  final _formKey = GlobalKey<FormBuilderState>();

  bool _loading = false;
  bool _isLogin = true;

  final TextEditingController _username = TextEditingController();
  final TextEditingController _confirmPass = TextEditingController();
  final TextEditingController _confirmPass2 = TextEditingController();

  @override
  void initState() {
    super.initState();
    SystemChannels.textInput
        .invokeMethod('TextInput.setClientFeatures', <String, dynamic>{
      'setAuthenticationConfiguration': true,
      'setAutofillHints': <String>[
        AutofillHints.username,
        AutofillHints.password,
      ],
    });
  }

  @override
  void dispose() {
    SystemChannels.textInput.invokeMethod('TextInput.clearClientFeatures');

    super.dispose();
  }

  void _switch() {
    setState(() {
      _isLogin = !_isLogin;
    });
  }

  void _submitLogin() async {
    if (_formKey.currentState!.saveAndValidate()) {
      var login = _formKey.currentState!.value['username'];
      var password = _formKey.currentState!.value['password'];
      TekToast.info(msg: "Login in progress $login $password");
      setState(() {
        _loading = true;
      });
      try {
        var user = await UserAction.loginExec(login, password);
        TekToast.success(msg: 'Login success ${user.id}');
      } on Exception catch (e) {
        TekToast.error(msg: 'Login error $e');
      } finally {
        setState(() {
          _loading = false;
        });
      }
    }
  }

  void _submitRegister() async {
    if (_formKey.currentState!.saveAndValidate()) {
      var login = _formKey.currentState!.value['username'];
      var password = _formKey.currentState!.value['password'];
      TekToast.info(msg: "Register in progress $login $password");
      setState(() {
        _loading = true;
      });
      try {
        var user = await UserAction.registerExec(login, password);
        TekToast.success(msg: 'Register success ${user.id}');
      } on Exception catch (e) {
        TekToast.error(msg: 'Register error $e');
      } finally {
        setState(() {
          _loading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) return const LoadingSection();

    return Center(
      child: SizedBox(
        width: 350,
        child: FormBuilder(
          key: _formKey,
          child: Column(
            children: <Widget>[
              TekVSpace.mainSpace,
              const Align(alignment: Alignment.topRight, child: ServerStatus()),
              TekVSpace.mainSpace,
              TekTypography(
                  text: _isLogin ? "Login form" : "Register from",
                  type: TekTypographyType.titleLarge),
              TekVSpace.mainSpace,
              FormItemTitleWidget(
                title: 'Username',
                isRequired: true,
                child: TekInput(
                  name: 'username',
                  controller: _username,
                  prefixIcon: const Icon(Icons.person),
                  validator: FormBuilderValidators.required(
                    errorText: 'Username is required',
                  ),
                ),
              ),
              TekVSpace.mainSpace,
              FormItemTitleWidget(
                title: 'Password',
                isRequired: true,
                child: TekInputPassword(
                  name: 'password',
                  controller: _confirmPass,
                  prefixIcon: const Icon(Icons.lock),
                  suffixIconShow: Icons.visibility,
                  suffixIconHide: Icons.visibility_off,
                  validator: FormBuilderValidators.required(
                    errorText: 'Password is required',
                  ),
                ),
              ),
              if (!_isLogin)
                FormItemTitleWidget(
                  title: 'Retype Password',
                  isRequired: true,
                  child: TekInputPassword(
                    name: 'password2',
                    controller: _confirmPass2,
                    prefixIcon: const Icon(Icons.lock),
                    suffixIconShow: Icons.visibility,
                    suffixIconHide: Icons.visibility_off,
                    validator: FormBuilderValidators.equal(
                      _confirmPass.value.text,
                      errorText: 'Password must match',
                    ),
                  ),
                ),
              TekVSpace.p18,
              TekButton(
                text: _isLogin ? 'Login' : 'Register',
                width: double.infinity,
                type: TekButtonType.primary,
                onPressed: _isLogin ? _submitLogin : _submitRegister,
              ),
              TekVSpace.p18,
              TekButton(
                text: _isLogin ? 'Register instead' : 'Login instead',
                width: double.infinity,
                type: TekButtonType.outline,
                onPressed: _switch,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
