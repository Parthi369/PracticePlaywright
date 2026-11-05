''
//import
const {test, expect} = require("@playwright/test");
const { count } = require("node:console");
const { promiseHooks } = require("node:v8");

//method

//test.describe.configure({mode:"parallel"});

test('First Playwright testcase',{tag:["@Smoke","@reg"]}, async({browser})=>{

const Context = await browser.newContext();
const page = await Context.newPage();
const UserName = page.locator('#username');
const Pwd = page.locator("[name='password']");
const SignIn = page.locator("#signInBtn");
const CartTitle = page.locator('.card-title a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    console.log(await page.title());
    await UserName.fill("rahulshettyacademy");
    await Pwd.fill('qwdwdfw');
    await SignIn.click();
     //await page.pause();
     //console.log(await page.locator("[style='display: block;']").textContent());
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('   Incorrect  ');

     await Pwd.fill('');
     await Pwd.fill('Learning@830$3mK2');
     await SignIn.click();
  //div.card-body
   //await page.waitForLoadState('networkidle');
    await CartTitle.first().waitFor();
    console.log(await CartTitle.allTextContents()); 
    

})

test('Page Test', async({page})=>{

const UserName = page.locator('#username');
const Pwd = page.locator("[name='password']");
const SignIn = page.locator("#signInBtn");
const dropdown =   await page.locator('select.form-control');
const doumentlink = await page.locator("[href*='request']");

await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    console.log(await page.title());
    await UserName.fill("rahulshettyacademy");
    await Pwd.fill('Learning@830$3mK2');
    //await dropdown.selectOption('consult');
    //await page.locator('span.radiotextsty').last().click();
    //await page.locator('button#okayBtn').click();
    //console.log(await page.locator('span.radiotextsty').last().isChecked);
    //await expect(page.locator('span.radiotextsty').last()).toBeChecked();
    //await page.locator('#terms').check();
    //await expect(page.locator('#terms')).toBeChecked();
    //await page.locator('#terms').uncheck();
    //await expect(await page.locator('#terms').isChecked()).toBeFalsy();


     await expect (doumentlink).toHaveAttribute("class","blinkingText");

    //await page.pause();


})


test('Window Handling',async({browser})=>{

const Context = await browser.newContext();
const page = await Context.newPage();
const UserName = page.locator('#username');
const Pwd = page.locator("[name='password']");
const SignIn = page.locator("#signInBtn");
//const dropdown =   await page.locator('select.form-control');
const doumentlink = await page.locator("[href*='request']");
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await UserName.fill("rahulshettyacademy");
    await Pwd.fill('Learning@830$3mK2');
    const[newPage] = await Promise.all([

        Context.waitForEvent('page'),
        doumentlink.click()
    ])
    
  const text = await newPage.locator('p.red').textContent();
    //console.log(text);
    const arraytext = text.split("@");
    const domain = arraytext[1].split(" ")[0];
    console.log(domain);
    await UserName.fill(domain);
    await page.pause();

}
)

test('Demo test',async({page})=> {

    await page.goto('https://ndemosfa.mavens-i.com/');
    console.log(await page.title()) ;
    //await expect(page).toHaveTitle('Companion')
  // await expect(page).toHaveURL("https://ndemosfa.mavens-i.com/");
 await page.locator('#email').fill('admin1');
 await page.locator('#password').fill('Vibranz@123');
 await page.locator("[type='button']").click();
 await page.locator(".collapse-button").nth(1).click();
 await page.locator("[placeholder='Search']").fill("Customer Group Maintenance");
 await page.locator("mark:has-text('Customer Group Maintenance')").click();
 //console.log(await page.locator('.toast-container').textContent());
//await page.locator('.btnIconText').click();
await page.locator('.ng-clear-wrapper').click();
await page.locator("[role='combobox']").nth(0).fill('TESTSE');
await page.locator("[role='option']");
await page.getByText('TESTSE-TESTSE').click();
await page.locator("[type='submit']").click();



})

test('Practice', async({page})=>{

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