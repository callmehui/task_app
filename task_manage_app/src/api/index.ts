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
  /** 获取当前用户基本信息 */
  getUserInfo: baseUrl + "/getUserInfo",
  /** 创建目标 */
  createTarget: baseUrl + "/createTarget",
};

export { apis, serverUrl, imgServerUrl };
