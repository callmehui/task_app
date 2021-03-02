const Service = require("egg").Service;

class UserService extends Service {
  async find(uid) {
    const selectSql = `SELECT id, account, nickname as nickname, portrait, bg_img as bgImg,
                        qq_account as qqAccount, wechat_account as weChatAccount, github_url as githubUrl,
                        logo_name as logoName, logo_sub as logoSub
                        FROM manage_user WHERE id = ?`;
    const selectResult = await this.app.mysql.query(selectSql, [uid]);
    return selectResult;
  }
}

module.exports = UserService;
