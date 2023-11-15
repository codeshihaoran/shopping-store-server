const query = require('../utils/database')
module.exports = {
    getViewCate: async () => {
        let sql = 'select * from view_category'
        return await query(sql, [])
    }
}