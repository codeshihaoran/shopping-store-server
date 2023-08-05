const auth = require('../../middlewares/auth')
const Router = require('koa-router')
const collectRouter = new Router()
const collectController = require('../../controllers/collect')
collectRouter.post('/user/collect/addCollect', auth.checkIsLogin, collectController.addCollectProducts)
collectRouter.post('/user/collect/getCollect', auth.checkIsLogin, collectController.getCollectProducts)
module.exports = collectRouter