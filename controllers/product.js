
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
        } else {
            ctx.body = {
                code: '004',
                message: '未找到匹配记录或更新没有任何影响'
            }
            console.log('未找到匹配记录或更新没有任何影响');
        }
    },
    reviseProduct: async ctx => {
        const { productId, productInfo } = ctx.request.body
        const product_name = productInfo.input1
        const product_price = productInfo.input2
        const product_num = productInfo.input3
        const product_selling_price = productInfo.input4
        const reviseInfo = await productmodel.reviseProductByProductId(product_name, product_price, product_num, product_selling_price, productId)
        if (reviseInfo.affectedRows > 0) {
            ctx.body = {
                code: '001',
                message: '您已修改成功'
            }
        } else {
            ctx.body = {
                code: '004',
                message: '未找到匹配记录或更新没有任何影响'
            }
            console.log('未找到匹配记录或更新没有任何影响');
        }
    },
    addProduct: async ctx => {
        const { productInfo, imgPath } = ctx.request.body
        const productId = productInfo.inputProductId
        const productName = productInfo.inputProductName
        const productCateId = productInfo.inputProductCateId
        const productTitle = productInfo.inputProductTitle
        const productIntro = productInfo.inputProductIntro
        const productPrice = productInfo.inputProductPrice
        const productSellPrice = productInfo.inputProductSellingPrice
        const productNum = productInfo.inputProductNum
        const productSale = productInfo.inputProductSale
        const addProductInfo = await productmodel.addProductByProductInfo(productId, productName, productCateId, productTitle, productIntro, imgPath, productPrice, productSellPrice, productNum, productSale)
        if (addProductInfo.affectedRows > 0) {
            ctx.body = {
                code: '001',
                message: '您已添加成功'
            }
        } else {
            ctx.body = {
                code: '004',
                message: '未找到匹配记录或更新没有任何影响'
            }
        }
    },
    addProductImage: async ctx => {
        const { path } = ctx.request.file
        console.log("file path: ", path);
        if (path) {
            ctx.body = {
                code: '001',
                message: '您已上传成功',
                path
            }
        }

    }
}