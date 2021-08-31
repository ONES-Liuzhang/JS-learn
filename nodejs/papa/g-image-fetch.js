// google图片
const fs = require("fs");
const path = require("path");
const { request, mkdir, downloadImageWithTimeout } = require("./common");
const cheerio = require("cheerio");
const cliProgress = require("cli-progress");

let bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const header_default = {
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
  "sec-ch-ua":
    '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
};

start("沙雕猫咪表情");

async function start(word) {
  const imgList = [];

  const res = await request(
    `https://www.google.com.hk/search?q=${encodeURIComponent(
      word
    )}&tbm=isch&ved=2ahUKEwjA_43O7NbyAhWOHaYKHapSCDEQ2-cCegQIABAA&sclient=img&ei=NdArYYCRG467mAWqpaGIAw&bih=1008&biw=1792`,
    header_default
  );
  // 获取data-64
  const html = res.text;
  const reg = /_setImgSrc\('\d+','(.*?)'\)/g;
  const base64ImgList = html
    .match(reg)
    .map((item) => {
      item.replace(/\\/g, "").match(/data:image\/(\w+);base64,(.*?)$/);
      return {
        ext: RegExp.$1,
        data: RegExp.$2,
      };
    })
    .filter((item) => !!item.data);

  const $ = cheerio.load(html);
  $("[jsname=N9Xkfe] img").each((index, ele) => {
    const imgUrl = $(ele).attr("data-src");
    const t =
      $(ele)
        .attr("alt")
        .replace(/[\/\\\s]/g, "") || word;
    if (imgUrl) {
      const imgTitle = `${index}.${t}.png`;
      imgList.push({
        url: imgUrl,
        title: imgTitle,
      });
    } else {
      if (base64ImgList.length > 0) {
        item = base64ImgList.shift();
        imgList.push({
          base64: item.data,
          title: `${index}.${t}.${item.ext}`,
        });
      }
    }
  });

  const pathname = path.resolve(__dirname, `${word}-g-images`);
  mkdir(pathname);

  let total = imgList.length;
  let succeed = 0;
  bar.start(total, 0);

  imgList.forEach(async (img) => {
    try {
      if (img.url) {
        const result = await request(img.url, header_default);
        const filename = path.resolve(pathname, img.title);
        fs.writeFileSync(filename, result.body);
      } else if (img.base64) {
        const dataBuffer = Buffer.from(img.base64, "base64");
        const filename = path.resolve(pathname, img.title);
        fs.writeFileSync(filename, dataBuffer);
      }
    } catch (e) {
      debugger;
    } finally {
      if (succeed < total) {
        succeed++;
        bar.update(succeed);
      }
      if (succeed === total) {
        bar.stop();
      }
    }
  });
}

module.exports = {
  runGImg: start,
};
