module.exports = {
  outputDir: "taskManager",
  productionSourceMap: false, // 关闭生产环境sourcemap
  devServer: {
    proxy: {
      "/api": {
        // 以/api开头的接口都代理到target指定的域名下
        // target: 'https://immortalboy.cn'
        target: "http://127.0.0.1:7001",
      },
    },
  },
};
