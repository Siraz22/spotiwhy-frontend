import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, Figure, Form, Image, Modal, Row } from 'react-bootstrap';
import { useSections, useSongs } from './api/APIAxios'
import { useGlobalInstances } from './context/CustomGlobalInstances';
import { HiDotsVertical } from 'react-icons/hi'
import { FaTrash, FaPlay } from 'react-icons/fa'
import { BiShuffle } from 'react-icons/bi'
import { Link, Redirect } from 'react-router-dom';

function SelectedSectionComponent(props) {

  const sectionsContext = useSections();
  const songsContext = useSongs();
  const globalContext = useGlobalInstances();

  useEffect(() => {
  }, [globalContext])

  useEffect(() => {

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
  const [showAddSongsToSectionModal, setShowAddSongsToSectionModal] = useState(false);

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

          <div

            style={{
              margin: '5px 5px 5px 5px',
              padding: '5px 0px 5px 0px',
              backgroundColor: 'rgb(26, 26, 26, 0.7)',
              marginTop: '0.3rem',
              marginBottom: '0.3rem',
              paddingTop: '0.3rem',
              paddingBottom: '0.3rem',
            }}
            className=""
          >

            <Row>
              <Col>
                <Row>

                  <Col onClick={() => playSong(index)} xs={2} className="d-flex align-items-center justify-content-center">
                    {/* <FcMusic fontSize={30} /> */}
                    {/* {renderThumbnail(song.songURL)} */}
                    <img
                      className="trimmed-cover"
                      height={35}
                      src={song.songPhotoUrl}
                    />
                  </Col>

                  <Col onClick={() => playSong(index)} xs={8}>
                    <Row>
                      <b style={{ padding: '0px' }}>{song.songName}</b>
                      {song.songArtist}
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
          </div >

        </React.Fragment >
      )
    })

    return songsRendered
  }

  function playSong(index) {
    //If this song is going to be played, set the songs[] array in VideoPlayer with current section Songs
    //This is facilitated by global Context which contains currPlayingSongSet

    globalContext.playerRef.current.getInternalPlayer().setShuffle(false)
    globalContext.setCurrPlayingSet(sectionSongs.map((entry) => { return entry.songURL }))
    globalContext.playerRef.current.getInternalPlayer().playVideoAt(index)


    //this is set to run for the very first time only, when react-player calls onStart
    globalContext.setPlayingSongIndex(index)
  }

  function shufflePlay(event) {

    event.stopPropagation()

    //console.log(globalContext.playerRef.current.getInternalPlayer())
    globalContext.setCurrPlayingSet(sectionSongs.map((entry) => { return entry.songURL }))
    globalContext.playerRef.current.getInternalPlayer().setShuffle(true)
    globalContext.playerRef.current.getInternalPlayer().playVideoAt(0)

    //for the first time when globalState is needed
    globalContext.setShuffle(true)
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
    setShowAddSongsToSectionModal(false)
  }

  function AddSongToSectionModal() {

    const [selectedSongsID, setSelectedSongsID] = useState([])

    function checkboxChecked(songID, checked) {

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
                      <img
                        className='trimmed-cover'
                        height={35}
                        src={song.songPhotoUrl}
                      />
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
      <Modal show={showAddSongsToSectionModal} onHide={() => setShowAddSongsToSectionModal(false)}>
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

  const [deleteSectionModal, setDeleteSectionModal] = useState(false)

  function DeleteSectionModal() {

    function deleteSection() {
      sectionsContext.sectionAPIcalls.deleteSection(selectedSection.sectionID)
        .then(res => {
          console.log(res.data)
          props.setSectionDeletedRefreshTemp(prevState => !prevState)
        })
        .catch(err => console.log(err))
    }

    return (
      <Modal show={deleteSectionModal} onHide={() => setDeleteSectionModal(false)}>
        <div className="customdarktheme">
          <Modal.Header>
            <Modal.Title>Confirm deletion</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setDeleteSectionModal(false)}>
              Close
            </Button>

            <Link to="/">
              <Button variant="primary" onClick={() => deleteSection()}>
                Delete Section
              </Button>
            </Link>

          </Modal.Footer>
        </div>
      </Modal >
    )
  }

  return (
    <React.Fragment>

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
                  border: '0px solid'
                }}
              >
                <img
                  className="trimmed-cover"
                  src={selectedSection.sectionPhotoURL}
                  alt="Card image"
                  height={350}
                  width='content-max'
                  style={{
                    objectPosition: `30% 30%`
                  }}
                />

                <Card.ImgOverlay>

                  <Row>
                    <Col s={12} md={10} lg={11}>
                      <Card.Title style={{ fontSize: "3rem", textShadow: `2px 2px #000000` }}>{selectedSection.sectionName}</Card.Title>
                    </Col>
                    <Col s={2} md={2} lg={1} className="">

                      <Button variant='none' onClick={() => setDeleteSectionModal(true)}>
                        <FaTrash color='antiquewhite' fontSize='1.3rem' />
                      </Button>

                    </Col>
                  </Row>

                  <Row className='mb-4'>
                    <Card.Text className="muted"
                      style={{ textShadow: `2px 2px #000000` }}
                    >
                      {selectedSection.sectionDescription}
                    </Card.Text>
                  </Row>

                  <Row className='mb-2'>
                    <Col>
                      <Button className="customBox-left"
                        style={{
                          paddingRight: '3px',
                          paddingTop: '4px',
                          paddingBottom: '4px',
                          border: '0px',
                          backgroundColor: '#ffffff54'
                        }}
                        onClick={() => playSong(0)}
                      >
                        <FaPlay /> <span style={{ marginRight: '20px' }}>PLAY ALL</span>
                        <Button
                          style={{
                            border: '0px',
                            backgroundColor: 'white',
                            color: 'black'
                          }}
                          onClick={e => shufflePlay(e)}
                          variant='secondary' className='customBox-left'> <BiShuffle /> MIX</Button>
                      </Button>
                    </Col>
                  </Row>

                  <Row className='mb-2'>
                    <Col>
                      <Button
                        style={{
                          paddingRight: '6px',
                          paddingTop: '9px',
                          paddingBottom: '9px',
                        }}
                        variant='secondary' className='customBox-left' onClick={() => setShowAddSongsToSectionModal(true)}>Add Songs</Button>
                    </Col>
                  </Row>

                </Card.ImgOverlay>
              </Card>

              <AddSongToSectionModal />
              <DeleteSectionModal />

            </div>
            <div className="col mt-3">
              <div className="list-group">
                <span><h5>Songs List</h5></span>
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