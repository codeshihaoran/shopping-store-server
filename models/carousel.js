const query = require('../utils/database')
module.exports = {
    Carousel: async () => {
        try {
            const sql = 'select * from carousel';
            return await query(sql, [])
        } catch (err) {
            console.log('error:', err);
        }
    }
}