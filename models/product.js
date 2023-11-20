const query = require('../utils/database')

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
    getAllproductsByCategoryId: async (categoryID, index, pagesize) => {
        let sql = `select * from product limit ${index}, ${pagesize} `
        return await query(sql, categoryID)
    },
    getCategoryIdByName: async (categoryName) => {
        console.log('modelproduct getcategoryID categoryName: ', categoryName);
        let sql = 'select * from `category` where `category_name`= ?'
        const category = await query(sql, [categoryName]);
        console.log("modelproduct getcategoryID category: ", category);
        console.log("modelproduct getcategoryID category category_id: ", category[0].category_id);
        return category[0].category_id
    },
    getCategory: async () => {
        let sql = 'select * from category where category_id > 0 AND category_id < 9'
        return await query(sql, [])
    },
    getProductsBycategoryId: async (categoryID, index, pageSize) => {
        let sql = `select * from product where category_id= ? limit ${index}, ${pageSize}`
        return await query(sql, categoryID)
    },
    getProductDetailsByProductId: async (productId) => {
        let sql = 'select * from product where product_id= ?'
        return await query(sql, productId)
    },
    getProductDetailPicturesByProductId: async (productId) => {
        let sql = 'select * from product_picture where product_id= ?'
        return await query(sql, productId)
    },
    getAllProductsTotals: async () => {
        let sql = 'select * from product'
        return await query(sql)
    },
    deleteProductByProductId: async (productId) => {
        let sql = 'delete from product where product_id=?'
        return await query(sql, productId)
    }
}