// 主入口文件
const Koa = require('koa')
let app = new Koa()

const path = require('path')

const bodyParser = require('koa-bodyparser')

const router = require('./routers/index')

const static = require('koa-static')

const { Port } = require('./config')

// 捕获错误
const error = require('./middlewares/error')
app.use(error.reportErr)
// post请求解析
app.use(bodyParser())
// 静态资源路径
app.use(static(
    path.join(__dirname)
))
// 启动路由
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(Port, () => {
    console.log(`请访问：http://localhost:${Port}`);
})
