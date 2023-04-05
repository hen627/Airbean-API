# Airbean-API
Grupparbete Airbean API Speedy Gardeners

## Endpoints
- ### GET /api/bean
  - get all pruducts

- ### POST /api/bean/order
  - make an order
  
  request:
  ```
  {
    "userId": String,
    "order": [
      {
        "name": String,
        "price": Number
      }
    ]
  }
  ```
  response:
  ```
  {
      "eta": Number,
      "orderNr": String
  }
  ```
- ### GET /api/bean/order/status/{ordernummer}
  - get order status
  
  response:
  ```
  {
      "success": Boolean,
      "msg": String
  }
  ```
- ### POST /api/user/signup
  - create user
  
  request:
  ```
  {
    "username": String,
    "password": String
  }
  ```
  response:
  ```
  {
      "success": Boolean
  }
  ```
- ### POST /api/user/login
  - log in
  
  request:
  ```
  {
    "username": String,
    "password": String
  }
  ```
  response:
  ```
  {
      "success": Boolean,
      "msg": String
  }
  ```

- ### GET /api/user/history/{userId}
  - get user history
  
  response:
  ```
  {
      "success": Boolean,
      "userId": String,
      "history": [
          {
              "orderNr": String,
              "totalPrice": Number,
              "orderDate": String,
              "orderDelivered": Boolean
          }
      ]
  } 
  ```