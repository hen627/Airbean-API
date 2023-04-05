import { Router } from 'express'
import { addUser, loginUser, userHistory } from '../controllers/userController.js'
import { validateUser, validateUserId } from '../middlewares/validate.js'

export const router = Router()

router.post("/signup", validateUser, addUser)

router.post("/login", validateUser, loginUser)

router.get("/history/:userid", validateUserId, userHistory)
