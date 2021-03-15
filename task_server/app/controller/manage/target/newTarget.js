"use strict";

const Controller = require("egg").Controller;

class NewTargetController extends Controller {
  /**
   * 缓存用户未编辑完成的目标
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

  /**
   * 查询缓存的目标
   */
  async cachedTargetDetail() {}

  /**
   * 创建目标
   */
  async createTarget() {
    const { ctx } = this;
    const request = ctx.request.body;
    const {
      userId,
      name,
      desc,
      timeValue,
      timeUnit,
      completions,
      defaultModifyTime,
      isShelve,
    } = request;
    console.log(
      userId,
      name,
      desc,
      timeValue,
      timeUnit,
      completions,
      defaultModifyTime,
      isShelve
    );

    const insertSql = `INSERT INTO manage_target(userid, target_name, target_desc, target_timing_value, target_timing_unit, target_default_modify_time, shelve_target) 
                        VALUES(?, ?, ?, ?, ?, ?, ?)`;
    const insertResult = await this.app.mysql.query(insertSql, [
      userId,
      name,
      desc,
      timeValue,
      timeUnit,
      defaultModifyTime,
      isShelve,
    ]);
    console.log("insertResult", insertResult);
    if (insertResult.affectedRows === 1) {
      const { insertId } = insertResult;
      const completionInsertSql = `INSERT INTO manage_target_completion(target_id, degree_of_completion_value, degree_of_completion_desc, type, reward_and_punish_desc)
                 VALUES(?, ?, ?, ?, ?)`;
      if (completions && completions.length > 0) {
        const circleInsertResult = completions.every(async (completion) => {
          const { type, value, desc, rewardAndPunishDesc } = completion;
          const result = await this.app.mysql.query(completionInsertSql, [
            insertId,
            value,
            desc,
            type,
            rewardAndPunishDesc,
          ]);
          return result.affectedRows;
        });
        if (circleInsertResult) {
          this.ctx.body = { success: true, message: "创建目标成功" };
        }
      }
    } else {
      this.ctx.body = { success: false, message: "创建目标失败" };
    }
  }

  /**
   * 更新目标
   */
  async updateTarget() {}

  /**
   * 更新目标（目标下存在计划时不可删除）
   */
  async deleteTarget() {}

  /**
   * 分页查询目标列表
   */
  async queryTargetList() {}

  /**
   * 通过id查询目标详情
   */
  async targetDetail() {}

  /**
   * 智能统计目标数据
   */
  async smartStatistical() {}
}

module.exports = NewTargetController;
