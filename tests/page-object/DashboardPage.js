class DashboardPage {

    constructor(page) {

        this.Products = page.locator("div.card-body");
        this.ProdName = page.locator('div.card-body b');
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProduct(Target) {

        await this.ProdName.first().waitFor();
        await this.ProdName.allTextContents();

        //Print the Product Name
        console.log(this.ProdName);
        const ProdCount = await this.Products.count();
        //Print the Product Count
        console.log(ProdCount);

        for (let i = 0; i < ProdCount; i++) {
            const ProductText = await this.Products.locator("b").nth(i).textContent();
            console.log(ProductText);

            if (ProductText === Target) {
                // Add the Targeted Product
                await this.Products.nth(i).locator('text=  Add To Cart').click();
                break;
            }
        }

    }

    async navigate() {

        await this.cart.click();
    }
}
module.exports = { DashboardPage };