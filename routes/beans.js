import {Router} from 'express'
import {getProducts, addOrder, findOrder} from '../controllers/beansController.js'
export const router = Router()

router.get("/", getProducts) // GET kaffemenyn

router.post("/order", addOrder) // lägger en order

router.get("/order/status/:ordernr", findOrder)
//req.params

