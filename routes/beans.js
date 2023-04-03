import {Router} from 'express'

export const router = Router()

router.get("/") // GET kaffemenyn

router.post("/order") // lägger en order

router.get("order/status/:ordernr")
//req.params