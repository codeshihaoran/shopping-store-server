const Router = require('koa-router')
const productRouter = new Router()
const productController = require('../../controllers/productController')
// 热门商品router
productRouter.post('/product/getHotProduct', productController.getHotProducts)
// 推销商品router
productRouter.post('/product/getPromoProduct', productController.getPromoProducts)
module.exports = productRouter