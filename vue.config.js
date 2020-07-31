const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
  chainWebpack(config) { 
    // and this line 
    config.plugin('CompressionPlugin').use(CompressionPlugin);
  }
};


