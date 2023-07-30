const scrapeCatalog = (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let page = await browser.newPage()
        //page.setDefaultNavigationTimeout(60000);
        console.log('>> Mở tab mới ...');
        await page.goto(url)
        console.log('>>Truy cập vào ' + url)
       // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        await page.waitForSelector('#appShell');
        console.log('>> Website đã load xong...');

        let dataCatalog = await page.$$eval('div.content-container > ng-component > div > div > pfa-catalog > div > pfa-catalog-promo > pfa-catalog-categories > div > div', els => {
            dataCatalog = els.map(el => {
                return {
                    catalog: el.querySelector('h3').textContent.trim(),
                    link: el.querySelector('a').href
                };
            });
            dataCatalog.pop();
            return dataCatalog;
        });

        await page.close()
        console.log('>> Tab đã đóng.');
        resolve(dataCatalog)

    } catch (error) {
        console.log('lỗi ở scrape category: ' + error)
        reject(error)
    }
})
const scrapeItems = (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let page = await browser.newPage()
       // page.setDefaultNavigationTimeout(60000);
        console.log('>> Mở tab mới ...');
        await page.goto(url)
        console.log('>>Truy cập vào ' + url)
      //  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        await page.waitForSelector('#appShell');
        console.log('>> Website đã load xong...');

        let dataItem = await page.$$eval('div.content-container > ng-component > div > div > pfa-catalog > div > pfa-catalog-main-categories > div > pfa-catalog-categories > div > div', els => {
            dataItem = els.map(el => {
                return {
                    item: el.querySelector('h3').textContent.trim(),
                    link: el.querySelector('a').href
                }
            })
            return dataItem
        })
        await page.close()
        console.log('>> Tab đã đóng.');
        //  console.log(dataCategory)
        resolve(dataItem)

    } catch (error) {
        console.log('lỗi ở scrape item: ' + error)
        reject(error)
    }
})
const scrapeProducts = (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let page = await browser.newPage()
     //   page.setDefaultNavigationTimeout(60000);
        console.log('>> Mở tab mới ...');
        await page.goto(url)
        console.log('>>Truy cập vào ' + url)
        
      //  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        await page.waitForSelector('#appShell');
        console.log('>> Website đã load xong...');

        let dataProduct = await page.$$eval('div.content-container > ng-component > div > div > pfa-catalog > div > pfa-catalog-products > div.grid > div.page-content.col--12.col--sm-8.col--md-9 > ul > li', els => {
            dataProduct = els.map(el => {
                return {
                    link: el.querySelector('a').href
                }
            })
            return dataProduct
        })
        await page.close()
        console.log('>> Tab đã đóng.');
        //  console.log(dataCategory)
        resolve(dataProduct)

    } catch (error) {
        console.log('lỗi ở scrape product: ' + error)
        reject(error)
    }
})
module.exports = {
    scrapeCatalog,
    scrapeItems,
    scrapeProducts
};