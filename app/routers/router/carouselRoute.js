// 配置路由
const Router = require('koa-router')
const carouselRouter = new Router()
const resourcesCarousel = require('../../controllers/carouselController')
carouselRouter.post('/resources/carousel', resourcesCarousel.Carousel)
module.exports = carouselRouter