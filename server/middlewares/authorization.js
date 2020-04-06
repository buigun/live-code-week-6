const {Food} = require('../models')
const authorization = function (req,res,next) {
    Food.findOne({
        where: {
            UserId : req.user.id
        }
    })
    .then(result=>{
        if (!result) {
            res.status(404).json({message:'food not found'})
        } else {
            // if (result.UserId === req.user.id) {
            //     next()
            // } else {
            //     res.status(400).json({message: 'access forbidden'})
            // }
            next()
        }
    })
}

module.exports = authorization