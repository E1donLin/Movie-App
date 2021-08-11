import { useEffect } from 'react'
import { useState } from 'react'
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/CustomPagination'
import { fetchTrending } from '../../service'
import './Trending.css'

const Trending = () => {
  const [content, setContent] = useState([])
  const [page, setPage] = useState(1)
  const [numOfPages, setNumOfPages] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchTrending(page)
      setContent(data.results)
      setNumOfPages(data.total_pages)
    }
    fetch()
  }, [page])

  return (
    <div>
      <h2 className="pageTitle">Trending</h2>
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
      {numOfPages > 1 && (
        <CustomPagination numOfPages={numOfPages} setPage={setPage} />
      )}
    </div>
  )
}

export default Trending
