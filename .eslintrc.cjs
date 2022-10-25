/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: ['warn', 'single'], // 引号类型 `` '' ''
    'prettier/prettier': 'off', // prettier 标记的地方抛出错误信息
    'spaced-comment': [2, 'always'], // 注释后面必须写两个空格
    'comma-dangle': ['error', 'never'], // 对象字面量项尾不能有逗号
    'comma-style': ['error', 'last'], // 逗号风格，换行时在行首还是行尾
    'consistent-return': 'off', // return 后面是否允许省略
    semi: 'off', // 是否语句强制分号结尾
    'comma-spacing': 'off', // 逗号前后的空格
    'no-undef': 'warn', // 不能有未定义的变量
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used'
      }
    ], // 不能有声明后未被使用的变量或参数
    'dot-notation': ['off', { allowKeywords: true }], // 避免不必要的方括号
    eqeqeq: 'error', // 要求使用 === 和 !==
    'valid-typeof': 'error', // 必须使用合法的typeof的值
    'generator-star-spacing': 'off', // 生成器函数*的前后空格
    indent: ['error', 2], // 缩进风格
    'no-extra-semi': 'error', // 禁止多余的冒号
    'linebreak-style': ['off', 'windows'], // 换行风格
    'no-func-assign': 'error', // 禁止重复的函数声明
    'no-inner-declarations': ['error', 'functions'], // 禁止在块语句中使用声明（变量或函数）
    'init-declarations': 'off', // 声明时必须赋初始值
    'key-spacing': ['off', { beforeColon: false, afterColon: true }], // 对象字面量中冒号的前后空格
    'array-bracket-spacing': ['error', 'never'], // 是否允许非空数组里面有多余的空格
    'keyword-spacing': ['error', { before: true, after: true }], // 关键词加空格
    '@typescript-eslint/no-explicit-any': ['off'] // 关闭any校验
  }
};
