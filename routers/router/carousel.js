// 配置路由
const Router = require('koa-router')
const carouselRouter = new Router()
const { Carousel } = require('../../controllers/carousel')
const { requestInfo } = require('../../middlewares/log')
carouselRouter.post('/resources/carousel', requestInfo, Carousel)
module.exports = carouselRouter