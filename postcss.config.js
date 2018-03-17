let config = require("./build/config.js");

module.exports={
  "plugins": { 
    "postcss-import": {}, 
    "postcss-url": {},      
    "postcss-write-svg": { utf8: false },  
    "autoprefixer": {
      "browsers": config.browsers
    },  
    "postcss-px-to-viewport": { 
      viewportWidth: 750, 
      viewportHeight: 1334, 
      unitPrecision: 3, 
      viewportUnit: 'vw', 
      selectorBlackList: ['.ignore', '.hairlines'], 
      minPixelValue: 1, 
      mediaQuery: false 
    }, 
    "postcss-viewport-units":{},      
  }
}