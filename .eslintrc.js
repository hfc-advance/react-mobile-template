module.exports = {
  extends: [
      'eslint-config-alloy/react',
  ],
  globals: {
      // 这里填入你的项目需要的全局变量
      // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
      //
      // Vue: false
  },
  rules: {
    // 这里填入你的项目需要的个性化配置
    'react/jsx-indent': [
      'warn',
      2
    ],
    // @fixable jsx 的 props 缩进必须为四个空格
    'react/jsx-indent-props': [
        'warn',
        2
    ],
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ]     
  }
};