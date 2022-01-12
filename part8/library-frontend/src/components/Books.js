import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import GetBooks from './GetBooks'

const Books = (props) => {
  const allbooksResult = useQuery(ALL_BOOKS)
  const [bookGenres, bookGenreResults] = useLazyQuery(ALL_BOOKS)

  const [books, setBooks] = useState(null)
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])

  useEffect(() => {
    if (allbooksResult.data && allbooksResult.data.allBooks && !genre) {
      const books = allbooksResult.data.allBooks
      setBooks(books)
      const addGenres = [...new Set(books.map(b => b.genres).flat().filter(b => b).sort())]
      setGenres(addGenres)
    }
  }, [allbooksResult.data, genre])

  useEffect(() => {
    if (bookGenreResults.data) {
      setBooks(bookGenreResults.data.allBooks)
    }
    
  }, [bookGenreResults.data])

  if (!props.show || !books) {
    return null
  }

  const handleGenreClick = (newGenre) => {
    setGenre(newGenre)
    bookGenres({ variables: { genre: newGenre }})   
  }

  return (
    <div>
      <h2>books</h2> 
      {genre&&
        <div>
          in genre <b>{genre}</b>
        </div>
      }
      <GetBooks books={books} />
      <div>
        {genres.map(x => 
          <button key={x} onClick={() => handleGenreClick(x)}>
            {x}
          </button>
        )}
        <button onClick={() => handleGenreClick(null)}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books