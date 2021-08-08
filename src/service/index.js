import axios from 'axios'

const apiKey = '2acd58afabc64bedadbd437b54c74b10'
const url = 'https://api.themoviedb.org/3'
const trendingUrl = `${url}/trending/movie/day`
const moviesUrl = `${url}/discover/movie`
const genreUrl = `${url}/genre/movie/list`
const searchUrl = `${url}/search/movie`
const movieDetailUrl = `${url}/movie`

export const fetchTrending = async (page) => {
  try {
    const { data } = await axios.get(trendingUrl, {
      params: {
        api_key: apiKey,
        page: page,
      },
    })

    return data
  } catch (error) {}
}

export const fetchMoviesByGenre = async (page, genre_id) => {
  try {
    const { data } = await axios.get(moviesUrl, {
      params: {
        api_key: apiKey,
        page: page,
        with_genres: genre_id,
      },
    })

    return data
  } catch (error) {}
}

export const fetchGenres = async () => {
  try {
    const { data } = await axios.get(genreUrl, {
      params: {
        api_key: apiKey,
      },
    })

    return data
  } catch (error) {}
}

export const fetchSearch = async (page, searchText) => {
  try {
    const { data } = await axios.get(searchUrl, {
      params: {
        api_key: apiKey,
        page: page,
        query: searchText ? searchText : '',
      },
    })
    return data
  } catch (error) {}
}

export const fetchMovieDetails = async (id) => {
  try {
    const { data } = await axios.get(`${movieDetailUrl}/${id}`, {
      params: {
        api_key: apiKey,
      },
    })

    return data
  } catch (error) {}
}

export const fetchMovieVideos = async (id) => {
  try {
    const { data } = await axios.get(`${movieDetailUrl}/${id}/videos`, {
      params: {
        api_key: apiKey,
      },
    })
    return data
  } catch (error) {}
}
