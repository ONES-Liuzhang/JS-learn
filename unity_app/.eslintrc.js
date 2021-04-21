module.exports = {
  // 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。如果发现配置文件中有 “root”: true，它就会停止在父级目录中寻找。
  root: true,
  // 定义了一组预定义的全局变量。可用的环境包
  env: {
    es6: true, // 启用 ES6 语法支持以及新的 ES6 全局变量或类型
    browser: true,
    node: true,
  },
  // 使用 globals 指出你要使用的全局变量。将变量设置为 true 将允许变量被重写，或 false 将不允许被重写。
  globals: {
    vm: true,
    res: true,
    context: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript'],

  parserOptions: {
    parser: '@typescript-eslint/parser',
    // 默认设置为3， 5（ 默认）， 你可以使用 6、 7、 8 或 9 来指定你想要使用的 ECMAScript 版本。
    // 你也可以用使用年份命名的版本号指定为 2015（ 同 6）， 2016（ 同 7）， 或 2017（ 同 8） 或 2018（ 同 9）
    ecmaVersion: 7,
    // "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
    sourceType: 'module',
    // 想使用的额外的语言特性
    ecmaFeatures: {
      globalReturn: false, // 允许在全局作用域下使用 return 语句
      impliedStrict: true, // - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
      jsx: true, //- 启用 JSX
    },
  },
  rules: {
    'no-console': 0,
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
      },
    ],
    'no-undef': 2,
    'no-var': 2,
    'array-callback-return': 2,
    'class-methods-use-this': 2,
    // 'no-confusing-arrow': 2,
    // 'arrow-parens': [2, "as-needed", {
    //   "requireForBlockBody": false
    // }],
    'no-duplicate-imports': 'error',
  },
  overrides: [
    {
      files: ['packages/**/*.ts?(x)'],
      rules: {
        /*
         * ------------------------------------------------
         * Possible Errors
         * 以下规则与 JavaScript 代码中可能的错误或逻辑错误有关
         * ------------------------------------------------
         */
        // '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],

        //react 相关配置项
        // "react/forbid-prop-types": [0],
        // "react/jsx-filename-extension": [1, {
        //   "extensions": [".js"]
        // }],
        // "react/jsx-no-bind": [0],
        // "react/jsx-indent": [2, 4],
        // "react/jsx-indent-props": [2, 4],
        // "react/jsx-uses-react": "error",
        // "react/jsx-uses-vars": "error",
        // "react/prop-types": [0],
        // "react/prefer-stateless-function": [0],
        // "react/jsx-wrap-multilines": [
        //   "error",
        //   {
        //     "declaration": "parens-new-line",
        //     "assignment": "parens-new-line",
        //     "return": "parens-new-line",
        //     "arrow": "parens-new-line",
        //     "condition": "parens-new-line",
        //     "logical": "parens-new-line",
        //     "prop": "ignore"
        //   }
        // ],
        // "jsx-a11y/no-static-element-interactions": [0],
        // "jsx-a11y/no-noninteractive-element-interactions": [0],
        // "jsx-a11y/click-events-have-key-events": [0],
        // "jsx-a11y/anchor-is-valid": [0],
        'no-floating-decimal': 0,
        // 禁止在常规字符串中出现模板字面量占位符语法
        'no-template-curly-in-string': 1,
        // error; for循转方向出错
        'for-direction': 2,
        // error; getter必须有返回值，并且禁止返回值为undefined, 比如 return;
        'getter-return': [
          2,
          {
            allowImplicit: false,
          },
        ],
        'no-await-in-loop': 2, // error; 禁止在循环中出现 await

        // error; 不允许使用console进行代码调试
        // 'no-console': process.env.NODE_ENV === "production" ? "error" : "off",
        'no-console': 0,
        // error; 不允许使用debugger进行代码调试
        'no-debugger': 1,

        /*
         * ------------------------------------------------
         * Best Practices
         * 这些规则是关于最佳实践的，帮助你避免一些问题
         * ------------------------------------------------
         */

        // error; 强制 getter 和 setter 在对象中成对出现
        'accessor-pairs': 2,
        // off; 对于数据相关操作函数比如reduce, map, filter等，callback必须有return
        'array-callback-return': 0,
        // error; 把var关键字看成块级作用域，防止变量提升导致的bug
        'block-scoped-var': 2,
        // error; class this
        'class-methods-use-this': 0,
        // error; 禁止或强制在计算属性中使用空格
        'computed-property-spacing': [2, 'never'],
        // error; 要求遵循大括号约定
        // 'curly': [2, 'all'],
        // error; switch case语句里面一定需要default分支
        'default-case': 2,
        // error; 要求点操作符和属性放在同一行
        'dot-location': [2, 'property'],
        // warn; 推荐.操作符
        'dot-notation': [
          0,
          {
            allowKeywords: false,
          },
        ],
        // error; === !==
        eqeqeq: 2,
        // error; 禁止使用看起来像除法的正则表达式
        'no-div-regex': 2,
        // error; 禁止在 else 前有 return
        'no-else-return': 2,
        // error; 不允许使用空函数，除非在空函数里面给出注释说明
        'no-empty-function': 0,
        // error; if (foo === null)
        'no-eq-null': 2,
        // error; 代码中不允许使用eval
        'no-eval': 2,
        // error; 禁止修改原生对象
        'no-extend-native': [
          2,
          {
            exceptions: ['Object', 'Promise'],
          },
        ],
        // error; 禁止出现没必要的 bind
        'no-extra-bind': 2,
        // error; 表示小数时，禁止省略 0，比如 .5
        'no-floating-decimal': 2,
        // error; 强制类型转换
        'no-implicit-coercion': [
          2,
          {
            boolean: false,
            string: false,
          },
        ],
        // this关键字出现在类和类对象之外 todo
        'no-invalid-this': 1,
        // error; 禁止使用类似 eval() 的方法
        'no-implied-eval': 2,
        // error; 禁止使用 __iterator__
        'no-iterator': 2,
        // error; 禁用标签语句
        'no-labels': 2,
        // error; 禁止循环中存在函数
        'no-loop-func': 2,
        // error; 禁止使用没必要的 {} 作为代码块
        'no-lone-blocks': 2,
        // error; 禁止出现连续的多个空格，除非是注释前，或对齐对象的属性、变量定义、import 等
        'no-multi-spaces': [
          2,
          {
            ignoreEOLComments: true,
            exceptions: {
              Property: true,
              BinaryExpression: false,
              VariableDeclarator: true,
              ImportDeclaration: true,
            },
          },
        ],
        // error; 禁止多行字符串
        'no-multi-str': 2,
        // error; 禁止直接 new 一个类而不赋值
        'no-new': 2,
        // error; 禁止使用 new Function，比如 const expression = new Function('a', 'b', 'return a + b');
        'no-new-func': 2,
        // error; 对于JS的原始类型比如String, Number, Boolean等，不允许使用new 操作符
        'no-new-wrappers': 2,
        // warn; 不推荐对 function 的参数进行重新赋值
        'no-param-reassign': 1,
        // error; 禁止直接使用__proto__属性，可以使用getPrototypeOf替代
        'no-proto': 2,
        // error; 禁止在 return 语句中使用赋值语句
        'no-return-assign': 2,
        // error; 禁止在 return 语句中使用await
        'no-return-await': 2,
        // warn; 不推荐逗号操作符
        'no-sequences': 1,
        // error; 禁止抛出异常字面量
        'no-throw-literal': 2,
        // error; 禁用一成不变的循环条件
        'no-unmodified-loop-condition': 2,
        // error; 禁止出现未使用过的表达式
        'no-unused-expressions': 0,
        // error; 禁止不必要的 .call() 和 .apply()
        'no-useless-call': 2,
        // error; 禁止出现没必要的字符串拼接，比如 'hello' + 'world'，可以直接写成'hello world'
        'no-useless-concat': 2,
        // error; disallow redundant return statements
        'no-useless-return': 2,
        // 禁用 Alert
        'no-alert': 2,
        // 禁用 Script URL
        'no-script-url': 2,
        // error; 对数字使用 parseInt 并且总是带上类型转换的基数
        radix: 2,
        // error; async函数里面必须有await
        'require-await': 0,
        // error; 要求所有的 var 声明出现在它们所在的作用域顶部
        'vars-on-top': 2,
        // warn; 推荐yoda表达式
        yoda: [0, 'always'],
        // 需要约束 for-in
        'guard-for-in': 2,

        'prefer-destructuring': 0,
        /*
         * ------------------------------------------------
         * Variables
         * 这些规则与变量声明有关
         * ------------------------------------------------
         */

        // error; 禁止 catch 子句的参数与外层作用域中的变量同名
        'no-catch-shadow': 2,
        // error; 禁用特定的全局变量
        'no-restricted-globals': 2,
        // error; 禁止变量声明与外层作用域的变量同名
        'no-shadow': 0,
        // error; js关键字和保留字不能作为函数名或者变量名
        'no-shadow-restricted-names': 2,
        // error; 禁止label名称和var相同
        'no-label-var': 2,
        // error; 避免初始化变量值为 undefined
        'no-undef-init': 2,
        // error; 禁止将undefined当成标志符
        'no-undefined': 0,
        // error; 变量使用之前必须进行定义，函数除外
        'no-use-before-define': [
          2,
          {
            functions: false,
          },
        ],

        /*
         * ------------------------------------------------
         * Stylistic Issues
         * 这些规则是关于风格指南的，而且是非常主观的
         * ------------------------------------------------
         */

        // error; 是否允许非空数组里面有多余的空格
        'array-bracket-spacing': [2, 'never'],
        // warn; 大括号风格
        'brace-style': [1, '1tbs'],
        // error; 变量命名需要以驼峰命名法，对属性字段不做限制
        camelcase: [
          0,
          {
            properties: 'never',
          },
        ],
        // error; 对象字面量项尾不能有逗号
        'comma-dangle': [0, 'always-multiline'], //多行模式必须带逗号，单行模式不能带逗号
        // error; 逗号风格，换行时在行首还是行尾
        'comma-style': [2, 'last'],
        // error; 当获取当前执行环境的上下文时，强制使用一致的命名
        'consistent-this': [2, 'self', 'that'],
        // error; 函数名和执行它的括号之间禁止有空格
        'func-call-spacing': [2, 'never'],
        // error; 强制一致地使用 function 声明或表达式
        'func-style': [
          2,
          'declaration',
          {
            allowArrowFunctions: true,
          },
        ],
        // error; 一个缩进必须用四个空格替代, switch语句里面的case 2个空格
        indent: [0, 2],
        // error; 对象字面量中冒号前面禁止有空格，后面必须有空格
        'key-spacing': [
          2,
          {
            beforeColon: false,
            afterColon: true,
            mode: 'strict',
          },
        ],
        // error; 关键字前后必须要加上空格
        'keyword-spacing': [
          2,
          {
            before: true,
            after: true,
          },
        ],
        // off; 不限制注释位置
        'line-comment-position': 0,
        // error; 换行符
        'linebreak-style': [0, 'windows'],
        // warn; 注释前有一空行
        'lines-around-comment': [
          0,
          {
            beforeBlockComment: true,
            beforeLineComment: true,
          },
        ],
        // error; 强制可嵌套的块的最大深度
        'max-depth': [
          2,
          {
            max: 4,
          },
        ],
        // warn; 单行最多允许160个字符, 对包含url的行不进行此限制
        'max-len': [
          1,
          {
            code: 160,
            ignoreUrls: true,
            ignoreComments: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
          },
        ],
        // warn; 强制回调函数最大嵌套深度
        'max-nested-callbacks': [
          1,
          {
            max: 3,
          },
        ],
        // error; 构造函数的必须以大写字母开头
        'new-cap': 0,
        // error; new 后面类必须带上括号
        'new-parens': 2,
        // error; 禁止使用 Array 构造函数
        'no-array-constructor': 2,
        // error; no continue
        'no-continue': 2,
        // error; 禁止 if 语句作为唯一语句出现在 else 语句块中
        'no-lonely-if': 0,
        // warn; 不允许多个空行
        'no-multiple-empty-lines': [
          1,
          {
            max: 3,
          },
        ],
        // error; 禁止使用嵌套的三元表达式
        'no-nested-ternary': 2,
        // error; 禁用 Object 的构造函数
        'no-new-object': 2,
        // error; 强制在花括号内使用一致的换行符
        'object-curly-newline': [
          0,
          {
            multiline: true,
          },
        ],
        // error; 强制将对象的属性放在不同的行上
        'object-property-newline': 0,
        // error; 变量申明必须每行一个
        'one-var': [2, 'never'],
        // warn; 变量申明必须每行一个
        'one-var-declaration-per-line': [2, 'always'],
        // error; 换行时运算符在行尾还是行首
        'operator-linebreak': [1, 'after'],
        // warn; 句柄padding
        'padding-line-between-statements': [
          0,
          {
            blankLine: 'always',
            prev: ['const', 'let', 'var'],
            next: '*',
          },
          {
            blankLine: 'any',
            prev: ['const', 'let', 'var'],
            next: ['const', 'let', 'var'],
          },
        ],
        // error; 必须使用单引号
        quotes: [
          2,
          'single',
          {
            avoidEscape: true,
            allowTemplateLiterals: true,
          },
        ],
        // warn; 推荐jsdoc注释
        'require-jsdoc': [
          0,
          {
            require: {
              FunctionDeclaration: true,
              MethodDefinition: false,
              ClassDeclaration: false,
              ArrowFunctionExpression: false,
            },
          },
        ],
        // error; 结尾必须有分号
        semi: [0, 'always'],
        // error; 一行有多个语句时，分号前面禁止有空格，分号后面必须有空格
        'semi-spacing': [
          2,
          {
            before: false,
            after: true,
          },
        ],
        // error; 分号必须写在行尾，禁止在行首出现
        'semi-style': [2, 'last'],
        // error; if, function 等的大括号之前必须要有空格
        'space-before-blocks': [2, 'always'],
        // error; 注释空格
        'spaced-comment': [0],
        // error; case 子句冒号前禁止有空格，冒号后必须有空格
        'switch-colon-spacing': [
          2,
          {
            after: true,
            before: false,
          },
        ],
        // 链式调用必须换行
        'newline-per-chained-call': 0,

        /*
         * ------------------------------------------------
         * ECMAScript 6
         * 这些规则只与 ES6 有关
         * ------------------------------------------------
         */

        // error; 箭头函数的箭头前后必须有空格
        'arrow-spacing': [
          2,
          {
            before: true,
            after: true,
          },
        ],
        // error; 禁止import重复模块
        'no-duplicate-imports': 2,
        // error; 要求使用 let 或 const 而不是 var
        'no-var': 2,
        // warn; 推荐使用箭头函数作为回调
        'prefer-arrow-callback': [
          1,
          {
            allowNamedFunctions: true,
          },
        ],
        // error; 使用const
        'prefer-const': [
          0,
          {
            destructuring: 'any',
            ignoreReadBeforeAssign: false,
          },
        ],
        // warn; 推荐rest运算符
        'prefer-rest-params': 1,
        // warn; 推荐扩展运算符
        'prefer-spread': 1,
        // error; rest 空格
        'rest-spread-spacing': [2, 'never'],
        // error; require symbol description
        'symbol-description': 2,
        // 禁止在对象中使用不必要的计算属性
        'no-useless-computed-key': 1,
        // 禁用不必要的构造函数
        'no-useless-constructor': 2,
      },
    },
    {
      files: ['**/*.js?(x)'],
      rules: {},
    },
  ],
};
