import { Injectable } from "@nestjs/common";
import puppeteer from "puppeteer-extra";

@Injectable()
export class PupeteerService {
  private puppeteerOptions = {
    // executablePath: 'C:/Users/ascar/AppData/Local/BraveSoftware/Brave-Browser/Application/brave.exe',
    // headless: true,
    slowMo: 250, // slow down by 250ms
    // devtools: true,
    defaultViewport: null
  };
  private url = '';
  private selector = '';

  constructor() { }

  async getPageHtml(pUrl, pSelector) {
    this.url = pUrl;
    this.selector = pSelector;
    return await this.openBrowser();
  }

  private async openBrowser() {
    let browser;
    let returnHtml;
    try {
      const StealthPlugin = require('puppeteer-extra-plugin-stealth');
      puppeteer.use(StealthPlugin());
      browser = await puppeteer.launch(this.puppeteerOptions);
      const page = await browser.newPage();
      // await page.setViewport({
      //   width: 1920,
      //   height: 1000,
      //   deviceScaleFactor: 1,
      // });
      // console.log('Browser has ' + (await browser.pages()).length + ' pages');

      await page.goto(this.url, { waitUntil: 'domcontentloaded' });

      console.log('waiting for selector ' + this.selector);

      await page.waitForSelector(this.selector);

      returnHtml = await page.content();
      // returnHtml = await page.evaluate(() => document.documentElement.outerHTML);
    } catch (error) {
      console.error('Error while scraping job listings:');
      console.error(error);
    }

    await browser.close();

    return returnHtml;
  }
}
