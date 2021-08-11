import { useEffect } from 'react'
import { useState } from 'react'
import { fetchMoviesByGenre } from '../../service'
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/CustomPagination'
import Genres from '../../components/Genres/Genres'

const Movies = () => {
  const [page, setPage] = useState(1)
  const [content, setContent] = useState([])
  const [numOfPages, setNumOfPages] = useState()
  const [selectedGenre, setSelectedGenre] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchMoviesByGenre(page, selectedGenre.id)
      setContent(data.results)
      setNumOfPages(data.total_pages)
    }

    fetch()
  }, [page, selectedGenre])

  return (
    <div>
      <Genres
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        setPage={setPage}
      />
      <div className="flex wrap content">
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
