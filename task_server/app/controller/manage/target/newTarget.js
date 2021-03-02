"use strict";

const Controller = require("egg").Controller;

class NewTargetController extends Controller {
  /**
   * 根据用户id获取用户信息
   */
  async cacheNewTarget() {
    const { ctx } = this;
    const request = ctx.request.body;
    const { nickname, account, password } = request;
    
    const selectSql = `SELECT account, nickname, portrait as portrait, bg_img as bgImg,
                        qq_account as qqAccount, wechat_account as weChatAccount, github_url as githubUrl,
                        logo_name as logoName, logo_sub as logoSub
                        FROM manage_user WHERE id = ?`;
    const selectResult = await this.app.mysql.query(selectSql, [id]);
    if (selectResult.length > 0) {
      this.ctx.body = { success: true, data: selectResult[0] };
    } else {
      this.ctx.body = { success: false, message: "获取个人信息失败" };
    }
  }
}

module.exports = NewTargetController;
