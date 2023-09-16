module.exports = {
    requestInfo: async (ctx, next) => {
        console.log("requestInfo：", ctx.request);
        await next()
    }
}