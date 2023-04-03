import Datastore from 'nedb-promises';
import { v4 as uuidv4 } from 'uuid';
const productDB = Datastore.create("./db/product.db")
const orderDB = Datastore.create("./db/order.db")
const userDB = Datastore.create("./db/user.db")


export function getAllProducts() {
    return productDB.find({})
}

export async function createOrder(order, userId = null) { // TODO kolla så att ordern inte är tom
    const time = Date.now()
    console.log(time)
    const uuid = uuidv4()
    const eta = Math.floor(Math.random() * 30 + 10);
    await orderDB.insert({order: order, time: time, userId: userId, orderNr: uuid, eta: eta})
    const resObj = {
        eta: eta,
        orderNr: uuid
    }
    return resObj
}

export async function searchOrder(orderNr) {
    const timeNow = Date.now()
    const order = await orderDB.findOne({orderNr: orderNr })
    if( order === null) {
        return {
            success: false,
            msg: "Ordernumret finns inte"
        }
    } else {
        const orderTime = order.time
        const timePassed = Math.round((timeNow - orderTime) / 60000)
        console.log(timePassed, order.eta)
        return {
            eta: order.eta - timePassed
        }
    }
}