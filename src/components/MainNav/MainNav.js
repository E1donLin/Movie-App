import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import MovieIcon from '@material-ui/icons/Movie'
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#2d313a',
    zIndex: 100,
  },
})

export default function MainNav() {
  const classes = useStyles()

  return (
    <BottomNavigation showLabels className={classes.root}>
      <BottomNavigationAction
        style={{ color: 'white' }}
        label="Trending"
        icon={<WhatshotIcon />}
        component={Link}
        to="/"
      />

      <BottomNavigationAction
        style={{ color: 'white' }}
        label="Movies"
        icon={<MovieIcon />}
        component={Link}
        to="/movies"
      />
      <BottomNavigationAction
        style={{ color: 'white' }}
        label="Search"
        icon={<SearchIcon />}
        component={Link}
        to="/search"
      />
    </BottomNavigation>
  )
}
