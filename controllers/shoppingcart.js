const shoppingcartmodel = require('../models/shoppingcart')
let shoppingCart = {
    shoppingCartProductInfo: async (shoppingCartInfo) => {
        let productInfoData = []
        for (let i = 0; i < shoppingCartInfo.length; i++) {
            const item = shoppingCartInfo[i]
            const productsInfo = await shoppingcartmodel.getproductsInfoByProductId(item.product_id)
            let productInfoDataItem = {
                id: item.id,
                productID: item.product_id,
                productName: productsInfo[0].product_name,
                productImg: productsInfo[0].product_picture,
                price: productsInfo[0].product_selling_price,
                num: item.num,
                maxNum: Math.floor(productsInfo[0].product_num / 2),
                check: false
            }
            productInfoData.push(productInfoDataItem)
        }
        return productInfoData
    }
}
module.exports = {
    addProductToshoppingCart: async ctx => {
        let { product_id } = ctx.request.body
        let user_id = ctx.user
        let shoppingProducts = await shoppingcartmodel.findShoppingProductsById(user_id, product_id)
        if (shoppingProducts.length > 0) {
            const productNum = shoppingProducts[0].num + 1
            const newAddProductNum = await shoppingcartmodel.updateShoppingCartByProductNum(productNum, user_id, product_id)
            if (newAddProductNum.affectedRows === 1) {
                ctx.body = {
                    code: '002',
                    msg: '该商品已在购物车，数量 +1'
                }
                return
            }
        }
        let addProductsToshoppingCart = await shoppingcartmodel.addshopingProductsById(user_id, product_id)
        if (addProductsToshoppingCart.affectedRows === 1) {
            let findShoppingInfo = await shoppingcartmodel.findShoppingProductsById(user_id, product_id)
            let addShoppingProductInfo = await shoppingCart.shoppingCartProductInfo(findShoppingInfo)
            ctx.body = {
                code: '001',
                msg: '添加购物车成功',
                shoppingCartData: addShoppingProductInfo
            }
        }
    },
    getShoppingCartProducts: async ctx => {
        let user_id = ctx.user
        let shoppingCartInfo = await shoppingcartmodel.getshoppingCartInfoByUserId(user_id)
        let ProductInfo = await shoppingCart.shoppingCartProductInfo(shoppingCartInfo)
        ctx.body = {
            code: '001',
            shoppingCartData: ProductInfo
        }
    },
    deleteShopingProducts: async ctx => {
        let { product_id } = ctx.request.body
        let user_id = ctx.user
        let isExistProduct = await shoppingcartmodel.findShoppingProductsById(user_id, product_id)
        if (isExistProduct.length === 0) {
            ctx.body = {
                code: '002',
                msg: '该商品不在购物车'
            }
            return
        }
        let deleteProduct = await shoppingcartmodel.deleteProductById(user_id, product_id)
        if (deleteProduct.affectedRows === 1) {
            ctx.body = {
                code: '001',
                msg: '删除购物车成功'
            }
        }
    },
}