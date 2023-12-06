const usermodel = require('../models/user')
const usermiddleware = require('../middlewares/user')
module.exports = {
    checkIsExistUser: async ctx => {
        const { userName } = ctx.request.body
        if (!usermiddleware.checkUserName(ctx, userName)) {
            return;
        }
        const userInfo = await usermodel.checkIsExistUserByUserName(userName)
        console.log('userinfo.length :', userInfo.length);
        switch (userInfo.length) {
            case 0:
                ctx.body = {
                    code: '001',
                    msg: '用户名不存在，可以注册'
                }
                break;
            case 1:
                ctx.body = {
                    code: '004',
                    msg: '用户名已经存在，不能注册'
                }
                break;
        }
    },
    userRegister: async ctx => {
        const { userName, password } = ctx.request.body
        if (!usermiddleware.checkUserInfo(ctx, userName, password)) {
            return;
        }
        const userInfo = await usermodel.checkIsExistUserByUserName(userName)
        if (userInfo.length !== 0) {
            ctx.body = {
                code: '004',
                msg: '用户名已经存在，不能注册'
            }
        }
        const registerInfo = await usermodel.userRegisterByUserInfo(userName, password)
        console.log('registerInfo :', registerInfo);
        if (registerInfo.affectedRows === 1) {
            ctx.body = {
                code: '001',
                msg: '注册成功'
            }
        }
    },
    userLogin: async ctx => {
        const { userName, password } = ctx.request.body
        if (!usermiddleware.checkUserInfo(ctx, userName, password)) {
            return;
        }
        const loginInfo = await usermodel.userLoginByUserInfo(userName, password)
        switch (loginInfo.length) {
            case 0:
                ctx.body = {
                    code: '004',
                    msg: '用户名或密码错误'
                }
                break;
            case 1:
                let user = { user_id: loginInfo[0].user_id, userName: loginInfo[0].user_name, user_phone: loginInfo[0].user_phone }
                console.log('user :', user);
                ctx.body = {
                    code: '001',
                    user,
                    msg: '登录成功'
                }
                ctx.cookies.set('user_id', user.user_id, {
                    maxAge: 1000 * 60 * 60 * 30,
                    httpOnly: false
                })
                break;
        }
    },
    userInfo: async ctx => {
        console.log('ctx user :', ctx.user);
        ctx.body = {
            user: ctx.user
        }
    },

    // admin 
    getAllUserInfo: async ctx => {
        const allUserInfo = await usermodel.getUserInfo()
        ctx.body = {
            code: '001',
            allUserInfo
        }
    }
}