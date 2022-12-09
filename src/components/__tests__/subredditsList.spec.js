import React from "react"
import { rest } from "msw"
import { server } from "../../test/server"
import { render, screen, within } from "../../test/test-utils"
import SubredditsList from "../subredditsList"

describe("components/subredditsList", () => {
	it("renders a list of subreddits (@testing-library/react)", async () => {
		render(<SubredditsList />)

		screen.getByText("Loading List")
		const subrList = await screen.findByRole("list")

		const { getAllByRole } = within(subrList)
		const items = getAllByRole("listitem")
		expect(items.length > 0).toBeTruthy()
	})

	it("handles error response (@testing-library/react)", async () => {
		// force msw to return error response
		server.use(
			rest.get("https://www.reddit.com/subreddits.json", (req, res, ctx) => res(ctx.status(500)))
		)

		render(<SubredditsList />)

		screen.getByText("Loading List")

		await screen.findByText(`Can't load subreddits`)
	})
})
