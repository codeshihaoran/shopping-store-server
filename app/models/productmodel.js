const query = require('../../untils/database')

module.exports = {
    hotProduct: async (categoryID) => {
        let sql = 'select * from product'
        return await query(sql, categoryID)
    },
    promoProduct: async (categoryID) => {
        let sql = 'select * from product '
        return await query(sql, categoryID)
    },
    getcategoryID: async (categoryName) => {
        let sql = 'select * from category where category_name= ?'
        const category = await query(sql, categoryName);
        console.log(category);
        return category.category_id
    }
}