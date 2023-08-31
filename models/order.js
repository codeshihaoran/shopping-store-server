const query = require('../utils/database')
module.exports = {
    addOrderInfoByProductInfo: async (length, orderInfo) => {
        let sql = 'insert into orders values(null,?,?,?,?,?,?)';
        console.log('orderInfoLength：', length);
        console.log('orderInfo：', orderInfo);
        for (let i = 0; i < length - 1; i++) {
            sql += ",(null,?,?,?,?,?,?)"
        }
        return await query(sql, orderInfo)
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