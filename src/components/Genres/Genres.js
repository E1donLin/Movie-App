import { useState, useEffect } from 'react'
import { fetchGenres } from '../../service'
import './Genres.css'

const Genres = ({ selectedGenre, setSelectedGenre, setPage }) => {
  const [genres, setGenres] = useState([])
  const [show, setShow] = useState(false)

  const fetch = async () => {
    const data = await fetchGenres()
    setGenres(data.genres)
  }

  useEffect(() => {
    fetch()
    setGenres({})
  }, [])

  const handleSelectedGenre = (genre) => {
    setSelectedGenre(genre)
    setPage(1)
    setShow(false)
  }

  return (
    <div className="genre_container">
      <div className="dropdown">
        <button className="btn" onClick={() => setShow(!show)}>
          Genres
          <span className="arrow"></span>
        </button>
        {selectedGenre && <h2 className="genre_title">{selectedGenre.name}</h2>}
      </div>

      {show && (
        <div className="genre_menu">
          <ul>
            {genres.map((genre) => (
              <button
                key={genre.id}
                className="genre"
                onClick={() => handleSelectedGenre(genre)}
              >
                {genre.name}
              </button>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Genres
