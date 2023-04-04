import { getAllProducts } from "../model/model.js"

const allProducts = await getAllProducts()
// {
//   "userId": "BJ8hbxOmt3vIamfu",
//   "order": [
//     {
//       "name": "Cortada",
//       "price": 39
//     },
//     {
//       "name": "Kaffe Latte",
//       "price": 45
//     }
//   ]
// }

export function validateOrder(req, res, next) {
        console.log(req.body.order.length)
    if(
        Object.hasOwn(req.body, "userId") &&
        Object.hasOwn(req.body, "order") &&
        (typeof req.body.userId === "string" || typeof req.body.userId === null) &&
        typeof req.body.order === "object" &&
        req.body.order?.lenght !== 0
        
    ){
        console.log(req.body.order.length)
     
        const obj = {}
        for(let i = 0; i < req.body.order.length; i++) {
            if(allProducts.some(item => item.title === req.body.order[i].name)){
                console.log(req.body.order.length)
            }
        }
        // const orderObj = req.body
        // if(
        //     orderObj.hasOwn(req.body, 'title') && 
        //     orderObj.hasOwn(req.body, 'price') &&
        //     typeof req.body.title === "string" &&
        //     typeof req.body.price === "string"
        // ){
        //     req.body = {
        //         title: req.body.title,
        //         price: req.body.price
        //     }
        //     next()
        // } else res.status(400).json({
        //     sucess: false, 
        //     mesg: 'Bad request'
        // }
       
    } else {
        res.status(400).json({
            sucess: false,
            msg: "Bad request."
        })
    }
}

export function validateUser(req, res, next) {
    if(
        Object.hasOwn(req.body, "username") &&
        Object.hasOwn(req.body, "password") &&
        typeof req.body.username === "string" &&
        typeof req.body.password === "string"
    ){
        req.body = {
            username: req.body.username,
            password: req.body.password
        }
        next()
    } else {
        res.status(400).json({
            sucess: false,
            msg: "Bad request."
        })
    }
}