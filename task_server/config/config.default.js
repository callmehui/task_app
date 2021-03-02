/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1612924096182_7674";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // egg-socket.io
  // exports.io = {
  //   init: { }, // passed to engine.io
  //   namespace: {
  //     '/': {
  //       connectionMiddleware: [],
  //       packetMiddleware: [],
  //     },
  //   },
  //   redis: {
  //     host: '127.0.0.1',
  //     port: 6379
  //   }
  // };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: "127.0.0.1",
      // port
      port: "3306",
      // username
      user: "root",
      // password
      password: "a13349817311",
      // database
      database: "task_manage",
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [
      "http://localhost:8080",
      "http://localhost:9000",
      "http://localhost:3000",
      "http://immortalboy.cn",
      "http://vue.immortalboy.cn",
      "http://admin.immortalboy.cn",
      "https://immortalboy.cn",
      "https://vue.immortalboy.cn",
      "https://admin.immortalboy.cn",
      "https://image.immortalboy.cn",
    ],
  };
  config.cors = {
    // origin: '*', // 注释掉则允许白名单的域名访问
    credentials: true, // 允许cookie跨域
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTION",
  };

  config.jwt = {
    secret: "taskServer",
  };

  return {
    ...config,
    ...userConfig,
  };
};
