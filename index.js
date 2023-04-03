import express from 'express'
import {router as beansRouter} from './routes/beans.js'
import {router as userRouter} from './routes/user.js'
const app = express()
const PORT = 3000

app.use(express.json())

app.use("/api/bean", beansRouter)
app.use("/api/user", userRouter)









app.listen(PORT, () => {
    console.log("Listening to port: " + PORT)
})