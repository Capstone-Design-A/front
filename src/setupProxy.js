const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/item",
    createProxyMiddleware({
      target: "https://dev.agriculturalproducts.store",
      changeOrigin: true,
    })
  );
  app.use(
    "/groupItem",
    createProxyMiddleware({
      target: "https://dev.agriculturalproducts.store",
      changeOrigin: true,
    })
  );
  app.use(
    "/seller",
    createProxyMiddleware({
      target: "https://dev.agriculturalproducts.store",
      changeOrigin: true,
    })
  );
  app.use(
    "/imageURLtest1",
    createProxyMiddleware({
      target: "https://dev.agriculturalproducts.store",
      changeOrigin: true,
    })
  );
  app.use(
    "/inquiry",
    createProxyMiddleware({
      target: "https://dev.agriculturalproducts.store",
      changeOrigin: true,
    })
  );
  app.use(
    "/review",
    createProxyMiddleware({
      target: "https://dev.agriculturalproducts.store",
      changeOrigin: true,
    })
  );
  app.use(
    "/subscription",
    createProxyMiddleware({
      target: "https://dev.agriculturalproducts.store",
      changeOrigin: true,
    })
  );
  app.use(
    "/alarm",
    createProxyMiddleware({
      target: "https://dev.agriculturalproducts.store",
      changeOrigin: true,
    })
  );
};
