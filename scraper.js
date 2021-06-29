const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();
    await page.goto(url);

    const [el1] = await page.$x('//*[@id="productTitle"]');
    const src1 = await el1.getProperty('textContent');
    let title = await src1.jsonValue();
    title = title.trim();

    const [elementDescription] = await page.$x('//*[@id="productDescription"]');
    const srcDescription = await elementDescription.getProperty('textContent');
    let description = await srcDescription.jsonValue();
    description = description.replace(/[\n\r]/g, '');
    
    const [elementBullet1] = await page.$x('//*[@id="feature-bullets"]/ul/li[1]/span');
    const srcBullet1 = await elementBullet1.getProperty('textContent');
    let bulletPoint1 = await srcBullet1.jsonValue();
    bulletPoint1 = bulletPoint1.replace(/[\n\r]/g, '');
    
    const [elementBullet2] = await page.$x('//*[@id="feature-bullets"]/ul/li[2]/span');
    const srcBullet2 = await elementBullet2.getProperty('textContent');
    let bulletPoint2 = await srcBullet2.jsonValue();
    bulletPoint2 = bulletPoint2.replace(/[\n\r]/g, '');
    
    const [elementBullet3] = await page.$x('//*[@id="feature-bullets"]/ul/li[3]/span');
    const srcBullet3 = await elementBullet3.getProperty('textContent');
    let bulletPoint3 = await srcBullet1.jsonValue();
    bulletPoint3 = bulletPoint3.replace(/[\n\r]/g, '');
    
    const [elementBullet4] = await page.$x('//*[@id="feature-bullets"]/ul/li[4]/span');
    const srcBullet4 = await elementBullet4.getProperty('textContent');
    let bulletPoint4 = await srcBullet1.jsonValue();
    bulletPoint4 = bulletPoint4.replace(/[\n\r]/g, '');

    const [elementBullet5] = await page.$x('//*[@id="feature-bullets"]/ul/li[5]/span');
    const srcBullet5 = await elementBullet5.getProperty('textContent');
    let bulletPoint5 = await srcBullet5.jsonValue();
    bulletPoint5 = bulletPoint5.replace(/[\n\r]/g, '');

    // images

    const [img1] = await page.$x('//*[@id="main-image-container"]/ul/li[1]/span/span/div/img');
    const srcImg1 = await img1.getProperty('src');
    const img1URL = await srcImg1.jsonValue();

    let pic = 0;
    let nextImage = '';
    otherImgs = [];
    for (pic = 4; pic < 9; pic++ ) {
        const [click1] = await page.$x(`//*[@id="a-autoid-${String(pic)}"]/span/input`);
        await click1.click();
                
        const [img2] = await page.$x('//*[@id="main-image-container"]/ul');
        //const srcImg2 = await img2.getProperty('src');
        //nextImage = await srcImg2.jsonValue();
        const data = await img2.evaluate( () => {
            const images = document.querySelector('#main-image-container');
            const imagesImages = images.querySelectorAll('img');
            const urls = Array.from(imagesImages).map(v => v.src);
            return urls;
        });

        otherImgs.push(data[0]);
    };
 

    console.log({title, description, bulletPoint1, bulletPoint2, bulletPoint3, bulletPoint4, bulletPoint5, img1URL, otherImgs});
//*[@id="main-image-container"]/ul/li[5]/span/span/div/img
//*[@id="main-image-container"]/ul/li[5]/span/span/div/img
//*[@id="main-image-container"]/ul/li[5]/span/span/div
//*[@id="a-autoid-8"]/span/input
//*[@id="main-image-container"]/ul/li[5]/span/span/div/img
//*[@id="main-image-container"]
//*[@id="a-autoid-8"]/span/input
//*[@id="a-autoid-8"]/span/input
//*[@id="main-image-container"]/ul/li[5]/span/span/div/img
//*[@id="a-autoid-8"]/span/input
//*[@id="a-autoid-9"]/span/input
//*[@id="a-autoid-8"]/span/input
//*[@id="a-autoid-8"]/span/input
//*[@id="main-image-container"]/ul/li[5]/span/span/div/img
// /html/body/div[2]/div[3]/div[8]/div[4]/div[3]/div[1]/div[1]/div/div/div[1]/ul/li[9]/span/span/span/input
// /html/body/div[2]/div[3]/div[8]/div[4]/div[3]/div[1]/div[1]/div/div/div[2]/div[1]/div[1]/ul/li[5]/span/span/div/img
//*[@id="main-image-container"]/ul/li[5]/span/span/div/img
//*[@id="a-autoid-5"]/span/input
//*[@id="a-autoid-4"]/span/input
//*[@id="a-autoid-5"]/span/input
//*[@id="a-autoid-5-announce"]
//*[@id="a-autoid-4"]/span/input
//*[@id="a-autoid-5"]/span/input
//*[@id="a-autoid-5"]/span/input
//*[@id="main-image-container"]/ul/li[9]/span/span/div/img
//*[@id="main-image-container"]/ul/li[7]/span/span/div/img
//*[@id="main-image-container"]/ul/li[9]
//#main-image-container > ul > li.image.item.itemNo0.maintain-height.selected
//#main-image-container > ul > li.image.item.itemNo2.maintain-height.selected > span > span > div > img
//*[@id="main-image-container"]/ul/li[5]/span/span/div/img
//*[@id="main-image-container"]/ul/li[7]/span/span/div/img

    browser.close();
};

//scrapeProduct('https://www.amazon.com/dp/B07PY8G7PT/');
scrapeProduct('https://www.amazon.com/dp/B08TQJ7W4D');
