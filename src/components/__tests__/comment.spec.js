import React from "react"
import { render, screen } from "../../test/test-utils"
import Comment from "../comment"

describe("components/comment", () => {
	it("renders a comment (@testing-library/react)", () => {
		render(<Comment isDummy={false} />)

		screen.getByTestId("comment-data")
	})

	it("renders a dummy post (@testing-library/react)", () => {
		render(<Comment isDummy={true} />)

		screen.getByTestId("dummy-comment-data")
	})
})
