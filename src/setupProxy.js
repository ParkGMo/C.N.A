const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/overseasTourists', // 기존 host 대신 사용할 경로
    createProxyMiddleware({
      target:
        'http://openapi.tour.go.kr/openapi/service/EdrcntTourismStatsService/getOvseaTuristStatsList', // 기존 host
      changeOrigin: true,
      pathRewrite: {
        '^/overseasTourists': '',
      },
    })
  );
};
