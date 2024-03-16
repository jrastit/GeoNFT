class User {
  final int id;
  final String login;

  User({required this.id, required this.login});

  factory User.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'user': {
          'id': int id,
          'login': String login,
        }
      } =>
        User(
          id: id,
          login: login,
        ),
      _ => throw const FormatException('Failed to load user.'),
    };
  }
}
