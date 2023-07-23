
const Router = require('koa-router')
const router = new Router()

const carouselRouter = require('./router/carouselRoute')

router.use(carouselRouter.routes())
// 导出
module.exports = router
