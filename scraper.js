const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty('src');
    const imgURL = await src.jsonValue();

    const [el1] = await page.$x('//*[@id="productTitle"]');
    const src1 = await el1.getProperty('textContent');
    let title = await src1.jsonValue();
    title = title.trim();

    const [el2] = await page.$x('//*[@id="newBuyBoxPrice"]');
    const src2 = await el2.getProperty('textContent');
    const price = await src2.jsonValue();
    
    console.log({imgURL, title, price});

    browser.close();
};

scrapeProduct('https://www.amazon.com/ARTEZA-Tempera-Non-Toxic-Washable-Painting/dp/B07H4XH6CV?ref_=Oct_DLandingS_D_02bdf6ea_71&smid=AWRV0GG7LZ2DD');
