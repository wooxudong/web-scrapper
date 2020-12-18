const puppeteer = require('puppeteer');


(async () => {
  const aprMatcher = require('./aprMatcher');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.curve.fi/');
  const closeButton = await page.$('div.bn-onboard-modal-content-close')
  await closeButton.evaluate(closeButton => closeButton.click());

  const texts = await page.evaluate(() => Array.from(document.querySelectorAll('span.apr'), element => {
    const rawTexts = [];
    for (const child of element.children) {
      rawTexts.push(child.innerText);
    }
    return rawTexts;
  }));

  const aprs = texts.flatMap(arr => arr.join()).map(apr => aprMatcher.match(apr)).filter(it => it);
  console.log(aprs);
  await browser.close();
})();


