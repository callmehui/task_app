/** 用户个人信息接口 */
export interface UserInfo {
  id?: number /** 用户id */;
  account?: string /** 用户账号 */;
  bgImg?: string /** 背景图片 */;
  githubUrl?: string /** github url链接 */;
  logoName?: string /** 用户logo名称 */;
  logoSub?: string /** 用户logo副标题 */;
  nickname?: string /** 用户昵称 */;
  portrait?: string /** 用户头像图片地址 */;
  qqAccount?: string /** 用户QQ号 */;
  weChatAccount?: string /** 用户微信号 */;
} 

/** 用户登录返回信息接口 */
export interface UserLogin {
  userInfo: UserInfo /** 用户个人信息 */;
  token: string /** 用户登录token */;
}
