import { Badge } from '@material-ui/core'
import { img_300, unavailable } from '../config/config'
import ContentModal from '../ContentModal/ContentModal'
import './SingleContent.css'

const SingleContent = ({ id, poster, title, date, vote_average }) => {
  return (
    <ContentModal id={id}>
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? 'primary' : 'secondary'}
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">{date}</span>
    </ContentModal>
  )
}

export default SingleContent
