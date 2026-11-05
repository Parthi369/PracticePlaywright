
const {test, expect} = require("@playwright/test");
const { promiseHooks } = require("node:v8");

test.only('Practice', async({page})=>{

await page.goto ('https://rahulshettyacademy.com/client/#/auth/login');


const UserName = await page.locator('#userEmail').fill('parthi@yahoo.com');
const Pwd = await page.locator('#userPassword').fill('Password@1');
const Login = await page.locator("input[value='Login']").click();

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

await expect(bool).toBeTruthy();

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

await page.locator("div.field select").first().selectOption("06");
await page.locator("div.field select").last().selectOption("28");
await page.pause();
await expect (page.locator('div.user__name label')).toHaveText("parthi@yahoo.com");

await page.locator('a.btnn').click();

//expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");

//await page.locator("button:text-is('India')").click();
//const ResultBox = await page.locator('section.ta-results span'); ==>1
//const ResultBox = await page.locator('button.ta-item').filter({hasText:'India'}).click();
//await ResultBox.locator("span:hasText('India')").click();
//const ResultList = await page.locator('[type="button"]').count();
//console.log(ResultBox);


//await page.pause();

await expect(page.locator("h1.hero-primary")).toHaveText(" Thankyou for the order. ");
 
const orderId = await page.locator("label.ng-star-inserted").textContent();
 
console.log(orderId);
 
await page.locator("button[routerlink*='/dashboard/myorders']").click();
 await page.locator("tbody").waitFor();
const rows = page.locator("tbody tr");
 
//const rowscount = await rows.count();
 //console.log(rowscount);
 await rows.nth(0).locator("th").waitFor();
 
for(let i=0; i<await rows.count(); i++){
 const RowOrderId = await rows.locator("th").nth(i).textContent();
 
 console.log(RowOrderId);
 if(orderId.includes(RowOrderId)){
    await rows.nth(i).locator("button").first().click();
    break;
    }

}
const OrderIdDetails =  await page.locator("div.col-text").textContent();


 expect(orderId.includes(OrderIdDetails)).toBeTruthy();
 

await page.pause();


})


test("E2EInbuiltLocator",async({page})=>{

await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

 await page.getByPlaceholder("email@example.com").fill("parthi@yahoo.com");
 await page.getByPlaceholder("enter your passsword").fill("Password@1");
 await page.getByRole("button",).click();

const Target = "ZARA COAT 3";
const Products = page.locator("div.card-body").filter({hasText: Target});
await Products.getByRole("button",{name: ' Add To Cart'}).click();
await page.getByRole("button",{name : '  Cart 1'}).click();
await page.locator("div.cart li").first().waitFor();
const cartItem = await page.getByText(' ZARA COAT 3').isVisible();

 expect(cartItem).toBeTruthy();

await page.getByRole("button",{name:'Checkout'}).click();
await page.getByPlaceholder('Select Country').pressSequentially('Ja');
const dropdwon = page.locator('section.list-group');
await dropdwon.waitFor();
await dropdwon.getByRole('button',{name:' Jamaica'}).click();
await page.getByRole('textbox').nth(1).fill('234');
await page.getByRole('textbox').nth(2).fill('Parthi');
await page.getByRole("combobox").nth(0).selectOption("08");
await page.getByRole("combobox").nth(1).selectOption("28");


await expect(page.getByText('parthi@yahoo.com')).toHaveText('parthi@yahoo.com');


await page.pause();


// await page.locator("div.field select").first().selectOption("06");
// await page.locator("div.field select").last().selectOption("28");
// await page.pause();
// await expect (page.locator('div.user__name label')).toHaveText("parthi@yahoo.com");
// await page.locator('a.btnn').click();
// await expect(page.locator("h1.hero-primary")).toHaveText(" Thankyou for the order. ");
// const orderId = await page.locator("label.ng-star-inserted").textContent();
// console.log(orderId);
 
// await page.locator("button[routerlink*='/dashboard/myorders']").click();
//  await page.locator("tbody").waitFor();
// const rows = page.locator("tbody tr");
 
// //const rowscount = await rows.count();
//  //console.log(rowscount);
//  await rows.nth(0).locator("th").waitFor();
 
// for(let i=0; i<await rows.count(); i++){
//  const RowOrderId = await rows.locator("th").nth(i).textContent();
 
//  console.log(RowOrderId);
//  if(orderId.includes(RowOrderId)){
//     await rows.nth(i).locator("button").first().click();
//     break;
//     }

// }
// const OrderIdDetails =  await page.locator("div.col-text").textContent();


//  expect(orderId.includes(OrderIdDetails)).toBeTruthy();
 

// await page.pause();

})