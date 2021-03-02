export interface HttpParams {
  method:
    | "get"
    | "GET"
    | "delete"
    | "DELETE"
    | "options"
    | "OPTIONS"
    | "post"
    | "POST" /** 异步请求的方式，如：post、get等 */;
  url: string /** 异步请求的地址 */;
  data: any /** 发送的数据 */;
  withCredentials?: boolean;
}

export interface HttpResponse {
  success: boolean /** 后端判断当前请求是否成功 */;
  data?: any /** 后端返回的数据 */;
  message?: string /** 后端请求返回的提示信息 */;
  unlogin?: boolean /** 发送当前请求的时候是否已经登录 */;
}
