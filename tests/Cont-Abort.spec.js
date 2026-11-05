const { test, expect, request } = require("@playwright/test");


test('Continue', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    const UserName = await page.locator('#userEmail').fill('parthi@yahoo.com');
    const Pwd = await page.locator('#userPassword').fill('Password@1');
    const Login = await page.locator("input[value='Login']").click();

    await page.locator("button[routerlink*='/dashboard/myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",

        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6aac1ea42be7a4bc2b562abc" })
    )
    await page.locator("button:has-text('View')").first().click();
    const message = await page.locator("p.blink_me").textContent();
    console.log(message);

    await expect(page.locator("p.blink_me")).toHaveText("You are not authorize to view this order");
    await page.pause();
})

test.only('Abort', async ({page}) => {
    // await page.route("**/*.css", route=>route.abort());
    // await page.route("**/*.{jpg,png,jpeg}", route => route.abort());

     page.on("request", request=> console.log(request.url()));
     //console.log("     ===============================================    ");
     page.on("response", response=> console.log(response.url(),response.status()));

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    const UserName = await page.locator('#userEmail').fill('parthi@yahoo.com');
    const Pwd = await page.locator('#userPassword').fill('Password@1');
    const Login = await page.locator("input[value='Login']").click();
})