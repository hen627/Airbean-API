import { Router } from 'express'
import { getProducts, addOrder, findOrder } from '../controllers/beansController.js'
import { validateOrder } from '../middlewares/validate.js'

export const router = Router()

router.get("/", getProducts)

router.post("/order", validateOrder, addOrder)

router.get("/order/status/:ordernr", findOrder)
