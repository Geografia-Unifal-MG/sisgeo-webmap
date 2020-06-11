const proxy = [
    {
      context: '/api',
      target: 'http://172.18.0.1:13222/api/v1/',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;