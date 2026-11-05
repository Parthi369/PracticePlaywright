

class BaseAPIUtils{

    constructor(apiContext,loginPayLoad){

        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad; 
    }

async getToken(){
  
 const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:this.loginPayLoad});
 const loginResposeJson = await loginResponse.json();
 const tokenExtracted = loginResposeJson.token;
 console.log(tokenExtracted);
 return  tokenExtracted;
}

async createOrder(creatOrderPayload){

    let response={};

    response.token= await this.getToken();

    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {data:creatOrderPayload,
    headers:{
    'authorization': response.token,
    'content-type':'application/json',
    }}
)
const orderJson = await orderResponse.json();
console.log(orderJson);
const orderId = orderJson.orders[0];

response.orderId= orderId;

return response;
}
}

module.exports = {BaseAPIUtils};