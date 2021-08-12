import { Button, Fade, IconButton } from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import YouTubeIcon from '@material-ui/icons/YouTube'
import React, { useEffect, useState } from 'react'
import { fetchMovieDetails, fetchMovieVideos } from '../../service'
import { img, unavailableLandscape, youTubeUrl } from '../config/config'
import './ContentModal.css'

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 'auto',
    alignSelf: 'center',
  },
  close_btn: {
    position: 'absolute',
    top: 2,
    right: 5,
    fontSize: '5rem',
  },
}))

export default function ContentModal({ children, id }) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState()
  const [video, setVideo] = useState()

  const fetchDetails = async () => {
    const data = await fetchMovieDetails(id)
    setDetails(data)
    console.log(data)
  }

  const fetchVideos = async () => {
    const data = await fetchMovieVideos(id)
    setVideo(data.results[0]?.key)
  }

  useEffect(() => {
    fetchDetails()
    fetchVideos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div className="media" type="button" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {details && (
            <div
              className="modal_container"
              style={{
                backgroundImage: `${
                  details.backdrop_path
                    ? `url(${img}/${details.backdrop_path})`
                    : `url(${unavailableLandscape})`
                }`,
              }}
            >
              <IconButton
                className={classes.close_btn}
                aria-label="close"
                color="secondary"
                onClick={handleClose}
              >
                <CloseIcon style={{ fontSize: '2rem' }} />
              </IconButton>
              <div className="modal_body">
                <div className="modal_body_info">
                  <h1 className="modal_title">{details.title}</h1>
                  <div className="modal_movieDetails">
                    <span className="modal_releaseDate">
                      {details.release_date}
                    </span>
                    <span>
                      {details.genres.map((genre, index) =>
                        index === details.genres.length - 1
                          ? genre.name
                          : `${genre.name} / `
                      )}
                    </span>
                  </div>
                  {details.tagline && (
                    <h2 className="modal_tagline">"{details.tagline}"</h2>
                  )}
                  <p className="modal_overview">{details.overview}</p>
                  <Button
                    className={classes.button}
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`${youTubeUrl}${video}`}
                  >
                    Watch Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  )
}
