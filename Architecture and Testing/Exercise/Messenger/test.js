const {chromium} = require('playwright-chromium');
const {expect} = require('chai');

let browser, page;
describe('E2E tests', function () {
    before(async () => {
        browser = await chromium.launch(); 
    });
    after(async () => {
        await browser.close();
    })
    beforeEach(async () => {
        page = await browser.newPage();
    })
    afterEach(async () => {
        await page.close();
    })

    it('loads and displays messages', async () => {
        await page.goto('http://localhost:3000');
        await page.click('#refresh');

        const messages = await page.$eval('#messages', (m) => m.value.split('\n'));
        
        expect(messages[0]).to.equal('Spami: Hello, are you there?');
        expect(messages[1]).to.equal('Garry: Yep, whats up :?');
        expect(messages[2]).to.equal('Spami: How are you? Long time no see? :)');
        expect(messages[3]).to.equal('George: Hello, guys! :))');
        expect(messages[4]).to.equal('Spami: Hello, George nice to see you! :)))');
    })

    it ('sends messages',  async () => {
        await page.goto('http://localhost:3000');
        
        await page.fill('#author', 'Author')
        await page.fill('#content', 'Message...');

        await page.click('#submit');
        await page.click('#refresh');

        const messages = await page.$eval('#messages', (m) => m.value.split('\n'));
        expect (messages[5]).to.equal('Author: Message...')
    })
})
