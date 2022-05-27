#!/usr/bin/env node
const Compiler = require("../compiler");
const config = require("../webpack.conf");

const compiler = new Compiler(config);

compiler.run();
