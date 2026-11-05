const{test,expect,request} = require('@playwright/test');

const loginPayLoad = {"userEmail":"parthi@yahoo.com","userPassword":"Password@1"};
let loginToken;

test.beforeAll(async()=>{
const apiContext = await request.newContext();
const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:loginPayLoad});
const loginResposeJson = await loginResponse.json();
loginToken = loginResposeJson.token;
console.log(loginResposeJson);

})

test('practiceDemo',async({page})=>{


    await page.addInitScript(value=>{window.localStorage.setItem('token',value)},loginToken);
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.pause();



})