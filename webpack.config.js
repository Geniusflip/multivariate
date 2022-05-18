const path = require('path');

module.exports = {
    mode: 'development',
    watch: true,
    module: {
      rules: [{
        exclude: '/src/main.js',
      },
      {
          test: /\.glsl$/,
          use: 'webpack-glsl-loader'
      }]
    },
    output: {
      filename: '../src/main.js'
    }
  };
  