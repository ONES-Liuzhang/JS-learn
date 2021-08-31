#!/usr/bin/env node
const { program } = require("commander");
const inquirer = require("inquirer");
const { runImg } = require("./image-fetch.js");
const { runGImg } = require("./g-image-fetch");

program.version("0.0.1");

program
  .option("-g, --google", "爬取谷歌图片")
  .option("-b, --baidu", "爬取百度图片");

program.parse(process.argv);

const options = program.opts();

const initQuestions = [
  {
    type: "input",
    name: "keyword",
    message: "请输入想搜索的图片关键词",
  },
];

if (options.google) {
  inquirer.prompt(initQuestions).then((result) => {
    const { keyword } = result;

    runGImg(keyword);
  });
} else if (options.image) {
  initQuestions.push({
    type: "number",
    name: "counts",
    message: "请输入想下载的数量x，总数 = x * 30",
    default: 1,
  });

  inquirer.prompt(initQuestions).then((result) => {
    const { keyword, counts } = result;

    runImg(keyword, counts * 30);
  });
}
