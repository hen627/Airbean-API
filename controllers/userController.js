import { createUser, checkUser, findHistory } from '../model/model.js'

export function addUser(req, res) {
    createUser(req.body)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json(err))
}

export function loginUser(req, res) {
    checkUser(req.body)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json(err))
}

export function userHistory(req, res) {
    findHistory(req.params.userid)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(401).json(err))

}