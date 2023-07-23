// 数据库连接
const mysql = require('mysql')
const { dbConfig } = require('../config')
// 创建mysql的连接
const pool = mysql.createPool(dbConfig)

// 对数据增删改查封装为一个函数使用
let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

}
// 导出query
module.exports = query
