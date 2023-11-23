const collectmodel = require('../models/collect')
module.exports = {
    addCollectProducts: async ctx => {
        const { product_id } = ctx.request.body
        const user_id = ctx.user.user_id
        const duplicateProduct = await collectmodel.findProductById(user_id, product_id)
        if (duplicateProduct.length > 0) {
            ctx.body = {
                code: '003',
                msg: '该商品已经添加收藏，请到我的收藏查看'
            }
            return
        }
        const addproduct = await collectmodel.addProductById(user_id, product_id)
        if (addproduct.affectedRows === 1) {
            ctx.body = {
                code: '001',
                msg: '添加收藏成功'
            }
        }
    },
    getCollectProducts: async ctx => {
        const user_id = ctx.user.user_id
        const product = await collectmodel.getProductIdByUserId(user_id)
        if (product.length == 0) {
            ctx.body = {
                code: '002',
                msg: '该用户没有收藏的商品'
            }
            return
        }
        const collectList = []
        for (let i = 0; i < product.length; i++) {
            const item = product[i].product_id
            const products = await collectmodel.getProductsByProductId(item)
            collectList.push(products[0])
        }
        ctx.body = {
            code: '001',
            collectList
        }
    },
}