import { Hono } from 'hono'
// @ts-ignore
import { getUsers, createUser } from './controllers/usersController.ts'

const app = new Hono()

app.get('/', (c) => {
	return c.text('Hello Hono!')
})

// 获取用户
app.get('/users', async (c) => {
	try {
		const current = parseInt(c.req.query('current') || '1', 10) // 当前页码，默认为 1
		const pageSize = parseInt(c.req.query('pageSize') || '10', 10) // 每页数量，默认为 10

		const result = await getUsers(current, pageSize)
		return c.json(result)
	} catch (error) {
		console.error('Error fetching users:', error)
		return c.json({ error: 'Failed to fetch users' }, 500)
	}
})

// 插入数据示例
app.post('/users', async (c) => {
	const body = await c.req.json()
	const { name, email } = body
	const result = await createUser(name, email)
	return c.json(result)
})

export default app
