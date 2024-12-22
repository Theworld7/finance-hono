import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config()

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306, // 转换为数字，设置默认值
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
})

export { pool }
