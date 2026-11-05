Feature: Ecommerce Validation

Scenario: Placing the order

Given Login to the website with "parthi@yahoo.com" and "Password@1"
When Add "ZARA COAT 3" to cart
Then Verify the "ZARA COAT 3" is displayed in the cart
When Enter the vaid details and place the order
Then Verify the order is present in the OrderHistory
