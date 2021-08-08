import { Container } from '@material-ui/core'
import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import MainNav from './components/MainNav/MainNav'
import Trending from './Pages/Trending/Trending'
import Movies from './Pages/Movies/Movies'
import Search from './Pages/Search/Search'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <MainNav />
    </BrowserRouter>
  )
}

export default App
