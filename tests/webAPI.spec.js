const{test,expect,request} = require("@playwright/test");
const{BaseAPIUtils} = require('./utils/BaseAPIUtils');

const loginPayLoad = {"userEmail":"parthi@yahoo.com","userPassword":"Password@1"};
const creatOrderPayload = {"orders":[{"country":"Japan","productOrderedId":"6960eac0c941646b7a8b3e68"}]};
let response;

//let tokenExtracted;
//let orderId;

test.beforeAll(async()=>{
const apiContext = await request.newContext();
const apiUtils = new BaseAPIUtils(apiContext,loginPayLoad);
response = await apiUtils.createOrder(creatOrderPayload);

//=================
// const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:loginPayLoad});
// expect(loginResponse.ok()).toBeTruthy();
// const loginResposeJson = await loginResponse.json();
// tokenExtracted = loginResposeJson.token;
// console.log(tokenExtracted);

// const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
//     {data:creatOrderPayload,
//     headers:{

//     'authorization':tokenExtracted,
//     'content-type':'application/json',
//     }}
// )
// const orderJson = await orderResponse.json();
// console.log(orderJson);
// orderId = orderJson.orders[0];
//=======================================

})



test.only('Practice', async({page})=>{


await page.addInitScript(value=>{window.localStorage.setItem('token',value)},response.token);

await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

//await page.goto ('https://rahulshettyacademy.com/api/ecom/order/create-order');

//await page.pause();

// const UserName = await page.locator('#userEmail').fill('parthi@yahoo.com');
// const Pwd = await page.locator('#userPassword').fill('Password@1');
// const Login = await page.locator("input[value='Login']").click();

//await expect(page.locator("h1.hero-primary")).toHaveText(" Thankyou for the order. ");
//const orderId = await page.locator("label.ng-star-inserted").textContent();
//console.log(orderId);
 
await page.locator("button[routerlink*='/dashboard/myorders']").click();
 
await page.locator("tbody").waitFor();
 
const rows = page.locator("tbody tr");
 
const rowscount = await rows.count();
console.log(rowscount);
 
for(let i=0; i<rowscount; i++){
 
    const RowOrderId = await rows.locator("th").nth(i).textContent();
 
    //console.log(RowOrderId);
 
    if(response.orderId.includes(RowOrderId)){
 
        await rows.nth(i).locator("button").first().click();
        break;
    }
 }
const OrderIdDetails =  await page.locator("div.col-text").textContent();
console.log(OrderIdDetails);
await expect(response.orderId.includes(OrderIdDetails)).toBeTruthy();
//await page.locator("button:text-is('India')").click();
//const ResultBox = await page.locator('section.ta-results span'); ==>1
//const ResultBox = await page.locator('button.ta-item').filter({hasText:'India'}).click();
//await ResultBox.locator("span:hasText('India')").click();
//const ResultList = await page.locator('[type="button"]').count();
//console.log(ResultBox);
await page.pause();
})

test('InbuiltLocator',async({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').click();
    await page.getByLabel('Gender').selectOption("Female");

    await page.getByPlaceholder('Password').fill("1233")
    await page.getByRole("button",{name:"submit"}).click();
    
    const textVisible = await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    console.log(textVisible);

    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button",{name:"Add "}).click();

    await page.pause();



})