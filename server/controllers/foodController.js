const {Food} = require('../models')

class foodController {
    static create(req,res) {
        const {title,price,ingredients,tag} = req.body
        
        Food.create({title,price,ingredients,tag
            ,UserId: req.user.id
        })
        .then(food=>{
            res.status(201).json({food})
        })
        .catch(err=>{
            if (err.name === 'SequelizeValidationError') {
                let msg = []

                err.errors.forEach(el => {
                    msg.push(el.message)
                });
                res.status(400).json({message: msg.join(', ')})
            } else {
                res.status(500).json(
                    {
                        message: 'Internal server error'
                    }
                )
            }
        })
    }

    static getFoods(req,res) {
        Food.findAll({
            where: {
                UserId: req.user.id
            }
        })
        .then(foods=>{
            res.status(200).json({foods})
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static destroy(req,res) {
        Food.destroy({
            where: {id: req.params.id}
        })
        .then(data=>{
            res.status(200).json({message:'Successfully delete food from your menu'})
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = foodController