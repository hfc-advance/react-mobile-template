

const utils = require("./utils");
const htmlWebpackPlugin = require("html-webpack-plugin");
const eslintFrienylyFormate = require("eslint-friendly-formatter");
const config = require("./config");
const webpack = require("webpack");
const manifest= require("../dll-manifest.json");
const svgSpritePlugin = require("svg-sprite-loader/plugin");

let svgoLoader = process.env.NODE_ENV === 'production' ? ['svgo-loader']: []

module.exports = {  
  entry: {
    index: utils.resolve('../src/index')
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(jsx|js)$/,
        loader: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: eslintFrienylyFormate
            }
          }
        ],
        include: config.projectInclude
      },      
      {
        test: /\.(js|jsx)$/,
        loader: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        include: config.projectInclude
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        loader: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: [
          {
            loader: 'svg-sprite-loader',
            options: {
              options: { extract: true }
            }
          },
          ...svgoLoader
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: utils.resolve('../src/index.html'),
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: process.env.NODE_ENV === 'production',
        collapseWhitespace: process.env.NODE_ENV === 'production',
        removeAttributeQuotes: process.env.NODE_ENV === 'production'
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      vendor: manifest.name + '.js'
    }),
    new webpack.DllReferencePlugin({
      context: utils.resolve("../src"),
      name: 'vendor',
      manifest
    }),
    new svgSpritePlugin()    
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': utils.resolve("../src"),
      'vue': 'vue/dist/vue.esm.js'
    }
  }
};