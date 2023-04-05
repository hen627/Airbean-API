import { getAllProducts, createOrder, searchOrder } from '../model/model.js'


export function getProducts(req, res) {
    getAllProducts()
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json(err))
}

export function addOrder(req, res) {
    createOrder(req.body.order, req.body.userId)
        .then(result => {
            res.json(result)
        })
        .catch(err => res.status(400).json(err))
}

export function findOrder(req, res) {
    const orderNr = req.params.ordernr
    searchOrder(orderNr)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json(err))
}
