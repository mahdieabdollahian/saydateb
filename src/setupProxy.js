const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/account", {
      target: "http://accounting.persianspeech.com/",
      changeOrigin: true,
    })
  );
};
