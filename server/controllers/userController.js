require('dotenv').config()
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const {hash,compare} = require('../helpers/bcrypt')

class userController {  
    static create(req,res) {
        const {email,password} = req.body
        
        User.create({email,password})
        .then(user=>{
            res.status(201).json({user})
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

    static login(req,res) {
        const {email,password} = req.body

        User.findOne({where:{email}})
        .then(user=>{
            if(!user) {
                res.status(401).json({message: 'email wrong'})
            } else {
                if (!compare(password,user.password)) {
                    res.status(401).json({message: 'password wrong'})
                } else {
                    const token = jwt.sign({id:user.id},process.env.JWT_SECRET)
                    res.status(200).json(token)
                }
            }
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
}

module.exports = userController