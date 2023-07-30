// 主入口文件
const Koa = require('koa')
let app = new Koa()

const bodyParser = require('koa-bodyparser')

const router = require('./routers/index')

const { Port } = require('./config')

app.use(bodyParser())
// 启动路由
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(Port, () => {
    console.log(`请访问：http://localhost:${Port}`);
})
