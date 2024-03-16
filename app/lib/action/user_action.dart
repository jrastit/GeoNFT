import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:geonft/model/user.dart';

const baseUrl = "https://geonft.fexhu.com/api";

class UserAction {
  static Future<User> loginExec(login, password) async {
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/api/user/login"),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'login': login,
          'password': password,
        }),
      );
      if (response.statusCode == 200) {
        return User.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
      } else {
        throw Exception('Failed to load user');
      }
    } catch (e) {
      throw Exception("$e");
    }
  }

  static Future<User> registerExec(login, password) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/api/user/register'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'login': login,
          'password': password,
        }),
      );
      if (response.statusCode == 200) {
        return User.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
      } else {
        throw Exception('Failed to load user');
      }
    } catch (e) {
      throw Exception("$e");
    }
  }
}
