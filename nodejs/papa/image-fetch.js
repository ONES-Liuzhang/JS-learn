const cliProgress = require("cli-progress");
const fs = require("fs");
const path = require("path");
let bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const { request, mkdir, downloadImage } = require("./common.js");

const header_default = {
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
  "sec-ch-ua":
    '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
};

const header_json = {
  ...header_default,
  Accept: "text/plain, */*; q=0.01",
};

/**
 *
 * @param {*} number 下载图片的数量
 */
function start(word, total) {
  // 最少获取30张
  let succeed = 0;
  bar.start(total, 0);

  loadImage(word, total).then((list) => {
    const pathname = path.join(__dirname, `${word}-images`);
    mkdir(pathname);

    list.forEach((item) => {
      downloadImage(item.url)
        .then((res) => {
          if (succeed < total) {
            const filename = path.join(
              pathname,
              `${succeed}.${item.title}.png`
            );
            fs.writeFileSync(filename, res.body);
            succeed++;
            bar.update(succeed);
          }
        })
        .then(() => {
          if (succeed === total) {
            bar.stop();
            succeed++;
            console.log("恭喜！图片下载完成！");
          }
        })
        .catch((err) => {
          // 加载失败了也要加进度
          succeed++;
          if (succeed === total) {
            bar.stop();
          } else bar.update(succeed);
        });
    });
  });
}

function loadImage(word, total) {
  return new Promise((resolve, reject) => {
    request(
      `https://image.baidu.com/search/index?tn=baiduimage&fm=detail&xthttps=111110&fmq=1630166299790_R&istype=2&ie=utf-8&word=${encodeURIComponent(
        word
      )}`,
      header_default
    )
      .then((res) => {
        const imageUrlList = getListByKey(res.text, "objURL").map((item) =>
          item.replace(/\\/g, "")
        );
        const imageTitleList = getListByKey(res.text, "fromPageTitle").map(
          (item) =>
            item
              .replace(/\\/g, "")
              .replace(/<strong>/g, "")
              .replace(/<\/strong>/g, "")
        );

        let imageList = imageTitleList.map((title, index) => {
          return {
            title,
            url: imageUrlList[index],
          };
        });

        let start = imageList.length;
        if (start < total) {
          // 获取剩下的图片
          step(word, start, total).then((list) => {
            imageList = imageList.concat(list);
            resolve(imageList);
          });
        } else {
          resolve(imageList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

/**
 *
 * @param {*} start 起始位置
 * @param {*} num 数量
 * @returns
 */
async function step(word, start, total) {
  let list = [];
  if (start < total) {
    let num = Math.min(60, total - start);
    let url = `https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&fp=result&queryWord=${encodeURIComponent(
      word
    )}&cl=2&lm=-1&ie=utf-8utf-8&st=-1&ic=0&word=${encodeURIComponent(
      word
    )}face=0&istype=2&nc=1&pn=${start}&rn=${num}&gsm=1e&${Date.now()}=`;
    list = await request(url, header_json).then((res) => {
      const json = JSON.parse(res.text);
      return json.data.map((item) => ({
        url: item.middleURL,
        title: item.fromPageTitle
          ? item.fromPageTitle
              .replace(/<strong>/g, "")
              .replace(/<\/strong>/g, "")
          : word,
      }));
    });
    let nList = await step(start + num, total);
    list = list.concat(nList);
  }
  return list;
}

function getListByKey(text, key) {
  const reg = new RegExp(`"${key}":"(.*?)"`, "g");
  return text.match(reg).map((item) => {
    item.match(/:"(.*?)"/);
    return RegExp.$1;
  });
}

// start("可爱猫", 60);

module.exports = {
  runImg: start,
};
