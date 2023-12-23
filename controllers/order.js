const ordermodel = require('../models/order')
const shoppingcartmodel = require('../models/shoppingcart')
const usermodel = require('../models/user')
module.exports = {
    addProductsToOrder: async ctx => {
        const { products, order_address, order_status } = ctx.request.body
        console.log('订单地址：', order_address);
        const order_phone = ctx.user.user_phone
        const user_id = ctx.user.user_id
        const orderTime = new Date().getTime();
        const orderId = +("" + user_id + orderTime);
        const orderInfo = []
        for (let i = 0; i < products.length; i++) {
            const item = products[i];
            const orderProductInfo = {
                orderId,
                user_id,
                productID: item.productID,
                num: item.num,
                price: item.price,
                orderTime,
                order_address,
                order_phone,
                order_status
            };
            orderInfo.push(orderProductInfo);
        }
        let addOrderInfo = await ordermodel.addOrderInfoByProductInfo(orderInfo)
        if (addOrderInfo.length == products.length) {
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
        const user_id = ctx.user.user_id
        const allOrderId = await ordermodel.getAllOrderId(user_id)
        console.log('AllOrderId: ', allOrderId);
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
    },
    editOrderInfo: async ctx => {
        const { order_id, order_status } = ctx.request.body
        const updataOrderInfo = await ordermodel.updateOrderInfoByStatus(order_status, order_id)
        if (updataOrderInfo.affectedRows > 0) {
            ctx.body = {
                code: '001',
                msg: '已支付成功！感谢您的支持'
            }
        }
    },
    // ADmin
    getAllOrderInfo: async ctx => {
        const userInfo = await usermodel.getUserInfo()
        let allOrderInfo = []
        for (let i = 0; i < userInfo.length; i++) {
            const user_id = userInfo[i].user_id
            const orderInfo = await ordermodel.getOrderInfoByUserId(user_id)
            for (let j = 0; j < orderInfo.length; j++) {
                orderInfo[j].user_name = userInfo[i].user_name
            }
            allOrderInfo.push(orderInfo)
        }
        const allOrder = allOrderInfo.flat()
        for (let i = 0; i < allOrder.length; i++) {
            const item = allOrder[i]
            const productInfo = await ordermodel.getOrderProductInfoByProductId(item.product_id)
            const product_title = productInfo[0].product_title
            item.product_title = product_title
            const orderTime = new Date(item.order_time)
            const year = orderTime.getFullYear()
            const month = orderTime.getMonth()
            const day = orderTime.getDate()
            const hour = orderTime.getHours()
            const minutes = orderTime.getMinutes()
            const second = orderTime.getSeconds()
            const nowTime = `${year}-${month}-${day} ${hour}:${minutes}:${second}`
            item.order_time = nowTime
        }
        ctx.body = {
            code: '001',
            data: allOrder
        }
    },
    getOrderDetails: async ctx => {
        const { order_id } = ctx.request.body
        const orderDetails = await ordermodel.getOderDetailsByOrderId(order_id)
        const user = await usermodel.getUserById(orderDetails[0].user_id)
        for (let i = 0; i < orderDetails.length; i++) {
            let item = orderDetails[i]
            item.user_name = user[0].user_name
            const product = await ordermodel.getOrderProductInfoByProductId(item.product_id)
            item.product_image = product[0].product_picture
            item.product_name = product[0].product_name
            item.product_title = product[0].product_title
            item.product_intro = product[0].product_intro
        }
        console.log('xxxxxxxxxx', orderDetails);
        ctx.body = {
            code: '001',
            orderDetails
        }
    },
    searchOrderId: async ctx => {
        const data = ctx.request.body
        console.log('request data：', data);
        const searchOrderInfo = await ordermodel.searchOrderInfoByOrderId(data)
        if (searchOrderInfo.length > 0) {
            for (let i = 0; i < searchOrderInfo.length; i++) {
                const item = searchOrderInfo[i]
                const user = await usermodel.getUserById(item.user_id)
                const user_name = user[0].user_name
                item.user_name = user_name
                const productInfo = await ordermodel.getOrderProductInfoByProductId(item.product_id)
                const product_title = productInfo[0].product_title
                item.product_title = product_title
                const orderTime = new Date(item.order_time)
                const year = orderTime.getFullYear()
                const month = orderTime.getMonth()
                const day = orderTime.getDate()
                const hour = orderTime.getHours()
                const minutes = orderTime.getMinutes()
                const second = orderTime.getSeconds()
                const nowTime = `${year}-${month}-${day} ${hour}:${minutes}:${second}`
                item.order_time = nowTime
            }
            console.log('search orderInfo：', searchOrderInfo);
            ctx.body = {
                code: '001',
                searchOrderInfo
            }
        } else {
            ctx.body = {
                code: '004',
                message: '并未查询到订单信息'
            }
        }

    },
    getOrderSale: async ctx => {
        const orderList = await ordermodel.getAllorderList()
        const user = await usermodel.getUserInfo()
        const userSum = user.length
        console.log('orderList：', orderList);
        console.log('userLength：', userSum);
        let saleSum = 0
        let salePrice = 0
        for (let i = 0; i < orderList.length; i++) {
            const item = orderList[i]
            saleSum += item.product_num
            const price = item.product_num * item.product_price
            salePrice += price
        }

        ctx.body = {
            code: '001',
            userSum,
            saleSum,
            salePrice
        }
    }
}