const query = require('../utils/database')
module.exports = {
    addOrderInfoByProductInfo: async (orderInfoArr) => {
        const resultArr = []
        for (const orderInfo of orderInfoArr) {
            // 使用 orderInfo 中的属性构建 SQL 查询
            const sql = 'INSERT INTO orders (order_id, user_id,  product_id, product_num, product_price, order_time) VALUES (?, ?, ?, ?, ?, ?)';
            // 执行查询，传入 orderInfo 中的值
            const result = await query(sql, [
                orderInfo.orderId,
                orderInfo.user_id,
                orderInfo.productID,
                orderInfo.num,
                orderInfo.price,
                orderInfo.orderTime,
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
    }
}