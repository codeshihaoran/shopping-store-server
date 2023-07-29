const query = require('../../untils/database')

module.exports = {
    getHotProductsByCategoryId: async (categoryID) => {
        let sql = 'select * from product where category_id= ? or category_id= ? or category_id= ? '
        sql = sql + "order by product_sales desc limit 0, 7 "
        return await query(sql, categoryID)
    },
    getPromoProductsByCategoryId: async (categoryID) => {
        let sql = 'select * from `product` where `category_id`= ?'
        return await query(sql, categoryID)
    },
    getCategoryIdbyName: async (categoryName) => {
        console.log('modelproduct getcategoryID categoryName: ', categoryName);
        let sql = 'select * from `category` where `category_name`= ?'
        const category = await query(sql, [categoryName]);
        console.log("modelproduct getcategoryID category: ", category);
        console.log("modelproduct getcategoryID category category_id: ", category[0].category_id);
        return category[0].category_id

    }
}