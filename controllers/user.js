const usermodel = require('../models/user')
const usermiddleware = require('../middlewares/user')
module.exports = {
    checkIsExistUser: async ctx => {
        try {
            let { userName } = ctx.request.body
            if (!usermiddleware.checkUserName(ctx, userName)) {
                return;
            }
            let userInfo = await usermodel.checkIsExistUserByUserName(userName)
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
        } catch (err) {
            console.log(err);
        }
    },
    userRegister: async ctx => {
        try {
            let { userName, password } = ctx.request.body
            if (!usermiddleware.checkUserInfo(ctx, userName, password)) {
                return;
            }
            let userInfo = await usermodel.checkIsExistUserByUserName(userName)
            if (userInfo.length !== 0) {
                ctx.body = {
                    code: '004',
                    msg: '用户名已经存在，不能注册'
                }
            }
            let registerInfo = await usermodel.userRegisterByUserInfo(userName, password)
            console.log('registerInfo :', registerInfo);
            if (registerInfo.affectedRows === 1) {
                ctx.body = {
                    code: '001',
                    msg: '注册成功'
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
    userLogin: async ctx => {
        try {
            let { userName, password } = ctx.request.body
            if (!usermiddleware.checkUserInfo(ctx, userName, password)) {
                return;
            }
            let loginInfo = await usermodel.userLoginByUserInfo(userName, password)
            if (loginInfo.length > 0) {
                let user = { user_id: loginInfo[0].user_id, userName: loginInfo[0].userName }
                console.log('user :', user);
            }
            switch (loginInfo.length) {
                case 0:
                    ctx.body = {
                        code: '004',
                        msg: '用户名或密码错误'
                    }
                    break;
                case 1:
                    ctx.body = {
                        code: '001',
                        user,
                        msg: '登录成功'
                    }
                    break;
            }
        } catch (err) {
            console.log(err);
        }
    }
}