const Router = require('koa-router')
const productRouter = new Router()
const productController = require('../../controllers/product')
// 热门商品router
productRouter.post('/product/hotProduct/get', productController.getHotProducts)
// 推销商品router
productRouter.post('/product/promoProduct/get', productController.getPromoProducts)
productRouter.post('/product/allProduct/get', productController.getAllproduct)
productRouter.post('/product/category/get', productController.getProductCategory)
productRouter.post('/product/productByCategory/get', productController.getProducts)
productRouter.post('/product/details/get', productController.getProductDetails)
productRouter.post('/product/detailsPicture/get', productController.getProductDetailsPicture)

// admin-api
productRouter.post('/product/delete', productController.deleteProduct)
productRouter.post('/product/prodctInfo/revise', productController.reviseProduct)

module.exports = productRouter