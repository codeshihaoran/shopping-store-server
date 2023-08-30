
const Router = require('koa-router')
// prefix 全局配置接口路径前缀
const router = new Router({
    prefix: '/api'
})

const carouselRouter = require('./router/carousel')
const productRouter = require('./router/product')
const userRouter = require('./router/user')
const collectRouter = require('./router/collect')
const shoppingRouter = require('./router/shoppingcart')
const orderRouter = require('./router/order')
router.use(orderRouter.routes())
router.use(shoppingRouter.routes())
router.use(userRouter.routes())
router.use(carouselRouter.routes())
router.use(productRouter.routes())
router.use(collectRouter.routes())
// 导出
module.exports = router
