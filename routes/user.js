import {Router} from 'express'

export const router = Router()

router.post("/signup")  // skapa konto

router.post("/login") // logga in

router.get("/history") // hämta användares orderhistorik