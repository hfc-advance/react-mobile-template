
const miniCssExtractPlugin = require("mini-css-extract-plugin");

let defaultCssLoader = [  
  {
    loader: 'css-loader',
    options: {
      modules: true,
      localIdentName: '[path][name]__[local]--[hash:base64:5]'
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  }
]

let createCssLoader = (type = 'css', options = {}) => {
  let { extract, baseStyle } = options;
  let currentLoaders = [];

  //配置的变量文件
  if (baseStyle) {
     if (type === 'stylus' || type === 'styl') {
      currentLoaders = [
        {
          loader:"stylus-loader",
          options: {
            import: baseStyle
          }
        },        
        {
          loader: 'style-resources-loader',
          options: {
            patterns: [baseStyle]
          }
        }
      ]
     }
  } else {
    if (type === 'stylus' || type === 'styl') {
      currentLoaders = [
        'stylus-loader'       
      ]
     }
  }

  if (extract) {
   return [
    miniCssExtractPlugin.loader,
    ...defaultCssLoader,
    ...currentLoaders
   ]
  } else {
    return [
      'style-loader',
      ...defaultCssLoader,
      ...currentLoaders
    ]
  }
};

module.exports = {
  createCssLoader
}