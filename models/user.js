const query = require('../utils/database')
module.exports = {
    checkIsExistUserByUserName: async (userName) => {
        let sql = 'select * from users where user_name= ?'
        return await query(sql, [userName])
    },
    userRegisterByUserInfo: async (userName, password) => {
        let sql = 'insert into users values(null,?,?,null)'
        return await query(sql, [userName, password])
    },
    userLoginByUserInfo: async (userName, password) => {
        let sql = 'select * from users where user_name=? AND user_password= ?'
        return await query(sql, [userName, password])
    },
    getUserById: async (userId) => {
        let sql = 'select * from users where user_id= ?'
        return await query(sql, [userId])
    },
    getUserInfo: async () => {
        let sql = 'select * from users'
        return await query(sql)
    }
}