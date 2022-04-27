import axios from 'axios';
import React, { useState } from 'react'
import { Form, Modal, Button, Row, Col, InputGroup, FormGroup } from 'react-bootstrap'
import { getYTInfoURL, getYTTreatedUrl, ytinfo } from './api/youtubeInfo';
import { v4 as uuid } from 'uuid'
import { useSongs } from './api/APIAxios';

function OperationsHeader() {

  const songsContext = useSongs();

  const [show, setShow] = useState(false);

  const [ytURL, setYtURL] = useState('')
  const [ytInfoError, setYtInfoError] = useState(true)
  const [ytInfo, setYtInfo] = useState('')

  const [songName, setSongName] = useState('')
  const [songArtist, setSongArtist] = useState('')
  const [songThumbnailURL, setSongThumbnailURL] = useState('')

  function closeModal() {
    setYtInfoError(true)
    setShow(false)
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
          <Modal.Header closeVariant='white' closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body  >
            <Form>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Song URL</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    isValid={!ytInfoError}
                    isInvalid={ytInfoError}
                    placeholder="Paste the video URL here"
                    defaultValue={ytURL}
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">Incorrect URL. Try a new one</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              {console.log(ytInfo)}

              {!ytInfoError && <FormGroup>
                <Form.Label>Song Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    isValid={!ytInfoError}
                    isInvalid={ytInfoError}
                    placeholder="Paste the video URL here"
                    defaultValue={ytInfo.title}
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">Enter a Song name</Form.Control.Feedback>

                  <Form.Label>Artist Name</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      isValid={!ytInfoError}
                      isInvalid={ytInfoError}
                      placeholder="Paste the video URL here"
                      defaultValue={ytInfo.author_name}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">Enter an artist name</Form.Control.Feedback>
                  </InputGroup>
                </InputGroup>
              </FormGroup>}

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={addSong}>
              Save Song
            </Button>

          </Modal.Footer>
        </div>
      </Modal>
    )
  }

  function addSongModal() {
    setShow(true)

    const reqURL = getYTInfoURL(ytURL)

    axios.get(reqURL)
      .then(res => {
        setYtInfoError(false)
        setYtInfo(res.data)
        console.log("Treated url will be " + getYTTreatedUrl(ytURL))
      })
      .catch(err => setYtInfoError(true))

  }

  return (
    <React.Fragment>

      <div
        className="customClass"
        style={{
          border: '0px solid'
        }}
      >

        <Row>

          <Col className="d-flex align-items-center justify-content-center">
            <Form>
              <Form.Control onChange={(e) => { setYtURL(e.target.value) }} placeholder='Enter youtube URL'></Form.Control>
            </Form>
            {(ytURL === '' ? false : true) && <Button onClick={addSongModal}>Add Song</Button>}
          </Col>

        </Row>

        <AddSongModal />

      </div>

    </React.Fragment >
  )

}

export default OperationsHeader