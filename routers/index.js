
const Router = require('koa-router')
const router = new Router()

const carouselRouter = require('./router/carousel')
const productRouter = require('./router/product')
router.use(carouselRouter.routes())
router.use(productRouter.routes())
// 导出
module.exports = router
