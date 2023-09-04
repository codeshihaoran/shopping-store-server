const collectmodel = require('../models/collect')
module.exports = {
    addCollectProducts: async ctx => {
        let { product_id } = ctx.request.body
        let user_id = ctx.user
        let duplicateProduct = await collectmodel.findProductById(user_id, product_id)
        if (duplicateProduct.length > 0) {
            ctx.body = {
                code: '003',
                msg: '该商品已经添加收藏，请到我的收藏查看'
            }
            return
        }
        let addproduct = await collectmodel.addProductById(user_id, product_id)
        if (addproduct.affectedRows === 1) {
            ctx.body = {
                code: '001',
                msg: '添加收藏成功'
            }
        }
    },
    getCollectProducts: async ctx => {
        let user_id = ctx.user
        let product = await collectmodel.getProductIdByUserId(user_id)
        if (product.length == 0) {
            ctx.body = {
                code: '002',
                msg: '该用户没有收藏的商品'
            }
            return
        }
        let collectList = []
        for (let i = 0; i < product.length; i++) {
            const item = product[i].product_id
            let products = await collectmodel.getProductsByProductId(item)
            collectList.push(products[0])
        }
        ctx.body = {
            code: '001',
            collectList
        }
    },
}