const ordermodel = require('../models/order')
const shoppingcartmodel = require('../models/shoppingcart')
module.exports = {
    addProductsToOrder: async ctx => {
        let { user_id, products } = ctx.body.request
        const orderTime = new Date().getTime();
        const orderID = +("" + user_id + orderTime);
        let orderInfo = []
        for (let i = 0; i < products.length; i++) {
            const item = products[i]
            let orderProductInfo = [orderID, user_id, item.productID, item.num, item.price, orderTime]
            orderInfo.push(orderProductInfo)
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
        let { user_id } = ctx.request.body
        let allOrderId = await ordermodel.getAllOrderId(user_id)
        if (allOrderId.length === 0) {
            ctx.body = {
                code: '002',
                msg: '该用户没有订单信息'
            }
            return
        }
        const getOrderInfo = await ordermodel.getOrderInfoByUserId(user_id)
        let allOrderList = []
        for (let i = 0; i < allOrderId.length; i++) {
            const orderId = allOrderId[i]
            let itemOrder = []
            for (let j = 0; j < getOrderInfo.length; j++) {
                const orderInfo = getOrderInfo[j]
                if (orderId.order_id == orderInfo.order_id) {
                    const orderProductInfo = await ordermodel.getOrderProductInfoByProductId(orderInfo.product_id)
                    orderInfo.product_name = orderProductInfo.product_name
                    orderInfo.product_picture = orderProductInfo.product_picture
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