const { test, expect } = require("@playwright/test");
const { POManager } = require("./page-object/POManager");
const { CustomTest } = require("./utils/test_CustomBase");
const dataset = JSON.parse(JSON.stringify(require('./utils/Client-app-op-test-data.json')));

for(const data of dataset){
test(`E2E_PO ${data.Target}`, async ({ page }) => {

    //Create Object for POManager
    const PageObjectManager = new POManager(page);

    //Login
    //const userName = "parthi@yahoo.com";
    //const pwd = 'Password@1';

    const LoginUI = PageObjectManager.getLoginPage();
    await LoginUI.launchUrl();
    await LoginUI.signIn(data.userName, data.pwd);

    //Dashboard
    //const Target = "ZARA COAT 3";
    const DashboardUI = PageObjectManager.getDashBoard();
    await DashboardUI.searchProduct(data.Target);
    await DashboardUI.navigate();
    const CreatPageUI = PageObjectManager.getCreatPage();
    await CreatPageUI.verifyProductIsDisplayed(data.Target);
    await CreatPageUI.checkout();


    const OrderReviewUI = PageObjectManager.getOrderReviewPage();
    await OrderReviewUI.searchCountryAndSelect();
    await OrderReviewUI.verifyEmail(data.userName);
    const orderId = await OrderReviewUI.SubmitAndGetOrderId();

    const OrderHistoryUI = PageObjectManager.getOrderHistoryPage();
    await OrderHistoryUI.searchOrder(orderId);
    const OrderIdDetails = await OrderHistoryUI.getOrderID();

    expect(orderId.includes(OrderIdDetails)).toBeTruthy();


    //await page.pause();


})
}

CustomTest.only('@Smoke E2E_PO', async ({page,testDataForOrder}) => {

    //Create Object for POManager
    const PageObjectManager = new POManager(page);

    //Login
    //const userName = "parthi@yahoo.com";
    //const pwd = 'Password@1';

    const LoginUI = PageObjectManager.getLoginPage();
    await LoginUI.lunchUrl();
    await LoginUI.signIn(testDataForOrder.userName, testDataForOrder.pwd);

    //Dashboard
    //const Target = "ZARA COAT 3";
    const DashboardUI = PageObjectManager.getDashBoard();
    await DashboardUI.searchProduct(testDataForOrder.Target);
    await DashboardUI.navigate();
    const CreatPageUI = PageObjectManager.getCreatPage();
    await CreatPageUI.verifyProductIsDisplayed(testDataForOrder.Target);
    await CreatPageUI.checkout();


    const OrderReviewUI = PageObjectManager.getOrderReviewPage();
    await OrderReviewUI.searchCountryAndSelect();
    await OrderReviewUI.verifyEmail(testDataForOrder.userName);
    const orderId = await OrderReviewUI.SubmitAndGetOrderId();

    const OrderHistoryUI = PageObjectManager.getOrderHistoryPage();
    await OrderHistoryUI.searchOrder(orderId);
    const OrderIdDetails = await OrderHistoryUI.getOrderID();

    expect(orderId.includes(OrderIdDetails)).toBeTruthy();


    await page.pause();


})

