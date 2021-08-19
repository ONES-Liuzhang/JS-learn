#!/usr/bin/env node

const { program } = require("commander");
const inquirer = require("inquirer");
const path = require("path");
const childProcess = require("child_process");

program
  .arguments("<dir>")
  .description("this is a directory!")
  .action((dir) => {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "framwork",
          message: "which framework do you like?",
          choices: ["react", "vue"],
        },
      ])
      .then((answers) => {
        console.log("result", dir, answers);
        const fullDir = path.resolve(process.cwd(), dir);
        console.log("-----fullDir ", fullDir);
        const command = `git clone xxxx ${fullDir}`;
        console.log("-----command ", command);
        childProcess.execSync(command);
      });
  });

program.parse(process.argv);
