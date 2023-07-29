
const Router = require('koa-router')
const router = new Router()

const carouselRouter = require('./router/carouselRoute')
const productRouter = require('./router/productRoute')
router.use(carouselRouter.routes())
router.use(productRouter.routes())
// 导出
module.exports = router
