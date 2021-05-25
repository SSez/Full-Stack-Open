import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const user = {
  username: 'root',
  name: 'admin'
}

const blog = {
    title: "Hello world",
    author: "hackerman",
    url: "github.com",
    user: {
      name: "root",
    },
}

describe("Blogs view", () => {
  let component
  const mockHandler = jest.fn()
  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} like={mockHandler}/>)
  })

  test("renders only title and author", () => {
    expect(component.container).toHaveTextContent("Hello world");
    expect(component.container).toHaveTextContent("hackerman");
  })

  test("view button: childrens are displayed", () => {
    const button = component.getByText("view")
    fireEvent.click(button)
    const div = component.container.querySelector(".togglableContent")
    expect(div).not.toHaveStyle("display: none")
  })

  test('clicking the like button twice', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const btnLike = component.getByText('like')
    fireEvent.click(btnLike)
    fireEvent.click(btnLike)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})