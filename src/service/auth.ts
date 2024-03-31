import Http from "@absensi/utils/fetch";

const authService = {
  login(username: string, password: string) {
    return Http.post("auth/login", {
      username: username,
      password: password,
    });
  },
};

export default authService;
