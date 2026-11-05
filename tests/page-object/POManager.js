
const{LoginPage} = require("./LoginPage");
const{DashboardPage} = require("./DashboardPage");
const{CreatPage} = require("./CreatPage");
const{OrderReviewPage} =require("./OrderReviewPage");
const{OrderHistoryPage} = require("./OrderHistoryPage");

class POManager{

    constructor(page){
        this.page = page;
        this.LoginPage = new LoginPage(page);
        this.DashboardPage= new DashboardPage(page);
        this.Creatpage = new CreatPage(page);
        this.OrderReviewPage = new OrderReviewPage(page);
        this.OrderHistoryPage = new OrderHistoryPage(page);

    }

    getLoginPage(){
        return this.LoginPage;
    }

    getDashBoard(){
        return this.DashboardPage;
    }

    getCreatPage(){
        return this.Creatpage;
    }
    getOrderReviewPage(){
        return this.OrderReviewPage;

    }

    getOrderHistoryPage(){
        return this.OrderHistoryPage
    }
    
}

module.exports = {POManager};
