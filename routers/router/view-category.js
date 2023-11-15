const Router = require('koa-router')
const viewCateRouter = new Router()
const viewCateControllers = require('../../controllers/view-category')
viewCateRouter.post('/admin/viewCate/get', viewCateControllers.getViewCategory)
module.exports = viewCateRouter