import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import { FaPlay } from "react-icons/fa";

function Youtube() {

  const [vol, setVolume] = useState(1)
  const [mute, setMute] = useState(true)
  const [interact, setInteract] = useState(false)

  function customAutoplay() {
    setMute(false)
    setVolume(0.5)
  }

  return (
    < React.Fragment >
      <Container className='m-2'>
        <Row>
          <Col className='mb-2'>
            <Button onClick={() => setInteract(true)}> {<FaPlay />} Tim Henson - Blood Moon </Button>
          </Col>
          <Col className='mb-2'>
            {interact && <ReactPlayer playing={true} muted={mute}
              onReady={() => console.log('onReady')}
              onStart={customAutoplay}
              //onPlay={customAutoplay}
              volume={vol}
              controls={true}
              url='https://www.youtube.com/watch?v=OkHD4OVjS4E'
            />}
          </Col>
        </Row>
      </Container>
    </React.Fragment >
  )
}

export default Youtube