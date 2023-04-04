import { createUser, checkUser } from '../model/model.js'

export function addUser(req, res) {
    createUser(req.body)
        .then(data => {
            res.json(data)
        })
}

export function loginUser(req, res) {
    checkUser(req.body)
        .then(data => {
            res.json(data)
        })
}