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
        const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
        if (!userNameRule.test(userName)) {
            ctx.body = {
                code: '003',
                msg: '用户名不合法(以字母开头,允许5-16字节,允许字母数字下划线)'
            }
            return false;
        }
        return true;
    },
    checkUserInfo: (ctx, userName, password) => {
        if (userName.length === 0 || password.length === 0) {
            ctx.body = {
                code: '002',
                msg: '用户名或密码不能为空'
            }
            return false;
        }
        const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
        if (!userNameRule.test(userName)) {
            ctx.body = {
                code: '003',
                msg: '用户名不合法(以字母开头,允许5-16字节,允许字母数字下划线)'
            }
            return false;
        }
        const passwordRule = /^[a-zA-Z]\w{5,17}$/;
        if (!passwordRule.test(password)) {
            ctx.body = {
                code: '003',
                msg: '密码不合法(以字母开头,长度在6~18之间,只能包含字母、数字和下划线)'
            }
            return false;
        }
        return true;
    }

}