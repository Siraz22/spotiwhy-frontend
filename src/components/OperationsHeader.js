import axios from 'axios';
import React, { useState } from 'react'
import { Form, Modal, Button, Row, Col, InputGroup, FormGroup, Alert } from 'react-bootstrap'
import { getYTInfoURL, getYTTreatedUrl, ytinfo } from './api/youtubeInfo';
import { v4 as uuid } from 'uuid'
import { useSongs } from './api/APIAxios';

function OperationsHeader() {

  const songsContext = useSongs();

  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false)

  const [ytURL, setYtURL] = useState('')
  const [ytInfoError, setYtInfoError] = useState(false)
  const [ytInfo, setYtInfo] = useState('')

  const [songName, setSongName] = useState('')
  const [songArtist, setSongArtist] = useState('')
  const [songThumbnailURL, setSongThumbnailURL] = useState('')

  function closeModal() {
    setYtInfoError(false)
    setYtInfo('')
    setShow(false)
    setLoading(false)
    setAlert(false)
  }

  function addSong() {
    let songObj = {
      songID: uuid(),
      songURL: getYTTreatedUrl(ytURL),
      songName: songName,
      songArtist: songArtist,
      songPhotoUrl: songThumbnailURL
    }

    songsContext.songAPIcalls.addSong(songObj)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  function AddSongModal() {

    return (
      <Modal show={show} onHide={() => setShow(false)}>
        <div className="customdarktheme">
          <Modal.Header>
            <Modal.Title>Song Summary</Modal.Title>
          </Modal.Header>
          <Modal.Body  >
            <Form>

              <img
                src={ytInfo.thumbnail_url}
              />

              <FormGroup>
                <Form.Group>
                  <Form.Label>Song Name</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      isValid={!ytInfoError}
                      isInvalid={ytInfoError}
                      placeholder="Paste the video URL here"
                      defaultValue={ytInfo.title}
                      autoFocus
                    />
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">Enter a Song name</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Artist Name</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      isValid={!ytInfoError}
                      isInvalid={ytInfoError}
                      placeholder="Paste the video URL here"
                      defaultValue={ytInfo.author_name}
                      autoFocus
                    />
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">Enter Artist Name</Form.Control.Feedback>
                </Form.Group>
              </FormGroup>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={addSong}>
              Save Song
            </Button>

          </Modal.Footer>
        </div>
      </Modal >
    )
  }

  // function processSearchQuery() {
  //   console.log("Processing YT link...")
  //   setLoading(true)
  //   const reqURL = getYTInfoURL(ytURL)

  //   axios.get(reqURL)
  //     .then(res => {
  //       setYtInfoError(false)
  //       setYtInfo(res.data)
  //       console.log("Treated url will be " + getYTTreatedUrl(ytURL))
  //       setLoading(false)
  //     })
  //     .catch(err => {
  //       setYtInfoError(true)
  //       setLoading(false)
  //     }
  //     )
  // }

  function addSongModal() {

    setLoading(true)

    const reqURL = getYTInfoURL(ytURL)

    axios.get(reqURL)
      .then(res => {
        setYtInfoError(false)
        setYtInfo(res.data)
        console.log("Treated url will be " + getYTTreatedUrl(ytURL))
        setLoading(false)
        setShow(true)
      })
      .catch(err => {
        setYtInfoError(true)
        setLoading(false)
        setAlert(true)
      }
      )
  }

  const [alert, setAlert] = useState(false);
  function closeAlert() {
    setAlert(false);
    setYtInfoError(false)
  }

  return (
    <React.Fragment>

      <div
        className=""
        style={{
          border: '0px solid'
        }}
      >

        <Row>

          <Col className="d-flex align-items-center justify-content-center">


            <Form>
              <InputGroup hasValidation>

                <Form.Control
                  isInvalid={ytInfoError}
                  onChange={(e) => { setYtURL(e.target.value) }} placeholder='Enter youtube URL'>
                </Form.Control>
              </InputGroup>
            </Form>

            {(ytURL === '' ? false : true) && <Button onClick={addSongModal}>Add Song</Button>}

            {alert && <Alert variant="danger" onClose={closeAlert} dismissible>
              <Alert.Heading>Error! You got an error!</Alert.Heading>
              <p>
                Check the URL again or your network connection
              </p>
            </Alert>}

          </Col>

        </Row>

        <AddSongModal />

      </div>

    </React.Fragment >
  )

}

export default OperationsHeader