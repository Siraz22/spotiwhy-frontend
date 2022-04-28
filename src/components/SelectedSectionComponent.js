import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, Figure, Form, Image, Modal, Row } from 'react-bootstrap';
import { useSections, useSongs } from './api/APIAxios'
import { v4 as uuid } from 'uuid'
import { useGlobalInstances } from './context/CustomGlobalInstances';
import { FcMusic } from "react-icons/fc";
import { ytthumbnail } from './api/youtubeThumbnail';
import { ytinfo } from './api/youtubeInfo';
import axios from 'axios';
import { HiDotsVertical } from 'react-icons/hi'

function SelectedSectionComponent(props) {

  const sectionsContext = useSections();
  const songsContext = useSongs();
  const globalContext = useGlobalInstances();

  useEffect(() => {
    console.log("Use effect Section - global")
  }, [globalContext])

  useEffect(() => {
    console.log("Use effect Section - prop")

    songsContext.songAPIcalls.getSongs()
      .then((res) => {
        console.log(res.data)
        setSongs(res.data)
      })
      .catch(err => console.log(err))

    sectionsContext.sectionAPIcalls.getSectionById(props.selectedSection.sectionID)
      .then((res) => {
        console.log(res.data)
        //console.log(res.data.songs_set)
        setSelectedSelection(res.data)
        setSectionSongs(res.data.songs_set)
      })
      .catch(err => console.log(err))
  }, [props])

  const [selectedSection, setSelectedSelection] = useState([])
  const [sectionSongs, setSectionSongs] = useState([])
  const [songs, setSongs] = useState([])
  const [showModal, setShow] = useState(false);

  function refreshSongList() {

    sectionsContext.sectionAPIcalls.getSectionById(props.selectedSection.sectionID)
      .then((res) => {
        setSelectedSelection(res.data)
        setSectionSongs(res.data.songs_set)
      })
      .catch(err => console.log(err))
  }

  function renderSongs() {
    const songsRendered = sectionSongs.map((song, index) => {
      return (
        <React.Fragment key={song.songID}>

          <div style={{
            margin: '0px 20px 0px 20px',
            padding: '5px 0px 5px 0px',
            // border: '10px 0px 10px 0px',
          }}>

            <Row>
              <Col>
                <Row
                  style={{
                    backgroundColor: 'rgb(26, 26, 26, 0.7)',
                    borderRadius: '10px'
                  }}>

                  <Col onClick={() => playSong(index)} xs={2} className="d-flex align-items-center justify-content-center">
                    {/* <FcMusic fontSize={30} /> */}
                    {/* {renderThumbnail(song.songURL)} */}
                    <img height={35} src={song.songPhotoUrl} />
                  </Col>

                  <Col onClick={() => playSong(index)} xs={8}>
                    <Row>
                      <strong>{song.songName}</strong>
                      <text>{song.songArtist}</text>
                    </Row>
                  </Col>

                  <Col xs={2} className="d-flex align-items-center justify-content-center">

                    {/* <HiDotsVertical fontSize={15} /> */}

                    <Dropdown>
                      <Dropdown.Toggle variant="none" id="dropdown-basic">
                        <HiDotsVertical color='white' fontSize={15} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant='dark'>
                        <Dropdown.Item onClick={() => removeSongFromSection(song.songID)}>Remove from Section</Dropdown.Item>
                        <Dropdown.Item onClick={() => deleteSong(song.songID)}>Delete Song</Dropdown.Item>
                        {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                      </Dropdown.Menu>
                    </Dropdown>

                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

        </React.Fragment>
      )
    })

    return songsRendered
  }

  function playSong(index) {
    //If this song is going to be played, set the songs[] array in VideoPlayer with current section Songs
    //This is facilitated by global Context which contains currPlayingSongSet
    console.log("Index passed is " + index)
    globalContext.setCurrPlayingSet(sectionSongs.map((entry) => { return entry.songURL }))
    globalContext.playerRef.current.getInternalPlayer().playVideoAt(index)
  }

  function deleteSong(songIDtoDelete) {
    songsContext.songAPIcalls.deleteSong(songIDtoDelete)
      .then(res => {
        console.log(res)
        refreshSongList();
      })
      .catch(err => console.log(err))
  }

  function removeSongFromSection(songIDtoRemove) {
    songsContext.songAPIcalls.removeSongFromSection(songIDtoRemove)
      .then(res => {
        console.log(res)
        refreshSongList();
      })
      .catch(err => console.log(err))
  }

  function closeModal() {
    setShow(false)
  }

  function AddSongToSectionModal() {

    const [selectedSongsID, setSelectedSongsID] = useState([])

    function checkboxChecked(songID, checked) {
      console.log("checkbox clicked")
      console.log(checked)

      if (checked) {
        setSelectedSongsID([...selectedSongsID, songID])
      }
      else if (!checked) {
        setSelectedSongsID(selectedSongsID.filter((entry) => entry !== songID))
      }
    }

    function renderUnaddedSongs() {




      const filteredSongs = songs.filter(song => !sectionSongs.map(sectionSong => sectionSong.songID).includes(song.songID))

      const songsRendered = filteredSongs.map((song, index) => {
        return (
          <React.Fragment key={song.songID}>
            <div style={{
              margin: '0px 20px 0px 20px',
              padding: '5px 0px 5px 0px',
              // border: '10px 0px 10px 0px',
            }}>

              <Row>
                <Col xs={1} className="d-flex align-items-center justify-content-center">

                  <Form.Check type='checkbox'
                    onChange={(event) => checkboxChecked(song.songID, event.target.checked)}
                  />

                </Col>

                <Col>
                  <Row
                    style={{
                      backgroundColor: 'rgb(26, 26, 26, 0.7)',
                      borderRadius: '10px'
                    }}>

                    <Col xs={2} className="d-flex align-items-center justify-content-center">
                      {/* <FcMusic fontSize={30} /> */}
                      {/* {renderThumbnail(song.songURL)} */}
                      <img height={35} src={song.songPhotoUrl} />
                    </Col>

                    <Col xs={8}>
                      <Row>
                        <strong>{song.songName}</strong>
                        {song.songArtist}
                      </Row>
                    </Col>
                  </Row>


                </Col>
              </Row>
            </div>
          </React.Fragment >
        )
      })

      return songsRendered

    }

    function addSongsToSection() {
      selectedSongsID.map((songID) => {
        songsContext.songAPIcalls.addSongToSection(songID, selectedSection.sectionID)
          .then(res => {
            console.log(res.data)
            refreshSongList()
          })
          .catch(err => console.log(err))
      })
    }

    return (
      <Modal show={showModal} onHide={() => setShow(false)}>
        <div className="customdarktheme">
          <Modal.Header>
            <Modal.Title>Add Songs to Current Section</Modal.Title>
          </Modal.Header>
          <Modal.Body  >
            <Form>
              {renderUnaddedSongs()}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={() => addSongsToSection()}>
              Add Songs
            </Button>

          </Modal.Footer>
        </div>
      </Modal >
    )
  }

  return (
    <React.Fragment>
      {console.log("Main Selection Function")}

      <div
        className="customClass"
        style={{
          border: '0px solid'
        }}>

        <div className='container'>
          <div className="row"
            style={{ padding: '0px 0px' }}
          >
            <div className="col-md-7">
              <Card
                className="text-white"
                style={{
                  border: '0px solid',
                  backgroundColor: 'rgb(1,1,1,0)'
                }}
              >
                <Card.Img
                  style={{ borderRadius: '0px 20px' }}
                  src={selectedSection.sectionPhotoURL}
                  alt="Card image"
                  height={380}

                />
                <Card.ImgOverlay>
                  <Card.Title style={{ fontSize: "70px" }}>{selectedSection.sectionName}</Card.Title>
                  <Card.Text className="muted">
                    {selectedSection.sectionDescription}
                  </Card.Text>
                  <Button onClick={() => setShow(true)}>Add Songs</Button>
                </Card.ImgOverlay>
              </Card>

              <AddSongToSectionModal />

            </div>
            <div className="col mt-2">
              <div className="list-group">
                {renderSongs()}
              </div>
            </div>

          </div>
        </div>
      </div>

    </React.Fragment >
  )
}

export default SelectedSectionComponent