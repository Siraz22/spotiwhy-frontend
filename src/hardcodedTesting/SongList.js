import React from 'react'
import { Button } from 'react-bootstrap'

function SongList(props) {

  return (
    <React.Fragment>
      <h4>Song List</h4>
      <div className="row mb-2">
        <Button variant='outline-success' onClick={() => props.playerRef.current.getInternalPlayer().playVideoAt(0)}>Aurora - The River</Button>
      </div>
      <div className='row mb-2'>
        <Button variant='outline-success' onClick={() => props.playerRef.current.getInternalPlayer().playVideoAt(1)}>Tim Henson - Blood Moon</Button>
      </div>
      <div className='row mb-2'>
        <Button variant='outline-success' onClick={() => props.playerRef.current.getInternalPlayer().playVideoAt(2)}>Beatles - Here Comes the Sun</Button>
      </div>



    </React.Fragment >
  )
}

export default SongList