const query = require('../utils/database')
module.exports = {
    addProductById: async (user_id, product_id) => {
        let sql = 'insert into collect values(null,?,?)'
        return await query(sql, [user_id, product_id])
    },
    findProductById: async (user_id, product_id) => {
        let sql = 'select * from collect where user_id=? AND product_id= ?'
        return await query(sql, [user_id, product_id])
    },
    getProductIdByUserId: async (user_id) => {
        let sql = 'select * from collect where user_id= ?'
        return await query(sql, [user_id])
    },
    getProductsByProductId: async (item) => {
        let sql = 'select * from product where product_id= ?'
        return await query(sql, [item])
    }
}