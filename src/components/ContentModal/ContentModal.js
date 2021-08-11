import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import { fetchMovieDetails, fetchMovieVideos } from '../../service'
import {
  img,
  img_500,
  unavailable,
  unavailableLandscape,
  youTubeUrl,
} from '../config/config'
import YouTubeIcon from '@material-ui/icons/YouTube'
import { Button } from '@material-ui/core'
import './ContentModal.css'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: '90%',
    height: '80%',
    backgroundColor: '#39445a',
    border: '1px solid #282c34',
    color: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
  button: {
    width: '20%',
    margin: '0 auto',
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
        {details && (
          <div className={classes.paper}>
            <div className="ContentModal">
              <img
                className="ContentModal__portrait"
                src={
                  details.poster_path
                    ? `${img_500}/${details.poster_path}`
                    : unavailable
                }
                alt={details?.title}
              />
              <img
                className="ContentModal__landscape"
                src={
                  details.backdrop_path
                    ? `${img_500}/${details.backdrop_path}`
                    : unavailableLandscape
                }
                alt={details?.title}
              />
              <div className="ContentModal__about">
                <span className="ContentModal__title">
                  {details.title} (
                  {(details.release_date || '-----').substring(0, 4)})
                </span>
                {details.tagline && (
                  <i className="tagline">{details.tagline}</i>
                )}
                <span className="ContentModal__description">
                  {details.overview}
                </span>
                <div></div>

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
      </Modal>
    </>
  )
}
