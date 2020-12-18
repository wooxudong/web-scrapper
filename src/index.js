const puppeteer = require('puppeteer');
const aprMatcher = require('./aprMatcher');

const getRawTexts = async () => {
  const browser = await puppeteer.launch();
  try {
    const aprMatcher = require('./aprMatcher');
    const page = await browser.newPage();
    await page.goto('https://www.curve.fi/');
    const closeButton = await page.$('div.bn-onboard-modal-content-close')
    await closeButton.evaluate(closeButton => closeButton.click());

    //it took a little bit of time for curve.fi to load the incentives.
    await page.waitForTimeout(5000);
    const texts = await page.evaluate(() => Array.from(document.querySelectorAll('span.apr'), element => {
      return element.innerText;
    }));
    await browser.close();
    return texts;
  } catch (e) {
    return [];
  } finally {
    await browser.close();
  }

};
(async function (){
  const rawTexts = await getRawTexts();
  const aprs = rawTexts.map(apr => aprMatcher.match(apr)).filter(it => it);
  console.log(aprs);
})();


