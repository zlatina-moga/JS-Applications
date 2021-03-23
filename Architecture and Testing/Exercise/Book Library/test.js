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

    it('loads books', async () => {
        await page.goto('http://localhost:3000');
        await page.click('#loadBooks');
        await page.waitForSelector('tbody tr td');

        const firstBookTitle = await page.$eval('tbody tr:first-child :first-child', (el) => el.textContent.trim());
        const firstBookAuthor = await page.$eval('tbody tr:first-child :nth-child(2)', (el) => el.textContent.trim());

        const secondBookTitle = await page.$eval('tbody :nth-child(2) :first-child', (el) => el.textContent.trim());
        const secondBookAuthor = await page.$eval('tbody :nth-child(2) :nth-child(2)', (el) => el.textContent.trim());

        expect(firstBookTitle).to.eql('Harry Potter and the Philosopher\'s Stone')
        expect(firstBookAuthor).to.eql('J.K.Rowling')
        expect(secondBookTitle).to.eql('C# Fundamentals')
        expect(secondBookAuthor).to.eql('Svetlin Nakov')

    })

    it('adds books', async () => {
        await page.fill('#createForm [name="title"]', 'AAA');
        await page.fill('#createForm [name="author"]', '111');
        await page.click('text=Submit');
        await page.click('#loadBooks');
        await page.waitForSelector('tbody tr td');

        const newBookTitle = await page.$eval('tbody tr:last-child :first-child', (el) => el.textContent.trim());
        const newBookAuthor = await page.$eval('tbody tr:last-child :nth-child(2)', (el) => el.textContent.trim());

        expect(newBookTitle).to.eql('AAA');
        expect(newBookAuthor).to.eql('111');
    })

    it('edits books', async () => {
        await page.click('#loadBooks');
        await page.waitForSelector('.editBtn');

        await page.click('tbody tr:last-child .editBtn');
        await page.waitForSelector('#editForm');

        await page.evaluate(() => document.getElementById('editForm').reset());

        await page.fill('#editForm [name="title"]', 'BBB');
        await page.fill('#editForm [name="author"]', '222');
        await page.click('text=Save');
        await page.click('#loadBooks');
        await page.waitForSelector('tbody tr td');

        const editedBookTitle = await page.$eval('tbody tr:last-child :first-child', (el) => el.textContent.trim());
        const editedBookAuthor = await page.$eval('tbody tr:last-child :nth-child(2)', (el) => el.textContent.trim());

        expect(editedBookTitle).to.eql('BBB');
        expect(editedBookAuthor).to.eql('222');
    })

    it('deletes books', async () => {
        await page.click('#loadBooks');

        page.on('dialog', (dialog) => {
            dialog.accept();
        });

        await page.click('tbody tr:last-child .deleteBtn');
        await page.click('#loadBooks');
        await page.waitForSelector('tbody tr td');

        const firstBook = await page.$eval('tbody tr:last-child :first-child', (el) => el.textContent.trim());
        const firstBookAuthor = await page.$eval('tbody tr:last-child :nth-child(2)', (el) => el.textContent.trim());

        expect(firstBook).to.eql('C# Fundamentals');
        expect(firstBookAuthor).to.eql('Svetlin Nakov');
    })
})