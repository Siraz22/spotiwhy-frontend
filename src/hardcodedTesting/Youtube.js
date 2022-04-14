import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import { FaPlay, FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

function Youtube() {

  const [songIter, setSongIter] = useState(0)
  const [songs, setSongs] = useState(['https://www.youtube.com/watch?v=A9AzSOJAag8', 'https://www.youtube.com/watch?v=OkHD4OVjS4E'])
  const [vol, setVolume] = useState(1)
  const [mute, setMute] = useState(true)
  const [interact, setInteract] = useState(false)

  function customAutoplay() {
    setMute(false)
    setVolume(0.5)
  }

  return (
    < React.Fragment >
      <h1>Hardcoded Testing Component</h1>
      <Container className='m-2'>
        <h3>Player through custom button</h3>
        <Row>
          <Col className='mb-2'>
            {/* <i onClick={() => console.log("left")}><FaArrowCircleLeft /></i> */}
            <Button onClick={() => setInteract(true)}> {<FaPlay />} Autoplay hardcoded Section </Button>
            {/* <i onClick={() => console.log("righty")}><FaArrowCircleRight /></i> */}
          </Col>
          <Col className='mb-2'>
            {interact && <ReactPlayer playing={true} muted={mute}
              onReady={() => console.log('onReady')}
              onStart={customAutoplay}
              //onPlay={customAutoplay}
              volume={vol}
              controls={true}
              url={songs}
            />}
          </Col>
          <h3>Standalone player</h3>
          <Col>
            <ReactPlayer
              url='https://www.youtube.com/watch?v=gH6i9JAdJrQ'
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment >
  )
}

export default Youtube