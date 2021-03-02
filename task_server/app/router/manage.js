/**
 * 任务管理系统管理后台接口集合
 */

"use strict";

module.exports = (app) => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  const jwt = app.middleware.jwt(app.config.jwt);

  /** 用户注册接口 */
  router.post(
    "/api/manage/checkRegister",
    controller.manage.login.login.checkRegister
  );
  /** 用户登陆接口 */
  router.post(
    "/api/manage/checkLogin",
    controller.manage.login.login.checkLogin
  );
  /** 获取用户信息接口 */
  router.get(
    "/api/manage/getUserInfo/:id",
    jwt,
    controller.manage.user.userSetting.getUserInfo
  );
  // router.post('/api/admin/checkLogin', controller.admin.login.checkLogin);
  // router.post('/api/admin/novel/addChapter', adminauth, controller.admin.novel.addChapter);
  // router.get('/api/admin/novel/deleteChapterById/:id', adminauth, controller.admin.novel.deleteChapterById);
};
