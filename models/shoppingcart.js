const query = require('../utils/database')
module.exports = {
    findShoppingProductsById: async (user_id, product_id) => {
        let sql = 'select * from shoppingCart where user_id=? AND product_id= ?'
        return await query(sql, [user_id, product_id])
    },
    getshoppingCartInfoByUserId: async (user_id) => {
        let sql = 'select * from shoppingcart where user_id= ?'
        return await query(sql, [user_id])
    },
    getproductsInfoByProductId: async (product_id) => {
        let sql = 'select * from product where product_id=?'
        return await query(sql, [product_id])
    },
    addshopingProductsById: async (user_id, product_id) => {
        let sql = 'insert into shoppingcart values(null,?,?,1)'
        return await query(sql, [user_id, product_id])
    },
    updateShoppingCartByProductNum: async (productNum, user_id, product_id) => {
        let sql = 'update shoppingCart set num =? where user_id =? and product_id =?'
        return await query(sql, [productNum, user_id, product_id])
    },
    deleteProductById: async (user_id, product_id) => {
        let sql = 'delete from shoppingcart where user_id=? AND product_id=?'
        return await query(sql, [user_id, product_id])
    }
}