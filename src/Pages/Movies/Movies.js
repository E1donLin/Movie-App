import { useEffect } from 'react'
import { useState } from 'react'
import { fetchMoviesByGenre } from '../../service'
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/CustomPagination'
import Genres from '../../components/Genres/Genres'
import useGenre from '../../hooks/useGenre'

const Movies = () => {
  const [page, setPage] = useState(1)
  const [content, setContent] = useState([])
  const [numOfPages, setNumOfPages] = useState()
  const [selectedGenres, setSelectedGenres] = useState([])
  const [genres, setGenres] = useState([])
  const genreforUrl = useGenre(selectedGenres)

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchMoviesByGenre(page, genreforUrl)
      setContent(data.results)
      setNumOfPages(data.total_pages)
    }

    fetch()
  }, [page, genreforUrl])

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres
        selectedGenres={selectedGenres}
        genres={genres}
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title}
              date={c.release_date}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomPagination numOfPages={numOfPages} setPage={setPage} />
    </div>
  )
}

export default Movies
