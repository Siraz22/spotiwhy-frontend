import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Form, Modal, Button, Row, Col, InputGroup, FormGroup, Alert, OverlayTrigger } from 'react-bootstrap'
import { getYTInfoURL, getYTTreatedUrl, ytinfo } from './api/youtubeInfo';
import { v4 as uuid } from 'uuid'
import { useSongs } from './api/APIAxios';
import { SiYoutubemusic } from 'react-icons/si'

function OperationsHeader(props) {

  const songsContext = useSongs();

  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false)

  const [ytURL, setYtURL] = useState('')
  const [ytInfoError, setYtInfoError] = useState(false)
  const [ytInfo, setYtInfo] = useState('')

  const [songThumbnailURL, setSongThumbnailURL] = useState('')

  const formInputRef = useRef();

  function closeModal() {
    setYtInfoError(false)
    setYtInfo('')
    setYtURL('')
    setShow(false)
    setLoading(false)
    setAlert(false)
  }

  function AddSongModal() {

    const [songName, setSongName] = useState(ytInfo.title)
    const [songArtist, setSongArtist] = useState(ytInfo.author_name)

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

      closeModal()
      console.log(props)
      props.setSongAddedRefreshTemp(prevState => prevState)


    }

    console.log(ytInfo)

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
                      placeholder="Song Name"
                      // defaultValue={ytInfo.title}
                      autoFocus
                      value={songName}
                      onChange={(e) => setSongName(e.target.value)}
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
                      placeholder="Song Artist"
                      // defaultValue={ytInfo.author_name}
                      value={songArtist}
                      onChange={(e) => setSongArtist(e.target.value)}
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

  function addSongModal() {

    setLoading(true)

    const reqURL = getYTInfoURL(ytURL)

    axios.get(reqURL)
      .then(res => {
        setYtInfoError(false)
        setYtInfo(res.data)
        console.log("Treated url will be " + getYTTreatedUrl(ytURL))
        setLoading(false)
        console.log(formInputRef.current)
        formInputRef.current.reset()

        //we got a success, set initial values
        //setSongName(res.data.title)
        //setSongArtist(res.data.author_name)
        setSongThumbnailURL(res.data.thumbnail_url)

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

  function urlChanged(value) {
    //this function is required as tooltip doesn't have a close button like alert did
    //we call the close button equivalent (in alert) here in tooltip by setting alert => false
    //when user changes the url value
    setYtURL(value)
    closeAlert()
  }

  return (
    <React.Fragment>

      <div
        className=""
        style={{
          border: '0px solid'
        }}
      >

        <Row
          style={{ margin: '0px' }}
        >

          <Col className="d-flex align-items-center justify-content-center">

            <Form
              style={{ marginRight: '10px' }}
              ref={formInputRef}
            >
              <InputGroup hasValidation>

                <Form.Control
                  isInvalid={ytInfoError}
                  onChange={event => urlChanged(event.target.value)}
                  placeholder='Enter youtube URL'

                >
                </Form.Control>

                {alert &&
                  <Form.Control.Feedback type="invalid" tooltip>
                    Check URL or Network Connection
                  </Form.Control.Feedback>
                }

              </InputGroup>
            </Form>


            {(ytURL === '' ? false : true) && < Button onClick={addSongModal}>Add <SiYoutubemusic /></Button>}

            {/* {alert &&
              <Alert variant="danger" onClose={closeAlert} dismissible>
                <Alert.Heading>Error! You got an error!</Alert.Heading>
                <p>
                  Check the URL again or your network connection
                </p>
              </Alert>
            } */}

          </Col>

        </Row>

        <AddSongModal />

      </div>

    </React.Fragment >
  )

}

export default OperationsHeader