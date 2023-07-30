const { scrapeItems } = require('../scraping-data/scraper')
const scrapers = require('./scraper')
const fs = require('fs')

const scrapeController = async (browserInstance) => {
    const url = 'https://printify.com/app/products/'
    try {
        let browser = await browserInstance
        catalogs = await scrapers.scrapeCatalog(browser, url)
       // console.log(catalogs)
        for (catalog of catalogs) {
            items = await scrapeItems(browser,catalog.link)
            for (item of items) {
                Pages  = await scrapers.scrapePages(browser,item.link)
                console.log(Pages.length)
            }
           // console.log(items)
        }
        await browser.close()
    } catch (e) {
        console.log('Lỗi ở scrape controller: ' + e);
    }
}

module.exports = scrapeController