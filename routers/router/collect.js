const auth = require('../../middlewares/auth')
const Router = require('koa-router')
const collectRouter = new Router()
const collectController = require('../../controllers/collect')
collectRouter.post('/user/collect/add', auth.checkIsLogin, collectController.addCollectProducts)
collectRouter.post('/user/collect/get', auth.checkIsLogin, collectController.getCollectProducts)
module.exports = collectRouter