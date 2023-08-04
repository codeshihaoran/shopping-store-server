const auth = require('../../middlewares/auth')
const Router = require('koa-router')
const userRouter = new Router()
const userController = require('../../controllers/user')
userRouter.post('/users/findUserName', userController.checkIsExistUser)
userRouter.post('/users/register', userController.userRegister)
userRouter.post('/users/login', userController.userLogin)
userRouter.get('/users/info', auth.checkIsLogin, userController.userInfo)
module.exports = userRouter