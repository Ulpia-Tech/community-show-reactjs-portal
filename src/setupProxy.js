const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

    app.use('/api', createProxyMiddleware({
        target          : 'https://test-usg.reltio.com/reltio',
        changeOrigin    : true,
    }));

    app.use('/oauth', createProxyMiddleware({
        target          : 'https://auth.reltio.com',
        changeOrigin    : true,
    }));

    app.use('/reltio', createProxyMiddleware({
        target          : 'https://test-usg.reltio.com/',
        changeOrigin    : true,
    }));    
};