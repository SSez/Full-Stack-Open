import React from 'react'

const GetBooks = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>
            author
          </th>
          <th>
            published
          </th>
        </tr>
        {props.books.map(x =>
          <tr key={x.title}>
            <td>{x.title}</td>
            <td>{x.author.name}</td>
            <td>{x.published}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default GetBooks