import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

const Navbar = () => {
  return (
    <header>
      <nav className="container">
        <div className="menu">
          <div className="logo">
            <a href="/">doki</a>
          </div>
          <div className="nav_links">
            <ul className="flex">
              <li className="nav_link">
                <Link to="/movies">Movies</Link>
              </li>
              <li className="nav_link">
                <Link to="/search">Search</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
