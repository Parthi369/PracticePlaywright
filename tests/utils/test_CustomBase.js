const base = require("@playwright/test");

 exports.CustomTest =  base.test.extend({

    //fixture name
    testDataForOrder:{
    userName: "parthi@yahoo.com",
    pwd: "Password@1",
    Target: "ZARA COAT 3"

}
 })
