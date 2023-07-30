const startBrowser = require('./browser')
const scrapeController = require('./scrapeController.js')

let browser = startBrowser()
scrapeController(browser)