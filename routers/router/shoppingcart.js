const Router = require('koa-router')
const shoppingRouter = new Router()
const shoppingcartController = require('../../controllers/shoppingcart')
const auth = require('../../middlewares/auth')
shoppingRouter.post('/user/shoppingCart/addShoppingCart', auth.checkIsLogin, shoppingcartController.addProductToshoppingCart)
shoppingRouter.post('/user/shoppingCart/getShoppingCart', auth.checkIsLogin, shoppingcartController.getShoppingCartProducts)
shoppingRouter.post('/user/shoppingCart/deleteShoppingCart', auth.checkIsLogin, shoppingcartController.deleteShopingProducts)
module.exports = shoppingRouter