"use strict";

const Controller = require("egg").Controller;

class LoginController extends Controller {
  /** 注册接口 */
  async checkRegister() {
    const { ctx } = this;
    const request = ctx.request.body;
    const { nickname, account, password } = request;
    const checkSql =
      "select id , account from manage_user as user where user.account = ?";
    const checkResult = await this.app.mysql.query(checkSql, [account]);
    if (checkResult.length === 0) {
      const insertSql = `insert into manage_user(nickname, account, password, register_time) values (?, ?, ?, ${parseInt(
        Date.now() / 1000
      )})`;
      const insertResult = await this.app.mysql.query(insertSql, [
        nickname,
        account,
        password,
      ]);
      if (insertResult.affectedRows === 1) {
        this.ctx.body = { success: true, message: "注册成功" };
      } else {
        this.ctx.body = { success: false, message: "注册失败" };
      }
    } else {
      this.ctx.body = { success: false, message: "手机号已被注册" };
    }
  }

  /** 登陆接口 */
  async checkLogin() {
    const { ctx } = this;
    const request = ctx.request.body;
    const { account, password } = request;
    const checkSql = `SELECT id, nickname from manage_user AS user WHERE 
                user.account = ? AND user.password = ?`;
    const checkResult = await this.app.mysql.query(checkSql, [
      account,
      password,
    ]);
    if (checkResult.length > 0) {
      const timeNow = Date.now().toString();
      const updateSql = `UPDATE manage_user AS user SET user.login_time = 
                ? WHERE user.account = 
                ? AND user.password = ? `;
      const updateResult = await this.app.mysql.query(updateSql, [
        timeNow.substr(0, 10),
        account,
        password,
      ]);
      if (updateResult.affectedRows === 1) {
        /** 查询用户的个人信息并返回给前端 */
        const userInfo = await ctx.service.user.user.find(checkResult[0].id);
        console.log("userInfo", userInfo);
        if (userInfo && userInfo.length > 0) {
          const token = ctx.app.jwt.sign(request, this.app.config.jwt.secret, {
            expiresIn: "60m", // 时间根据自己定，具体可参考jsonwebtoken插件官方说明
          });

          this.ctx.body = {
            success: true,
            message: "登陆成功",
            data: {
              userInfo: userInfo[0],
              token,
            },
          };
        }
        // this.ctx.session.openId = { openId: timeNow };
        // this.ctx.body = {
        //   success: true,
        //   message: "登陆成功",
        //   data: {
        //     openId: timeNow,
        //     id: checkResult[0].id,
        //     nickname: checkResult[0].nickname,
        //   },
        // };
      } else {
        this.ctx.body = { success: false, message: "登陆失败" };
      }
    } else {
      this.ctx.body = { success: false, message: "登陆失败" };
    }
  }
}

module.exports = LoginController;
