
const productmodel = require('../models/product')
module.exports = {
    // 获取热门商品
    getHotProducts: async ctx => {
        const { categoryName } = ctx.request.body
        const categoryId = []
        for (let i = 0; i < categoryName.length; i++) {
            // 根据商品分类名称获取分类id
            const category_id = await productmodel.getCategoryIdByName(categoryName[i]);
            categoryId.push(category_id);
        }
        console.log('getHotProducts categoryID :', categoryId);
        const products = await productmodel.getHotProductsByCategoryId(categoryId)
        ctx.body = {
            code: '001',
            products
        }
    },
    // 获取推销商品
    getPromoProducts: async ctx => {
        const { categoryName } = ctx.request.body
        const categoryId = await productmodel.getCategoryIdByName(categoryName)
        console.log('getPromoProducts categoryId :', categoryId);
        const products = await productmodel.getPromoProductsByCategoryId(categoryId)
        ctx.body = {
            code: '001',
            products
        }
    },
    // 获取全部商品
    getAllproduct: async ctx => {
        const { categoryId, currentPage, pageSize } = ctx.request.body
        const index = (currentPage - 1) * pageSize;
        const products = await productmodel.getAllproductsByCategoryId(categoryId, index, pageSize);
        const total = (await productmodel.getAllProductsTotals()).length
        ctx.body = {
            code: '001',
            products,
            total
        }
    },
    getProductCategory: async ctx => {
        const category = await productmodel.getCategory()
        ctx.body = {
            code: '001',
            category
        }
    },
    getProducts: async ctx => {
        const { categoryId, currentPage, pageSize } = ctx.request.body
        const index = (currentPage - 1) * pageSize;
        const products = await productmodel.getProductsBycategoryId(categoryId, index, pageSize)
        const total = (await productmodel.getPromoProductsByCategoryId(categoryId)).length
        ctx.body = {
            code: '001',
            products,
            total
        }
    },
    getProductDetails: async ctx => {
        const { productId } = ctx.request.body
        const product = await productmodel.getProductDetailsByProductId(productId)
        ctx.body = {
            code: '001',
            product
        }
    },
    getProductDetailsPicture: async ctx => {
        const { productId } = ctx.request.body
        const productPicture = await productmodel.getProductDetailPicturesByProductId(productId)
        ctx.body = {
            code: '001',
            productPicture
        }
    },

    // admin-controller
    deleteProduct: async ctx => {
        const { productId } = ctx.request.body
        const deleteInfo = await productmodel.deleteProductByProductId(productId)
        if (deleteInfo.affectedRows === 1) {
            ctx.body = {
                code: '001',
                message: '您已删除成功'
            }
        }
    }
}