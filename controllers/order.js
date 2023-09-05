const ordermodel = require('../models/order')
const shoppingcartmodel = require('../models/shoppingcart')
module.exports = {
    addProductsToOrder: async ctx => {
        const { products } = ctx.request.body
        const user_id = ctx.user
        const orderTime = new Date().getTime();
        const orderId = +("" + user_id + orderTime);
        const orderInfo = []
        for (let i = 0; i < products.length; i++) {
            const item = products[i]
            // 方案1
            const orderProductInfo = [orderId, user_id, item.productID, item.num, item.price, orderTime]
            orderInfo.push(...orderProductInfo)
        }
        let addOrderInfo = await ordermodel.addOrderInfoByProductInfo(products.length, orderInfo)
        if (addOrderInfo.affectedRows == products.length) {
            for (let i = 0; i < products.length; i++) {
                // 生成订单后要在数据库中删除购物车
                const item = products[i]
                await shoppingcartmodel.deleteProductById(user_id, item.productID)
            }
            ctx.body = {
                code: '001',
                msg: '购买成功'
            }
        } else {
            ctx.body = {
                code: '004',
                msg: '购买失败,未知原因'
            }
        }

    },
    getOrderInfo: async ctx => {
        const user_id = ctx.user
        const allOrderId = await ordermodel.getAllOrderId(user_id)
        if (allOrderId.length === 0) {
            ctx.body = {
                code: '002',
                msg: '该用户没有订单信息'
            }
            return
        }
        const getOrderInfo = await ordermodel.getOrderInfoByUserId(user_id)
        const allOrderList = []
        for (let i = 0; i < allOrderId.length; i++) {
            const orderId = allOrderId[i]
            let itemOrder = []
            for (let j = 0; j < getOrderInfo.length; j++) {
                const orderInfo = getOrderInfo[j]
                if (orderId.order_id == orderInfo.order_id) {
                    const orderProductInfo = await ordermodel.getOrderProductInfoByProductId(orderInfo.product_id)
                    orderInfo.product_name = orderProductInfo[0].product_name
                    orderInfo.product_picture = orderProductInfo[0].product_picture
                    itemOrder.push(orderInfo)

                }
            }
            allOrderList.push(itemOrder)
        }
        ctx.body = {
            code: '001',
            orders: allOrderList
        }
    }
}