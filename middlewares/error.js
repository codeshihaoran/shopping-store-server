module.exports = {
    reportErr: async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            console.log('err :', err);
            ctx.body = {
                code: '500',
                msg: '服务端出错'
            }
        }
    }
}
