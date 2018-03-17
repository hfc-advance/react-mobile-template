
const webpackMerge = require("webpack-merge");
const webpackCommon = require("./webpack.base");
const utils = require("./utils");
const config = require("./config");
const loader = require("./loader");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require("compression-webpack-plugin");

let cssLoader = ['css', 'styl'].map(item => {
  return {
    test: new RegExp(`\.${item}$`),
    loader: loader.createCssLoader(item, {
      baseStyle: utils.resolve('../src/styles/var.styl'),
      extract: true
    }),
    include: config.projectInclude   
  }
});

module.exports =webpackMerge(webpackCommon, {
  output: {
    path: utils.resolve('../dist'),
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/async/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      ...cssLoader
    ]
  },
  optimization: {
    'minimizer': [
      new uglifyjsWebpackPlugin({
        parallel: true,
        sourceMap: false
      })
    ],
    "noEmitOnErrors": true,     
    'runtimeChunk': {
      name: 'runtime'
    },
    'splitChunks': {
      cacheGroups: {
        commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "initial"
        },
        asynccommons: {         
            name: "asynccommons",
            chunks: "async",
            minChunks: 2,
            minSize: 1024*10
        }
      }      
    }
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: 'css/common.[chunkhash:8].css',
      chunkFilename: 'css/async/common.[chunkhash:8].css'
    }), 
    new BundleAnalyzerPlugin({
      analyzerPort: 8880,
      openAnalyzer: false
    }),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
    })    
  ]
});