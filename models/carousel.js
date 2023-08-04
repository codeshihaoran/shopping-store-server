const query = require('../utils/database')
module.exports = {
    Carousel: async () => {
        const sql = 'select * from carousel';
        return await query(sql, [])
    }
}