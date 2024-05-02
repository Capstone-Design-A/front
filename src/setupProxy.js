const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/item",
    createProxyMiddleware({
      target: "https://dev.agriculturalproducts.store",
      changeOrigin: true,
    })
  );
};
