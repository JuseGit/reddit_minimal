import React from "react"
import { render, screen } from "../../test/test-utils"
import Post from "../post"

const postData = {
	id: "post-test-id",
	name: "post-test-name",
	subreddit: "subreddit-test-name",
	author: "author-test-name",
	topic: "topic-test-name",
	time_frame: 12,
	n_comments: 12,
	img_url: "test-url",
	votes: 5,
}

describe("components/post", () => {
	it("renders a post (@testing-library/react)", () => {
		render(<Post isDummy={false} />)

		screen.getByTestId("post-data")
	})

	it("renders a dummy post (@testing-library/react)", () => {
		render(<Post isDummy={true} />)

		screen.getByTestId("dummy-post-data")
	})
})
