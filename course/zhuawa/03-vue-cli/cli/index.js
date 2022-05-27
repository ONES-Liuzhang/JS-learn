#!/usr/bin/env node

const path = require('path')
const {program} = require('commander')
const inquirer = require('inquirer')
const childProcess = require('child_process')

program
    .arguments('<dir>')
    .description('this is a directory!')
    .action((dir) => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'framework',
                message: 'which framework do you like?',
                choices: [
                    'react',
                    'vue'
                ]
            }
        ])
        .then((answers) => {
            const fullDir = path.resolve(process.cwd(), dir)
            const command = `git clone https://github.com/loatheb/${answers.framework}-boilerplate.git ${fullDir}`
            childProcess.execSync(command)
        })
    })

program.parse(process.argv)