const{test,expect,request} = require("@playwright/test");
const{BaseAPIUtils} = require('./utils/BaseAPIUtils');

const loginPayLoad = {"userEmail":"parthi@yahoo.com","userPassword":"Password@1"};
const creatOrderPayload = {"orders":[{"country":"Japan","productOrderedId":"6960eac0c941646b7a8b3e68"}]};
const fakeResponse = { "data": [], "messsage": "No Orders" };
let response;

test.beforeAll(async()=>{
const apiContext = await request.newContext();
const apiUtils = new BaseAPIUtils(apiContext,loginPayLoad);
response = await apiUtils.createOrder(creatOrderPayload);
})

test.only('API_Fetch', async({page})=>{

await page.addInitScript(value=>{window.localStorage.setItem('token',value)},response.token);
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",

async route => {

    const response = await page.request.fetch(route.request());
    let body = JSON.stringify(fakeResponse);
    route.fulfill({
            response,
            body
        })
})

await page.locator("button[routerlink*='/dashboard/myorders']").click();
//To wait for the specific response
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

const message = await page.locator("div.mt-4").textContent();
console.log(message);

})  