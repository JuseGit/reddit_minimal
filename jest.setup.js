import "whatwg-fetch"
import { server } from "./src/test/server"
import { api } from "./src/store/services/api"
import { setupStore } from "./src/store/storeSetup"

const store = setupStore({})

// Establish API mocking before all tests.
beforeAll(() => {
	server.listen({ onUnhandledRequest: "warn" })
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
	server.resetHandlers()
	// This is the solution to clear RTK Query cache after each test
	store.dispatch(api.util.resetApiState())
})

// Clean up after the tests are finished.
afterAll(() => server.close())
