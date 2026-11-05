
const { expect } = require("@playwright/test");

class OrderReviewPage {

    constructor(page) {
        this.page = page;
        this.countryfield = page.locator("[placeholder*='Select']");
        this.dynamicdropdown = page.locator('section.ta-results');
        this.dropdownresult = page.locator('section.ta-results button');
        this.cvvfield = page.locator("[type='text']").nth(1);
        this.cardname = page.locator("[type='text']").nth(2);
        //this.monthfield = page.locator("div.field select").first();
        //this.datefield = page.locator("div.field select").last();
        this.emailLable = page.locator('div.user__name label');
        this.placeorderbutton = page.locator('a.btnn');
        this.confirmationText = page.locator("h1.hero-primary");
        this.orderID = page.locator("label.ng-star-inserted");
    }

    async searchCountryAndSelect() {
        await this.countryfield.pressSequentially("Ind");

        //const DynamicDropdown = await page.locator('section.ta-results');

        await this.dynamicdropdown.waitFor();
        const DropownNames = this.dropdownresult.allTextContents();
        console.log(DropownNames);

        const Options = await this.dynamicdropdown.locator("button").count();

        console.log(Options);

        for (let i = 0; i < Options; i++) {

            const text = await this.dynamicdropdown.locator("button").nth(i).textContent();

            if (text == " India") {

                await this.dynamicdropdown.locator("button").nth(i).click();

                break;
            }
        }


        await this.cvvfield.fill('123');
        await this.cardname.fill('Parthi');

        //await this.datefield.selectOption("06");
        //await this.monthfield.selectOption("28");
    }

    async verifyEmail(userName) {

        await expect(this.emailLable).toHaveText(userName);

    }

    async SubmitAndGetOrderId() {

        await this.placeorderbutton.click();

        await expect(this.confirmationText).toHaveText(" Thankyou for the order. ");

        return await this.orderID.textContent();

    }

  
}
module.exports = { OrderReviewPage };