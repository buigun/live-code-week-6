require('dotenv').config()
const jwt = require('jsonwebtoken')

const authentication = function(req,res,next) {
    try {
        const {token} = req.headers
        if(!token) {
            res.status(401).json({message: 'You must login'})
        } else {
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decoded
            next()
        }
    } catch (error) {
        res.status(500).json({message:'Internal Server error'})
    }
}

module.exports = authentication