import { IconButton, InputAdornment, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import { useState } from 'react'
import { createTheme } from '@material-ui/core'
import { fetchSearch } from '../../service'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent/SingleContent'
import './Search.css'

const Search = () => {
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [content, setContent] = useState([])
  const [numOfPages, setNumOfPages] = useState()
  const [fetched, setFetched] = useState(false)

  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff',
      },
    },
  })

  const useStyles = makeStyles({
    search_bar: {
      width: '40%',
      display: 'block',
      margin: '0 auto',
    },
  })

  const classes = useStyles()

  const fetch = async () => {
    const data = await fetchSearch(page, searchText)
    if (data) {
      setContent(data.results)
      setNumOfPages(data.total_pages)
    }
    setFetched(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch()
  }

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.search_bar}
            label="Search"
            variant="filled"
            fullWidth
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={fetch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </ThemeProvider>
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
        {fetched && content.length === 0 && <h2>No Movies Found</h2>}
      </div>
      <div>
        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    </div>
  )
}

export default Search
