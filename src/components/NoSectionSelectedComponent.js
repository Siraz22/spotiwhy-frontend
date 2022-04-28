import React, { useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, Card, Col, Form, Row, Modal, InputGroup, DropdownButton, Dropdown, FormControl } from 'react-bootstrap';
import { SectionsContext, useSections, useSongs } from './api/APIAxios'
import { v4 as uuid } from 'uuid'
import { ytthumbnail } from './api/youtubeThumbnail';
import { useGlobalInstances } from './context/CustomGlobalInstances';
import { HiDotsVertical } from 'react-icons/hi'

function NoSectionSelectedComponent() {

  const sectionsContext = useSections();
  const songsContext = useSongs();
  const [songs, setSongs] = useState([])
  const [songName, setSongName] = useState('')
  const [songURL, setSongURL] = useState('')
  const [sections, setSections] = useState([])
  const [selectedSongsID, setSelectedSongs] = useState([])
  const [selectedSection, setSelectedSection] = useState('')

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

    sectionsContext.sectionAPIcalls.getSections()
      .then((res) => {
        console.log(res.data)
        setSections(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (selectedSongsID.length === 0) {
      setSelectedSection('')
    }
  }, [selectedSongsID])

  function refreshSongList() {

    songsContext.songAPIcalls.getSongs()
      .then((res) => {
        console.log(res.data)
        setSongs(res.data)
      })
      .catch(err => console.log(err))
  }

  function checkboxChecked(songID, checked) {
    console.log("checkbox clicked")

    if (checked) {
      setSelectedSongs([...selectedSongsID, songID])
    }
    else if (!checked) {
      setSelectedSongs(selectedSongsID.filter((entry) => entry !== songID))
    }
  }

  function playSong(index) {
    //If this song is going to be played, set the songs[] array in VideoPlayer with current section Songs
    //This is facilitated by global Context which contains currPlayingSongSet
    globalContext.setCurrPlayingSet(songs.map((entry) => { return entry.songURL }))
    //console.log(globalContext)
    //console.log(globalContext.playerRef.current.getInternalPlayer())
    globalContext.playerRef.current.getInternalPlayer().playVideoAt(index)
  }

  function renderSongs() {
    const songsRendered = songs.map((song, index) => {
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

                    <Dropdown >
                      <Dropdown.Toggle variant="none" id="dropdown-basic">
                        <HiDotsVertical color='white' fontSize={15} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant='dark'>
                        {/* <Dropdown.Item href="#/action-1">Remove from Section</Dropdown.Item> */}
                        <Dropdown.Item onClick={() => deleteSong(song.songID)}>Delete Song</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

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

  function renderSections() {
    const sectionsRendered = sections.map((section) => {
      return (
        <React.Fragment key={section.sectionID}>
          <Form.Check
            type="radio"
            name="sectionToAddSongs"
            onChange={() => setSelectedSection(section.sectionID)}
            label={section.sectionName}
          />
        </React.Fragment >
      )
    })
    return sectionsRendered
  }

  function addSongsToSection() {
    selectedSongsID.map((songID) => {
      //console.log(songID)

      songsContext.songAPIcalls.addSongToSection(songID, selectedSection)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => console.log(err))
    })
  }

  function deleteSong(songIDtoDelete) {
    songsContext.songAPIcalls.deleteSong(songIDtoDelete)
      .then(res => {
        console.log(res)
        refreshSongList();
      })
      .catch(err => console.log(err))
  }

  function addSong() {
    let songObj = {
      songID: uuid(),
      songURL: songURL,
      songName: songName,
      songArtist: "Unnamed Artist"
    }

    songsContext.songAPIcalls.addSong(songObj)
      .then(res => {
        console.log(res)
        refreshSongList()
      })
      .catch(err => console.log(err))
  }

  return (
    <React.Fragment>

      <div
        className="customClass"
        style={{
          border: '0px solid'
        }}
      >

        <div className="row">

          {selectedSongsID.length !== 0 && <div className="">
            Add songs to which section?
            <Form>
              <div className="scroll">
                {renderSections()}
              </div>
            </Form>
            <Button onClick={addSongsToSection} variant='secondary'>
              Add to section
            </Button>
          </div>}

        </div>

        <div className="row"
          style={{ padding: '0px 0px' }}
        >
          <div className="col-md-4">
            <Card
              className="text-white"
              style={{
                border: '0px solid',
                backgroundColor: 'rgb(1,1,1,0)'
              }}
            >

              <Card.Img
                style={{ borderRadius: '0px 20px' }}
                src="/allSongs.png"
                alt="Card image"
                height={280}
              />

              <Card.ImgOverlay>
                <h1>Explore</h1>
                <p className="muted">
                  Your Library
                </p>
              </Card.ImgOverlay>
            </Card>
          </div>

          <div className="col mt-2">
            <Form>
              <div className="list-group">
                {renderSongs()}
              </div>
            </Form>
          </div>
        </div>

      </div>

    </React.Fragment >
  )
}


export default NoSectionSelectedComponent