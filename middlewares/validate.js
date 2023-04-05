import { getAllProducts, findUserId, findOrderNr } from '../model/model.js'

const allProducts = await getAllProducts()

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

export async function validateOrder(req, res, next) {
    if(
        Object.hasOwn(req.body, "userId") &&
        Object.hasOwn(req.body, "order") &&
        (typeof req.body.userId === "string" || typeof req.body.userId === "object") && // typeof null blir 'object'!!!
        Array.isArray(req.body.order)
    ){
        if(req.body.order.length > 0) {
            const validatedOrdersObject = []
            if(!await findUserId(req.body.userId)) {
                req.body.userId = null
            }
            for(let i = 0; i < req.body.order.length; i++) {
                const validateOneOrder = {}
                const productName = allProducts.find(item => item.title === req.body.order[i].name)
                if(productName) {
                    validateOneOrder.name = req.body.order[i].name
                } else {
                    res.status(400).json({
                        success: false,
                        msg: "No order with that name"
                    })
                    return
                }
                if(productName.price === req.body.order[i].price) {
                    validateOneOrder.price = req.body.order[i].price
                    validatedOrdersObject.push(validateOneOrder)
                } else {
                    res.status(400).json({
                        success: false,
                        msg: "Priset matchar inte"
                    })
                    return
                }
            }
            req.body = {
                userId: req.body.userId,
                order: validatedOrdersObject
            }
            next()
        } else {
            res.status(400).json({
                success: false,
                msg: "Inga ordrar i varukorgen"
            })
            return
        }
    } else {
        res.status(400).json({
            success: false,
            msg: "Bad request."
        })
    }
}

export async function validateUserId(req, res, next) {
    const result = await findUserId(req.params.userid)
    if(result) {
        next()
    } else {
        res.status(400).json({
            success: false,
            msg: "UserId does not exist"
        })
    }
        
}

export async function validateOrderNr(req, res, next) {
    const result = await findOrderNr(req.params.ordernr)
    if(result) {
        next()
    } else {
        res.status(400).json({
            sucess: false,
            msg: "OrderNr does not exist."
        })
    }
}
