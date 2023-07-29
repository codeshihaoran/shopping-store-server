const Router = require('koa-router')
const productRouter = new Router()
const productController = require('../../controllers/productController')
// 热门商品router
productRouter.post('/product/getHotProduct', productController.Gethotproducts)
// 推销商品router
productRouter.post('/product/getPromoProduct', productController.Getpromoproduct)
module.exports = productRouter