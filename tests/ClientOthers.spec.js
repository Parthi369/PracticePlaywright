const { test, expect } = require('@playwright/test');


test('Visual Testing_1', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const fpwd = await page.getByText('Forgot password?').click();
    await page.locator('div.card').screenshot({ path: "F_Pwd.jpg" });
    await page.goBack();
    const UserName = await page.locator('#userEmail').fill('parthi@yahoo.com');
    const Pwd = await page.locator('#userPassword').fill('Password@1');
    const Login = await page.locator("input[value='Login']").click();

    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/product/get-all-products");
    page.screenshot({ path:"LoginPage.png" });

})

test.only('Visual Testing_2', async ({ page }) =>{

    const Landing = await page.goto("https://www.instagram.com/");
  await page.waitForLoadState('networkidle');
    expect(await page.screenshot()).toMatchSnapshot('LandingPage.png');

})