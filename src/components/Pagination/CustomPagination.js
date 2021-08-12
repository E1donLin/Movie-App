import Pagination from '@material-ui/lab/Pagination'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import { createTheme } from '@material-ui/core'

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
})

const useStyle = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2em',
  },
})

const CustomPagination = ({ numOfPages, setPage }) => {
  const classes = useStyle()

  const handlePageChange = (event, page) => {
    setPage(page)
    window.scroll(0, 0)
  }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numOfPages}
          onChange={handlePageChange}
          color="primary"
        />
      </ThemeProvider>
    </div>
  )
}

CustomPagination.defaultProps = {
  numOfPages: 10,
}

export default CustomPagination
