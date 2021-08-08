import { Chip } from '@material-ui/core'
import { useEffect } from 'react'
import { fetchGenres } from '../../service'

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
}) => {
  const fetch = async () => {
    const data = await fetchGenres()
    setGenres(data.genres)
  }

  useEffect(() => {
    fetch()
    return () => {
      setGenres({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre])
    setGenres(genres.filter((g) => g.id !== genre.id))
    setPage(1)
  }

  const handleRemove = (genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id))
    setGenres([...genres, genre])
    setPage(1)
  }

  return (
    <div style={{ padding: '6px 0' }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            color="primary"
            style={{ margin: 2 }}
            clickable
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            style={{ margin: 2 }}
            clickable
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  )
}

export default Genres
