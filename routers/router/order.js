const Router = require('koa-router')
const orderRouter = new Router()
const auth = require('../../middlewares/auth')
const orderController = require('../../controllers/order')
orderRouter.post('/user/order/add', auth.checkIsLogin, orderController.addProductsToOrder)
orderRouter.post('/user/order/get', auth.checkIsLogin, orderController.getOrderInfo)
module.exports = orderRouter