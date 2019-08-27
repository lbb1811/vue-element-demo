module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'camelcase': 0,
    // 对象要么一行，要么每个属性一行
    // "object-property-newline": [2, { "allowMultiplePropertiesPerLine": true }],
    // 禁用不必要的转义字符
    'no-useless-escape': 0,
    "space-before-function-paren": ["error", "always"],

  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
