const Router = require('koa-router')
const productRouter = new Router()
const productController = require('../../controllers/product')
// 热门商品router
productRouter.post('/product/getHotProduct', productController.getHotProducts)
// 推销商品router
productRouter.post('/product/getPromoProduct', productController.getPromoProducts)
productRouter.post('/product/getAllProduct', productController.getAllproduct)
productRouter.post('/product/getCategory', productController.getProductCategory)
productRouter.post('/product/getProductByCategory', productController.getProducts)

module.exports = productRouter