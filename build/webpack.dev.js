
const webpackMerge = require("webpack-merge");
const webpackCommon = require("./webpack.base");
const utils = require("./utils");
const config = require("./config");
const loader = require("./loader");
const friendlyErrorPlugin = require("friendly-errors-webpack-plugin");
const chalk = require("chalk");
const webpack = require("webpack");
const errorOverlayWebpackPlugin = require("error-overlay-webpack-plugin");
let cssLoader = ['css', 'styl'].map(item => {
  return {
    test: new RegExp(`\.${item}$`),
    loader: loader.createCssLoader(item, {
      baseStyle: utils.resolve('../src/styles/var.styl')
    }),
    include: config.projectInclude   
  }
});


const devConfig = {
  cache: true,
  output: {
    path: utils.resolve('../dist'),
    filename: 'js/[name].[hash:6].js',
    chunkFilename: 'js/async/[name].[hash:6].js'
  }, 
  plugins: [
    new friendlyErrorPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://${config.server.host}:${config.server.port}`]       
      },
      onErrors: function (severity, errors) {
        let [ error ] = (errors || []);
        if (severity === 'error') {
          console.log(chalk.red(`${error.name}:at${error.file}`));;
        } else {
          console.log(chalk.yellow(`${error.name}:at${error.file}`));;
        }       
      },     
      clearConsole: true,           
      additionalFormatters: [],
      additionalTransformers: []
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new errorOverlayWebpackPlugin()
  ], 
  module: {
    rules: [
      ...cssLoader
    ]
  },  
  devServer: {
    ...config.server
  }
};

//  配置热重载调试方式
devConfig.devtool = config.server.hot ? 'cheap-module-eval-source-map' : false,

module.exports =webpackMerge(webpackCommon, devConfig);