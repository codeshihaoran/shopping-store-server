const query = require('../utils/database')
module.exports = {
    addOrderInfoByProductInfo: async (orderInfoArr) => {
        const resultArr = []
        for (const orderInfo of orderInfoArr) {
            // 使用 orderInfo 中的属性构建 SQL 查询
            const sql = 'INSERT INTO orders (order_id, user_id,  product_id, product_num, product_price, order_time,order_phone,order_address,order_status) VALUES (?, ?, ?, ?, ?, ?,?,?,?)';
            // 执行查询，传入 orderInfo 中的值
            const result = await query(sql, [
                orderInfo.orderId,
                orderInfo.user_id,
                orderInfo.productID,
                orderInfo.num,
                orderInfo.price,
                orderInfo.orderTime,
                orderInfo.order_phone,
                orderInfo.order_address,
                orderInfo.order_status
            ]);
            resultArr.push(result)
        }
        return resultArr
    },
    getAllOrderId: async (user_id) => {
        let sql = 'select order_id from orders where user_id = ?';
        return await query(sql, [user_id]);
    },
    getOrderInfoByUserId: async (user_id) => {
        let sql = 'select * from orders where user_id =? order by order_time desc';
        return await query(sql, user_id)
    },
    getOrderProductInfoByProductId: async (product_id) => {
        let sql = 'select * from product where product_id=?'
        return await query(sql, [product_id])
    },
    searchOrderInfoByOrderId: async (data) => {
        let sql = 'select * from orders where '
        const values = []
        if (data.orderId) {
            sql += 'order_id =?'
            values.push(data.orderId)
        }
        if (data.receiver) {
            if (values.length > 0) {
                sql += 'AND order_phone=? '
                values.push(data.receiver)
            } else {
                sql += 'order_phone=?'
                values.push(data.receiver)
            }
        }
        if (data.payStatus) {
            if (values.length > 0) {
                sql += 'AND pay_status=?'
                values.push(data.payStatus)
            } else {
                sql += 'pay_status=?'
                values.push(data.payStatus)
            }

        }
        if (data.orderTime) {
            if (values.length > 0) {
                sql += 'AND order_time=?'
                values.push(data.orderTime)
            } else {
                sql += 'order_time=?'
                values.push(data.orderTime)
            }
        }
        console.log(values);
        return await query(sql, values)
    },
    getOderDetailsByOrderId: async (order_id) => {
        let sql = 'select * from orders where order_id=?'
        return await query(sql, order_id)
    }
}