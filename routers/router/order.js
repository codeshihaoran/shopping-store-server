const Router = require('koa-router')
const orderRouter = new Router()
const auth = require('../../middlewares/auth')
const orderController = require('../../controllers/order')
orderRouter.post('/user/order/add', auth.checkIsLogin, orderController.addProductsToOrder)
orderRouter.post('/user/order/get', auth.checkIsLogin, orderController.getOrderInfo)
orderRouter.post('/user/order/edit', auth.checkIsLogin, orderController.editOrderInfo)
// admin 
orderRouter.post('/admin/order/get', orderController.getAllOrderInfo)
orderRouter.post('/admin/order/search', orderController.searchOrderId)
orderRouter.post('/admin/order/details/get', orderController.getOrderDetails)
orderRouter.post('/admin/order/sale/get', orderController.getOrderSale)
module.exports = orderRouter