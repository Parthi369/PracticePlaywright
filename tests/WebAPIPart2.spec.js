const{test,expect,request} = require("@playwright/test");

let webContext;

test.beforeAll(async({browser})=>{

const context = await browser.newContext();
const page = await context.newPage();
await page.goto ('https://rahulshettyacademy.com/client/#/auth/login');
 const UserName = await page.locator('#userEmail').fill('parthi@yahoo.com');
 const Pwd = await page.locator('#userPassword').fill('Password@1');
 const Login = await page.locator("input[value='Login']").click();

 await page.waitForLoadState('networkidle');
 await context.storageState({path:'state.json'});
webContext = await browser.newContext({storageState:'state.json'});

})

test.only('API Part2', async({})=>{

 const page = await webContext.newPage();

//await page.addInitScript(value=>{window.localStorage.setItem('token',value)},tokenExtracted);

await page.goto ('https://rahulshettyacademy.com/client/#/auth/login');

//await page.goto ('https://rahulshettyacademy.com/api/ecom/order/create-order');

await page.pause();


const Products = await page.locator("div.card-body");
const Target = "ZARA COAT 3";
await page.locator('div.card-body b').first().waitFor();

const ProdName = await page.locator('div.card-body b').allTextContents();
//Print the Product Name
console.log(ProdName);
const ProdCount = await Products.count();
//Print the Product Count
console.log(ProdCount);

for(let i=0; i<ProdCount; i++)
{
//console.log (await page.locator('div.card-body b').nth(i).textContent());

const ProductText = await Products.locator("b").nth(i).textContent();
console.log(ProductText);

if(ProductText == Target )
{
// Add the Targeted Product
await Products.nth(i).locator('text=  Add To Cart').click();
break;
}
}

await page.locator("[routerlink*='cart']").click();
await page.locator("div.cart li").first().waitFor();

const bool = await page.locator("h3:text-is('ZARA COAT 3')").isVisible();

 expect(bool).toBeTruthy();

await page.locator("button:text-is('Checkout')").click();
await page.locator("[placeholder*='Select']").pressSequentially("Ind");


const DynamicDropdown = await page.locator('section.ta-results');

await DynamicDropdown.waitFor();

const DropownNames = await page.locator('section.ta-results button').allTextContents();

console.log(DropownNames);

const Options = await DynamicDropdown.locator("button").count();

console.log(Options);

for(let i=0; i<Options; i++){

    const text = await DynamicDropdown.locator("button").nth(i).textContent();

    if(text == " India")
    {

     await  DynamicDropdown.locator("button").nth(i).click();

     break;
    }
}

await page.locator("[type='text']").nth(1).fill('123');
await page.locator("[type='text']").nth(2).fill('Parthi');
await expect (page.locator('div.user__name label')).toHaveText("parthi@yahoo.com");

await page.locator('a.btnn').click();


//await page.pause();



await expect(page.locator("h1.hero-primary")).toHaveText(" Thankyou for the order. ");
const orderId = await page.locator("label.ng-star-inserted").textContent();
console.log(orderId);
 

await page.locator("button[routerlink*='/dashboard/myorders']").click();
 
await page.locator("tbody").waitFor();
 
const rows = page.locator("tbody tr");
 
const rowscount = await rows.count();
console.log(rowscount);
 
for(let i=0; i<rowscount; i++){
 
    const RowOrderId = await rows.locator("th").nth(i).textContent();
 
    //console.log(RowOrderId);
 
    if(orderId.includes(RowOrderId)){
 
        await rows.nth(i).locator("button").first().click();
        break;
    }
 }
const OrderIdDetails =  await page.locator("div.col-text").textContent();
console.log(OrderIdDetails);
await expect(orderId.includes(OrderIdDetails)).toBeTruthy();
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