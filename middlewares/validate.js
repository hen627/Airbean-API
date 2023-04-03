function validatePost(req, res, next) {
    const orderObj = req.body
    if (orderObj?.title && orderObj?.price) {
        next()
    } else res.status(400).json({
        sucess: false, 
        message: 'Bad request'
    })
}