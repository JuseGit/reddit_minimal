import React from "react"
import { rest } from "msw"
import { server } from "../../test/server"
import { render, screen, within } from "../../test/test-utils"
import PostsList from "../postsList"

describe("components/postsList", () => {
	it("renders a list of posts (@testing-library/react)", async () => {
		render(<PostsList subreddit={"subredditTest"} filterText={""} />)

		screen.getAllByTestId("dummy-post-listitem")

		const postsList = await screen.findByRole("list")
		const { getAllByTestId } = within(postsList)
		const items = getAllByTestId("post-listitem")

		expect(items.length > 0).toBeTruthy()
	})

	it("handles error response (@testing-library/react)", async () => {
		// force msw to return error response
		server.use(
			rest.get("https://www.reddit.com/r/subredditTest.json", (req, res, ctx) =>
				res(ctx.status(500))
			)
		)

		render(<PostsList subreddit={"subredditTest"} filterText={""} />)

		screen.getAllByTestId("dummy-post-listitem")

		await screen.findByText(`Can't load posts.`)
	})
})
