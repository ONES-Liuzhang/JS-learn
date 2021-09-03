const childProcess = require("child_process");
const superagent = require("superagent");
const fs = require("fs");
require("superagent-proxy")(superagent);

const proxy = process.env.HTTP_PROXY || "http://127.0.0.1:41081";

exports.request = (url, headers) => {
  return new Promise((resolve, reject) => {
    superagent
      .get(url)
      .proxy(proxy)
      .set(headers)
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
  });
};

exports.mkdir = (pathname) => {
  if (fs.existsSync(pathname)) {
    childProcess.execSync(`rm -rf ${pathname}`);
  }
  fs.mkdirSync(pathname);
};

exports.downloadImageWithTimeout = (url, timeout = 5000) => {
  let timer = null;
  return new Promise((resolve, reject) => {
    superagent.get(url).end((err, res) => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (err) {
        return reject(err);
      } else {
        return resolve(res);
      }
    });
    // timer = setTimeout(reject, timeout);
  });
};
