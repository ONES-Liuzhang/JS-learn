const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://github.com/puppeteer/puppeteer");
  const buffer = await page.screenshot({ path: "example.png" });

  fs.writeFileSync(path.resolve(__dirname, "./example.png"), buffer);

  await browser.close();
})();
