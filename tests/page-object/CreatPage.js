const { expect } = require("@playwright/test");

class CreatPage {

    constructor(page) {
        this.page = page;
        this.cartList = page.locator("div.cart li").first();
        //this.targetText = page.locator("h3:text-is('ZARA COAT 3')");
        this.cart = page.locator("[routerlink*='cart']");
        this.checkOut = page.locator("button:text-is('Checkout')")
        this.orders = page.locator("button[routerlink*='/dashboard/myorders']");

    }

    async verifyProductIsDisplayed(Target) {
       await this.cartList.waitFor();
        const bool = await this.getProductLocator(Target).isVisible();
        //const bool =await this.getProductLocator(productName).isVisible();
       expect(bool).toBeTruthy(); 
   }

    async checkout() {

        await this.checkOut.click();
      
    }

    getProductLocator(Target){

        return this.page.locator("h3:text-is('"+Target+"')");
        //return this.page.locator(`h3:text-is('${Target}')`);
       
    }
}
module.exports = {CreatPage};