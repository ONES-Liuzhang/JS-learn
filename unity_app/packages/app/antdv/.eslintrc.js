module.exports = {
  root: true,
  rules: {
    'no-console': 0,
    'no-unused-vars': [1, {
      "vars": "all",
      "args": 'none',
      "ignoreRestSiblings": false
    }],
    'no-undef': 1,
    'no-var': 2,
    'array-callback-return': 1,
    'class-methods-use-this': 2,
    // 'no-confusing-arrow': 2,
    // 'arrow-parens': [2, "as-needed", {
    //   "requireForBlockBody": false
    // }],
    'no-duplicate-imports': "error"
  },
  overrides: [

    {
      files: ['**/*.js?(x)',],
      rules: {

      }
    }
  ],
}
