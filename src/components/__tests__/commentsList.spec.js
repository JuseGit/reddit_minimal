import React from "react"
import { rest } from "msw"
import { server } from "../../test/server"
import { render, screen, within } from "../../test/test-utils"
import CommentsList from "../commentsList"

describe("components/postsList", () => {
	it("renders a list of comments (@testing-library/react)", async () => {
		render(<CommentsList subreddit={"subredditTest"} postID={"postIDtest"} skip={false} />)

		screen.getAllByTestId("dummy-comment-listitem")

		const commentsList = await screen.findByRole("list")
		const { getAllByTestId } = within(commentsList)
		const items = getAllByTestId("comment-listitem")

		expect(items.length > 0).toBeTruthy()
	})

	it("handles error response (@testing-library/react)", async () => {
		// force msw to return error response
		server.use(
			rest.get(
				"https://www.reddit.com/r/subredditTest/comments/postIDtest.json",
				(req, res, ctx) => res(ctx.status(500))
			)
		)

		render(<CommentsList subreddit={"subredditTest"} postID={"postIDtest"} skip={false} />)

		screen.getAllByTestId("dummy-comment-listitem")

		await screen.findByText(`Can't load comments.`)
	})
})
