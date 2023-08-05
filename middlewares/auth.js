const usermodel = require('../models/user')
module.exports = {
    checkIsLogin: async (ctx, next) => {
        let userId = ctx.cookies.get('user_id')
        const response = {
            code: '004',
            msg: '未登录，请先登录'
        }
        console.log(userId);
        if (!userId) {
            ctx.body = response
            return;
        }
        let users = await usermodel.getUserById(userId)
        const user = users[0].user_id
        console.log('user user_id', user);
        if (!user) {
            ctx.body = response
        } else {
            ctx.user = user;
            console.log('ctx user setter', user);
            await next()
        }
    }
}