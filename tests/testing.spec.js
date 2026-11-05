const{test,expect,request} = require("@playwright/test");

let webContext;

test.beforeAll(async({browser})=>{

const context = await browser.newContext();
const page = await context.newPage();
await page.goto ('https://nmeridian.mavens-i.com/');
const userName = await page.getByLabel('Username').fill('admin1')
const Pwd = await page.getByLabel('Password').fill('meridian@2026');
const Login = await page.getByRole('button',{name:'Login'}).click();

 await page.waitForLoadState('networkidle');
 await context.storageState({path:'state2.json'});
webContext = await browser.newContext({storageState:'state2.json'});
})

test.only('API Part2', async({})=>{

 const page = await webContext.newPage();

//await page.addInitScript(value=>{window.localStorage.setItem('token',value)},tokenExtracted);

await page.goto('https://nmeridian.mavens-i.com/');

const Title = page.title();

console.log(Title);



//await page.goto ('https://rahulshettyacademy.com/api/ecom/order/create-order');

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