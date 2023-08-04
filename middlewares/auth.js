const usermodel = require('../models/user')



module.exports = {
    checkIsLogin: async (ctx, next) => {

        let sessionid = ctx.cookies.get('sessionid')
        const response = {
            code: '004',
            msg: '未登录，请先登录'
        }
        if (!sessionid) {
            ctx.body = response
            return;
        }
        let users = await usermodel.getUserById(sessionid)
        const user = users[0]
        console.log(user);
        if (!user) {
            ctx.body = response
        } else {
            ctx.user = user;
            console.log('ctx user setter', user);
            next()
        }
    }
}