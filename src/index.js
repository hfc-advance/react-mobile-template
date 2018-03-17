import viewportUnitsBuggyfill from 'viewport-units-buggyfill';
import viewportUnitsBuggyfillHacks from 'viewport-units-buggyfill/viewport-units-buggyfill.hacks.js';
import fastclick from 'fastclick';
//  解决实例化的对象方法polyfill(例: [1,2,3].includes)
import 'babel-polyfill';
import style from  '@/styles/common.css';
import store from '@/store/';

store.dispatch({
  type: 1
});

console.log(style['f-24']);
import React from 'react';

import ReactDOM from 'react-dom';
ReactDOM.render(
  <h1 className={style['f-24']}>Hello, world!</h1>,
  document.getElementById('app')
);


//  处理vw单位兼容性
window.onload = () => {
  viewportUnitsBuggyfill.init({
    hacks: viewportUnitsBuggyfillHacks
  });
  // 处理点击延迟
  fastclick.attach(document.body);
};

