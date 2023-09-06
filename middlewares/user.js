// 前端注册登录校验
module.exports = {
    checkUserName: (ctx, userName = '') => {
        if (userName.length === 0) {
            ctx.body = {
                code: '002',
                msg: '用户名不能为空'
            }
            return false;
        }
        return true
    },
    checkUserInfo: (ctx, userName, password) => {
        if (userName.length === 0 || password.length === 0) {
            ctx.body = {
                code: '002',
                msg: '用户名或密码不能为空'
            }
            return false;
        }
        return true
    }
}