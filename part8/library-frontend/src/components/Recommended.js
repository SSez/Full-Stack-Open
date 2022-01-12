import React from 'react'
import { useQuery } from '@apollo/client' 
import { ALL_BOOKS, FAVOURITES } from '../queries'
import GetBooks from './GetBooks'

const Books = (props) => {
  const booksResult = useQuery(ALL_BOOKS)
  const favourites = useQuery(FAVOURITES)

  if (!props.show || !booksResult.data || !favourites.data  ) {
    return null
  }

  const genre = favourites.data.user.favoriteGenre
  const recommendedBooks = booksResult.data.allBooks.filter(b => b.genres.includes(genre))

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <b>{genre}</b>
      </div>
      <GetBooks books={recommendedBooks} />
    </div>
  )
}

export default Books