import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Modal, InputGroup, DropdownButton, Dropdown, FormControl } from 'react-bootstrap';
import { useSongs } from './api/APIAxios'

import { useGlobalInstances } from './context/CustomGlobalInstances';
import { HiDotsVertical } from 'react-icons/hi'
import { FaPlay } from 'react-icons/fa'
import { BiShuffle } from 'react-icons/bi'

function NoSectionSelectedComponent(props) {

  const songsContext = useSongs();
  const [songs, setSongs] = useState([])
  const globalContext = useGlobalInstances();

  //temp hotfix when user has selected NoSectionsComponent and adds a song
  useEffect(() => {
    refreshSongList()
  }, [props.songAddedRefreshTemp])

  useEffect(() => {

  }, [globalContext])

  useEffect(() => {
    songsContext.songAPIcalls.getSongs()
      .then((res) => {
        console.log(res.data)
        setSongs(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  function refreshSongList() {

    songsContext.songAPIcalls.getSongs()
      .then((res) => {
        console.log(res.data)
        setSongs(res.data)
      })
      .catch(err => console.log(err))
  }

  function playSong(index) {
    //If this song is going to be played, set the songs[] array in VideoPlayer with current section Songs
    //This is facilitated by global Context which contains currPlayingSongSet

    globalContext.playerRef.current.getInternalPlayer().setShuffle(false)
    globalContext.setCurrPlayingSet(songs.map((entry) => { return entry.songURL }))
    globalContext.playerRef.current.getInternalPlayer().playVideoAt(index)


    //this is set to run for the very first time only, when react-player calls onStart
    globalContext.setPlayingSongIndex(index)

  }

  function shufflePlay(event) {

    event.stopPropagation()
    console.log("Shuffle play!")

    console.log(globalContext.playerRef)

    globalContext.setCurrPlayingSet(songs.map((entry) => { return entry.songURL }))
    globalContext.playerRef.current.getInternalPlayer().setShuffle(true)
    globalContext.playerRef.current.getInternalPlayer().playVideoAt(0)

    //for the first time when globalState is needed
    globalContext.setShuffle(true)

  }

  function renderSongs() {
    const songsRendered = songs.map((song, index) => {
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
                      width='100px'
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

  function deleteSong(songIDtoDelete) {
    songsContext.songAPIcalls.deleteSong(songIDtoDelete)
      .then(res => {
        console.log(res)
        refreshSongList();
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

        <div className="container">
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
                  src='https://wallpapercave.com/wp/wp3409426.jpg'
                  alt="Card image"
                  height={360}
                  width='content-max'
                  style={{
                    objectPosition: `10% 30%`
                  }}
                />

                <Card.ImgOverlay>

                  <Row>
                    <Col xs={11}>
                      <Card.Title style={{ fontSize: "3rem", textShadow: `2px 2px #000000` }}>ALL SONGS</Card.Title>
                    </Col>
                    <Col xs={1} className="text-center">


                    </Col>
                  </Row>

                  <Row className='mb-4'>
                    <Card.Text className="muted"
                      style={{ textShadow: `2px 2px #000000` }}
                    >
                      Explore your Library
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
                          onClick={(event) => shufflePlay(event)}
                          variant='secondary' className='customBox-left'> <BiShuffle /> MIX</Button>
                      </Button>
                    </Col>
                  </Row>

                </Card.ImgOverlay>

              </Card>
            </div>

            <div className="col mt-3"
              style={{ padding: '0' }}
            >

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

export default NoSectionSelectedComponent