// 全局配置
const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    Port: 3000,
    dbConfig: {
        connectionLimit: 10,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        ssl: {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true
        }
    }
}