import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Trending from './Pages/Trending/Trending'
import Movies from './Pages/Movies/Movies'
import Search from './Pages/Search/Search'
import Navbar from './components/NavBar/NavBar'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app">
        <div className="container">
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/search" component={Search} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
