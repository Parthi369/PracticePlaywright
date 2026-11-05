class LoginPage {

    constructor(page) {

        this.page = page;
        this.UserName = page.locator('#userEmail');
        this.Pwd = page.locator('#userPassword');
        this.SignInBtn = page.locator("input[value='Login']");
    }

    async launchUrl() {

        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    }

    async signIn(userName,pwd) {
        await this.UserName.fill(userName);
        await this.Pwd.fill(pwd);
        await this.SignInBtn.click();


    }

}
module.exports = { LoginPage };
