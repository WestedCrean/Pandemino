const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true,
        })
    )

    const socketProxy = createProxyMiddleware("/foo/bar", {
        target: "http://localhost:5050",
        changeOrigin: true,
        ws: true,
        logLevel: "debug",
    })

    app.use(socketProxy)
}
