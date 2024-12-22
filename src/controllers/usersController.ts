import { pool } from '../dbConfig.js'
import { type ResultSetHeader, type RowDataPacket } from 'mysql2/promise'

export async function getUsers(current: number, pageSize: number) {
	const offset = (current - 1) * pageSize
	const [rows] = await pool.query('SELECT * FROM users LIMIT ? OFFSET ?', [pageSize, offset])
	const [countResult] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) as total FROM users')
	const total = countResult[0].total
	return {
		data: rows,
		pagination: {
			total,
			current,
			pageSize,
			totalPages: Math.ceil(total / pageSize),
		},
	}
}

export async function createUser(name: string, email: string) {
	const [result] = await pool.query<ResultSetHeader>(
		'INSERT INTO users (name, email) VALUES (?, ?)',
		[name, email],
	)
	return { id: result.insertId }
}
