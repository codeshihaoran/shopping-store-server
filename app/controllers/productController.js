
const productmodel = require('../models/productmodel')
module.exports = {
    // 获取热门商品
    Gethotproducts: async ctx => {
        try {
            let { categoryName } = ctx.request.body
            const categoryID = []
            for (let i = 0; i < categoryName.length; i++) {
                // 根据商品分类名称获取分类id
                const category_id = await productDao.getcategoryID(categoryName[i]);
                categoryID.push(category_id);
            }
            let products = await productmodel.hotProduct(categoryID)
            ctx.body = {
                code: '001',
                products
            }
        } catch (err) {
            console.log('error :', err);
        }
    },
    // 获取推销商品
    Getpromoproduct: async ctx => {
        try {
            let { categoryName } = ctx.request.body
            console.log(categoryName);
            let categoryID = await productmodel.getcategoryID(categoryName)
            let products = await productmodel.promoProduct(categoryID)
            ctx.body = {
                code: '001',
                products
            }
        } catch (err) {
            console.log('error :', err);
        }
    }
}