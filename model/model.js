import Datastore from 'nedb-promises';
import { v4 as uuidv4 } from 'uuid';
const productDB = Datastore.create("./db/product.db")
const orderDB = Datastore.create("./db/order.db")
const userDB = Datastore.create("./db/user.db")


export function getAllProducts() {
    return productDB.find({})
}

export async function createOrder(order, userId = null) {
    const time = Date.now()
    const uuid = uuidv4()
    const totalPrice = order.reduce((acc, curr) => acc + curr.price, 0)
    const eta = Math.floor(Math.random() * 30 + 10);
    await orderDB.insert({order: order, time: time, userId: userId, orderNr: uuid, eta: eta, totalPrice: totalPrice})
    return {
        eta: eta,
        orderNr: uuid
    }
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
        return {
            eta: order.eta - timePassed > 0 ? order.eta - timePassed : 0
        }
    }
}

export async function createUser(user) {
    const userExists = await userDB.findOne({username: user.username})
    if( userExists === null) {
        await userDB.insert(user)
        return {
            success: true
        }
    } else {
        return {
            success: false,
            msg: "Användarnamnet finns redan"
        }
    }
}

export async function checkUser(user) {
    const userExists = await userDB.findOne({username: user.username, password: user.password})
    if( userExists !== null) {
        return {
            success: true,
            msg: "Inloggning lyckades " + userExists._id
        }
    } else {
        return {
            success: false,
            msg: "Användar ID eller lösenord är fel"
        }
    }
}

export async function findHistory(id) {
    const history = await orderDB.find({userId: id})
    return {
        success: true,
        userId: id,
        history: history.map(item => ({
            orderNr: item.orderNr,
            totalPrice: item.totalPrice,
            orderDate: new Date(item.time).toLocaleString(),
            orderDelivered: (Date.now() - item.time)/60000 > item.eta
        }))
    }
}
