import {Router} from 'express'
import { addUser, loginUser } from '../controllers/userController.js'

export const router = Router()

router.post("/signup", addUser)  // skapa konto

router.post("/login", loginUser) // logga in

router.get("/history") // hämta användares orderhistorik