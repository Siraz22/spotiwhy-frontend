import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ReactPlayer from 'react-player'

function Youtube() {

  const [mute, setMute] = useState(true)
  const [interact, setInteract] = useState(false)

  // function SingleSong() {
  //   return (
  //     <React.Fragment>
  //       <Button onClick={() => setInteract(true)}> Click for autoplay </Button>
  //     </React.Fragment >
  //   )
  // }

  return (
    <React.Fragment>
      <Container className='m-2'>
        <Row>
          <Col className='mb-2'>
            <Button onClick={() => setInteract(true)}> Click for autoplay </Button>
          </Col>
          <Col className='mb-2'>
            {interact && <ReactPlayer playing={true} muted={mute}
              onReady={() => console.log('onReady')}
              onStart={() => setMute(false)}
              onPlay={() => setMute(false)}
              //light={true}
              controls={true}
              url='https://www.youtube.com/watch?v=bDidwMxir4o'
            />}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Youtube