const query = require('../utils/database')
module.exports = {
    checkIsExistUserByUserName: async (userName) => {
        let sql = 'select * from users where userName= ?'
        return await query(sql, [userName])
    },
    userRegisterByUserInfo: async (userName, password) => {
        let sql = 'insert into users values(null,?,?,null)'
        return await query(sql, [userName, password])
    },
    userLoginByUserInfo: async (userName, password) => {
        let sql = 'select * from users where userName=? AND password= ?'
        return await query(sql, [userName, password])
    }
}