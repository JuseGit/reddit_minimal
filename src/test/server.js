import { rest } from 'msw'
import { setupServer } from 'msw/node'


const server = setupServer (
	rest.get('https://www.reddit.com/subreddits.json', (req, res, ctx) => {
		const query = req.url.searchParams
		const limit = query.get("limit")
		const t = query.get("t")

		return res (
			ctx.status(200),
			ctx.json( {data: {children: [{data: {name: 'testkey', subreddit:'test'}}] }} )
		)
	}),
	rest.get('https://www.reddit.com/r/subredditTest.json', (req, res, ctx) => {

		return res (
			ctx.status(200),
			ctx.json( {data: {children: [{data: {name: 'testkey'}}] }} )
		)
	}),

	rest.get('https://www.reddit.com/r/subredditTest/comments/postIDtest.json', (req, res, ctx) => {

		return res (
			ctx.status(200),
			ctx.json( [{}, {data: {children: [{kind:'test_kind', data: {link_id: 'link_id', id: 'testkey'}}] }}] )
		)
	})
)

export { server }