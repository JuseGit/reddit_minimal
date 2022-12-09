import { api } from '../api'

const initialState = {
    "config": {
        "focused": true,
        "keepUnusedDataFor": 5,
        "middlewareRegistered": false,
        "online": true,
        "reducerPath": "redditApi",
        "refetchOnFocus": false,
        "refetchOnMountOrArgChange": false,
        "refetchOnReconnect": false,
    },
    "mutations": {},
    "provided": {},
    "queries": {},
    "subscriptions": {}
}

describe('services/api', () => {

	it('should return initial state', () => {
		expect(api.reducer(undefined, {})).toEqual(initialState);
	})
})