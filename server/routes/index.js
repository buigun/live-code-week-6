const route = require('express').Router()
const foodController = require('../controllers/foodController')
const userController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.post('/register',userController.create)
route.post('/login',userController.login)
route.post('/foods', authentication, foodController.create)
route.get('/foods', authentication, authorization, foodController.getFoods)

module.exports = route