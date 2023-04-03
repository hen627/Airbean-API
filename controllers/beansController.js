import {getAllProducts, createOrder, searchOrder} from "../model/model.js";


export function getProducts(req, res) {
    getAllProducts()
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch(err => console.log(err))
}

export function addOrder(req, res) {
    createOrder(req.body.order, req.body.userId)
        .then(result => {
            res.json(result)
        })
        .catch(err => console.log(err))
}

export function findOrder(req, res) {
    const orderNr = req.params.ordernr
    searchOrder(orderNr)
        .then(data => {
            res.json(data)
        })
        .catch(err => console.log(err))
}