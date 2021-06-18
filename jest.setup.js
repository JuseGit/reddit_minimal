import { rest } from 'msw';
import { setupServer } from 'msw/node';


const server = setupServer (
	rest.get('https://www.reddit.com/subreddits.json', (req, res, ctx) => {
		const query = req.url.searchParams;
		const limit = query.get("limit");
		const t = query.get("t");

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

// Establish API mocking before all tests.
beforeAll(() => {
	server.listen({onUnhandledRequest: 'warn'});
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())
