"use strict";

module.exports = (options) => {
  return async function jwt(ctx, next) {
    const bearerToken = ctx.request.header.authorization;
    const token = bearerToken.split("Bearer ")[1];
    let decode;
    if (token) {
      try {
        // 解码token
        decode = ctx.app.jwt.verify(token, options.secret);
        await next();
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          message: "访问令牌已失效",
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        message: "没有权限访问",
      };
      return;
    }
  };
};
