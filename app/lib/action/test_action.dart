import 'package:http/http.dart' as http;

const baseUrl = "https://geonft.fexhu.com/api";

class TestAction {
  static Future<bool> pingExec() async {
    try {
      final response = await http.get(
        Uri.parse("$baseUrl/status"),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          "referer": "https://geonft.fexhu.com/"
        },
      );
      if (response.statusCode == 200) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw Exception("$e");
    }
  }
}
