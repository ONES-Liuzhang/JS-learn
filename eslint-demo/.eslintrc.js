module.exports = {
	env: {
		browser: true,
		es2021: true, // 提供新的ECMASCRIPT全局变量
	},
	extends: "plugin:vue/essential",
	parserOptions: {
		ecmaVersion: 12, // 支持一些基本语法，要使用新的全局变量，必须要配置{"env": {es2021: true}}
		parser: "@typescript-eslint/parser",
		sourceType: "module",
	},
	plugins: ["vue", "@typescript-eslint"],
	rules: {},
};
