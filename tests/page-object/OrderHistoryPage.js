const { expect } = require("@playwright/test");
class OrderHistoryPage{

    constructor(page){
        this.page = page;
        this.myorder = page.locator("button[routerlink*='/dashboard/myorders']");
        this.table = page.locator("tbody");
        this.tableRow = page.locator("tbody tr");
        this.OrderIdDetails = page.locator("div.col-text");


    }
    async searchOrder(orderId){

    await this.myorder.click();
    await this.table.waitFor();
    const rows = this.tableRow;
    await rows.nth(0).locator("th").waitFor();

    for (let i = 0; i < await rows.count(); i++) {
        const RowOrderId = await rows.nth(i).locator("th").textContent();

        console.log(RowOrderId);
        if (orderId.includes(RowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }

    }
    }

      async getOrderID(){

        return await this.OrderIdDetails.textContent();
    }
}

module.exports = {OrderHistoryPage}