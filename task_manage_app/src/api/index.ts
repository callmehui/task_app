const serverUrl =
  process.env.NODE_ENV === "production" ? "https://immortalboy.cn" : "";
const imgServerUrl =
  process.env.NODE_ENV === "production" ? "https://image.immortalboy.cn" : "";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://immortalboy.cn/api/manage"
    : "/api/manage";

const apis = {
  /** 注册页面 */
  register: baseUrl + "/checkRegister",
  /** 登录页面 */
  login: baseUrl + "/checkLogin",
  getUserInfo: baseUrl + "/getUserInfo",
};

export { apis, serverUrl, imgServerUrl };
