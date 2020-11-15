const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true,
        })
    )

    app.use(
        "/streams",
        createProxyMiddleware({
            target: "http://localhost:5050",
            changeOrigin: true,
        })
    )
}
