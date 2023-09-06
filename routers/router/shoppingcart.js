const Router = require('koa-router')
const shoppingRouter = new Router()
const shoppingcartController = require('../../controllers/shoppingcart')
const auth = require('../../middlewares/auth')
shoppingRouter.post('/user/shoppingCart/add', auth.checkIsLogin, shoppingcartController.addProductToshoppingCart)
shoppingRouter.post('/user/shoppingCart/get', auth.checkIsLogin, shoppingcartController.getShoppingCartProducts)
shoppingRouter.post('/user/shoppingCart/delete', auth.checkIsLogin, shoppingcartController.deleteShopingProducts)
module.exports = shoppingRouter