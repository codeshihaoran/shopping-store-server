// 数据库连接
const mysql = require('mysql')
const { dbConfig } = require('../config')
// 创建mysql的连接
const pool = mysql.createPool(dbConfig)
console.log("数据库连接配置：", dbConfig);
// 对数据增删改查封装为一个函数使用

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
                console.log('getConnection error:', err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    console.log('connection query sql+values', sql, values);
                    if (err) {
                        reject(err)
                        console.log('connection query error:', err);
                    } else {
                        resolve(rows)
                        console.log('connection query result', rows);

                    }
                    connection.release()
                })
            }
        })
    })

}
// 导出query
module.exports = query
