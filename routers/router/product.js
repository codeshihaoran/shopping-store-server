const Router = require('koa-router')
const productRouter = new Router()
const multer = require('@koa/multer')
const path = require('path')
// 创建存储
const storage = multer.diskStorage({
    // 指定文件存储路径
    destination: 'public/imgs/phone',
    // 使用multer默认不会生成扩展名
    filename: function (req, file, cb) {
        // 获取了扩展名
        const ext = path.extname(file.originalname);
        // 生成文件+扩展名
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname.replace(ext, '') + '-' + uniqueSuffix + ext);
    }
})
// 创建multer实例
const upload = multer({ storage: storage })
const productController = require('../../controllers/product')
// 热门商品router
productRouter.post('/product/hotProduct/get', productController.getHotProducts)
// 推销商品router
productRouter.post('/product/promoProduct/get', productController.getPromoProducts)
productRouter.post('/product/allProduct/get', productController.getAllproduct)
productRouter.post('/product/category/get', productController.getProductCategory)
productRouter.post('/product/productByCategory/get', productController.getProducts)
productRouter.post('/product/details/get', productController.getProductDetails)
productRouter.post('/product/detailsPicture/get', productController.getProductDetailsPicture)

// admin-api
productRouter.post('/product/delete', productController.deleteProduct)
productRouter.post('/product/prodctInfo/revise', productController.reviseProduct)
productRouter.post('/product/add', productController.addProduct)
// upload.single()表示只处理单个文件上传，且字段名应与客户端发送的字段名匹配
productRouter.post('/product/image/add', upload.single('file'), productController.addProductImage)
module.exports = productRouter