import axios, { AxiosInstance } from "axios";
import { ElMessage as Message } from "element-plus";
import { HttpParams, HttpResponse } from "./interface";

let httpInstance: AxiosInstance;

function httpInterceptors() {
  // 1. 初始化axios实例
  httpInstance = axios.create({
    timeout: 30 * 1000,
    responseType: "json",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  // 2. 设置请求拦截器
  httpInstance.interceptors.request.use((config) => {
    const vuexStorageStr = localStorage.getItem("vuex");
    if (vuexStorageStr) {
      const vuexStorage = JSON.parse(vuexStorageStr);
      const token = vuexStorage.token.token;
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  });
  // 3. 设置响应拦截器
  httpInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { status: errCode, data } = error.response;
      const { message } = data;
      if (errCode === 401) {
        localStorage.removeItem("vuex");
        window.location.href = `${window.location.origin}/login`;
        return Promise.reject({
          errCode,
          message,
        });
      } else {
        return Promise.reject({
          errCode,
          message: message,
        });
      }
    }
  );
  // 4. 返回httpInstance
  return httpInstance;
}

/**
 * ajax请求通用方法，基于axios
 * @param {String} method  异步请求的方式，如：post、get等
 * @param {String} url     异步请求的地址
 * @param {Object} data    发送的数据
 * @param {Boolean} withCredentials
 */
function http<T>(params: HttpParams): Promise<T | boolean> {
  const { method, url, data, withCredentials = true } = params;
  return new Promise((resolve, reject) => {
    const http = httpInterceptors();
    http({
      method: method,
      url: url,
      data: data,
      withCredentials: withCredentials,
    })
      .then((res) => {
        const { data } = res;
        const result: HttpResponse = data;
        if (result.success) {
          result.message && Message.success(result.message);
          /** 如果接口没有额外返回数据(如：注册接口)，则主动返回true */
          result.data ? resolve(result.data) : resolve(true);
        } else {
          result.message && Message.warning(result.message);
          /** 如果接口没有额外返回数据(如：注册接口)，则主动返回false */
          result.data ? resolve(result.data) : resolve(false);
          /** 调用接口没有注册，回到登录页面 */
          if (result.unlogin) {
            if (window.location.pathname !== "/login") {
              window.location.href = window.location.origin + "/login";
            }
          }
        }
      })
      .catch((error) => {
        let message = "服务器异常，请联系网站工作人员处理！";
        if(error && error.message) {
          message = error.message;
        }
        Message({
          type: "error",
          message,
          duration: 2000,
        });
        reject(error);
      });
  });
}

export default http;
