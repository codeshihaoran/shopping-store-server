// 配置路由
const Router = require('koa-router')
const carouselRouter = new Router()
const { Carousel } = require('../../controllers/carousel')
carouselRouter.post('/resources/carousel', Carousel)
module.exports = carouselRouter