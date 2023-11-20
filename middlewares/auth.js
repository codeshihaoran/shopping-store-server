const usermodel = require('../models/user')
module.exports = {
    checkIsLogin: async (ctx, next) => {
        const userId = ctx.cookies.get('user_id')
        const response = {
            code: '004',
            msg: '未登录，请先登录'
        }
        console.log(userId);
        if (!userId) {
            ctx.body = response
            return;
        }
        const users = await usermodel.getUserById(userId)
        const user = users[0]
        if (!user) {
            ctx.body = response
        } else {
            ctx.user = user;
            console.log('ctx user setter', user);
            await next()
        }
    }
}