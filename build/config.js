const utils = require("./utils");
const path = require("path");
const loader = require("./loader");
//  服务器配置
let server = {
  host: '0.0.0.0',
  port: 8808,
  hot: true,
  overlay: {
    warnings: true,
    errors: true
  },
  contentBase: utils.resolve('../dist'),
  quiet: true
};

//   主要兼容浏览器
let browsers = [
  'last 2 versions', 'ios>=7.0', 'Android>=4.3'
];

//  项目主要包含目录
let projectInclude =[path.resolve(__dirname, "../src")];

// 当前环境
let envIsProduction = process.env.NODE_ENV === 'production';
// vue-loader 配置项
let vueLoaderOptions = {
  loaders: {
    css: loader.createCssLoader('css'),
    stylus: loader.createCssLoader('stylus', {baseStyle: utils.resolve('../src/styles/var.styl')}),
    styl: loader.createCssLoader('styl', {baseStyle: utils.resolve('../src/styles/var.styl')})
  },
  preserveWhitespace: !envIsProduction,
  cssSourceMap: !envIsProduction,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
};

module.exports = {
  server,
  browsers,
  projectInclude,
  vueLoaderOptions,
  envIsProduction
};
