
const productmodel = require('../models/product')
module.exports = {
    // 获取热门商品
    getHotProducts: async ctx => {
        try {
            let { categoryName } = ctx.request.body
            const categoryID = []
            for (let i = 0; i < categoryName.length; i++) {
                // 根据商品分类名称获取分类id
                const category_id = await productmodel.getCategoryIdbyName(categoryName[i]);
                categoryID.push(category_id);
            }
            console.log('getHotProducts categoryID :', categoryID);
            let products = await productmodel.getHotProductsByCategoryId(categoryID)
            ctx.body = {
                code: '001',
                products
            }
        } catch (err) {
            console.log('error :', err);
        }
    },
    // 获取推销商品
    getPromoProducts: async ctx => {
        try {
            let { categoryName } = ctx.request.body
            let categoryId = await productmodel.getCategoryIdbyName(categoryName)
            console.log('getPromoProducts categoryId :', categoryId);
            products = await productmodel.getPromoProductsByCategoryId(categoryId)
            ctx.body = {
                code: '001',
                products
            }
        } catch (err) {
            console.log('error :', err);
        }
    },
    // 获取全部商品
    getAllproduct: async ctx => {
        try {
            let { categoryName, currentPage, pageSize } = ctx.request.body
            let index = (currentPage - 1) * pageSize;
            let categoryID = productmodel.getCategoryIdbyName(categoryName)
            let products = await productmodel.getAllproductsByCategoryId(categoryID, index, pageSize);
            ctx.body = {
                code: '001',
                products,
            }
        } catch (err) {
            console.log(err);
        }
    }
}