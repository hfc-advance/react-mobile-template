const path = require("path");
const webpack = require("webpack");
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
module.exports ={
  entry: {
    vendor: [path.resolve(__dirname, './dll.js')]
  },
  output: {    
    path: path.join(__dirname, '../dist'),
    filename: 'js/dll/[name].dll.[chunkhash:8].js',
    library: '[name]'
  },
  optimization: {
    minimizer: [
      new uglifyjsWebpackPlugin({
        parallel: true,
        sourceMap: false
      })
    ]
  }, 
  plugins: [
    new webpack.DllPlugin({
      context: path.resolve(__dirname, "../src"),
      name: 'js/dll/[name].dll.[chunkhash:8]',
      path: path.resolve(__dirname, '../dll-manifest.json')        
    })
  ],
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  }
};