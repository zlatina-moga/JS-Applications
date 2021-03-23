const {chromium} = require('playwright-chromium');
const {expect} = require('chai');

let browser, page;
describe('E2E tests', function () {
    before(async () => {
        browser = await chromium.launch(); //{headless: false, slowMo: 500}
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

    it('load titles', async () => {
        await page.goto('http://localhost:3000');
        /*const content = await page.textContent('.accordion .head span');
        expect(content).to.contains('Scalable Vector Graphics')*/

        const titles = await page.$$eval('.accordion .head span', (spans) => spans.map(s => s.textContent));
        expect(titles).includes('Scalable Vector Graphics')
        expect(titles).includes('Open standard')
        expect(titles).includes('Unix')
        expect(titles).includes('ALGOL')
    })

    it('toggles content', async () => {
        await page.goto('http://localhost:3000');
        await page.click('#main>.accordion:first-child >> text=More');
        await page.waitForSelector('#main>.accordion:first-child >> .extra p')
        const visible = await page.isVisible('#main>.accordion:first-child >> .extra p');
        expect(visible).to.be.true;
    })

    it('button functionality', async () => { //.only
        await page.goto('http://localhost:3000');
        await page.click('#main>.accordion:first-child >> text=More');
        await page.waitForSelector('#main>.accordion:first-child >> .extra p')
        await page.click('#main>.accordion:first-child >> text=Less');
        const visible = await page.isVisible('#main>.accordion:first-child >> .extra p');
        expect(visible).to.be.false;
    })
});
