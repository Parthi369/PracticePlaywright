const { Given, When, Then } = require('@cucumber/cucumber');
//const { POManager } = require("../../page-object/POManager");
const { POManager } = require("../../tests/page-object/POManager");
const { test, expect, chromium } = require("@playwright/test");


Given('Login to the website with {string} and {string}',{timeout:10*1000}, async function (userName, pwd) {
  const browser = await chromium.launch(
    { headless:false}
  );
  const context = await browser.newContext();
  const page = await context.newPage();

  //Create Object for POManager
   this.PageObjectManager = new POManager(page);

  //Login
  //const userName = "parthi@yahoo.com";
  //const pwd = 'Password@1';

  const LoginUI = this.PageObjectManager.getLoginPage();
  await LoginUI.launchUrl();
  await LoginUI.signIn(userName, pwd);

});

When('Add {string} to cart', async function (Target) {
  const DashboardUI = this.PageObjectManager.getDashBoard();
  await DashboardUI.searchProduct(Target);
  await DashboardUI.navigate();


});

Then('Verify the {string} is displayed in the cart', async function (Target) {

  const CreatPageUI = this.PageObjectManager.getCreatPage();
  await CreatPageUI.verifyProductIsDisplayed(Target);
  await CreatPageUI.checkout();
});

When('Enter the vaid details and place the order', async function () {
  const OrderReviewUI = this.PageObjectManager.getOrderReviewPage();
  await OrderReviewUI.searchCountryAndSelect();
  //await OrderReviewUI.verifyEmail(userName);
  this.orderId = await OrderReviewUI.SubmitAndGetOrderId();
  console.log(this.orderId)

  //done();
});

Then('Verify the order is present in the OrderHistory', async function () {

  //await DashboardUI.n

  const OrderHistoryUI = this.PageObjectManager.getOrderHistoryPage();
  await OrderHistoryUI.searchOrder(this.orderId);
  const OrderIdDetails = await OrderHistoryUI.getOrderID();

  expect(this.orderId.includes(OrderIdDetails)).toBeTruthy();
});



//  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

//     console.log(await page.title());
//     await UserName.fill("rahulshettyacademy");
//     await Pwd.fill('qwdwdfw');
//     await SignIn.click();
//      
//  
//     const errorMsg = await page.locator("[style*='block']").textContent();
//     console.log(errorMsg);