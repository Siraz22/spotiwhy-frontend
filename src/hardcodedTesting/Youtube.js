import React, { useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import { FaPlay, FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import SongList from './SongList';

function Youtube() {

  //const [songIter, setSongIter] = useState(0)
  //const [currSongIndex, setSongIndex] = useState(-1)
  //const [interact, setInteract] = useState(false)

  const [songs, setSongs] = useState(['https://www.youtube.com/watch?v=A9AzSOJAag8', 'https://www.youtube.com/watch?v=OkHD4OVjS4E', 'https://www.youtube.com/watch?v=KQetemT1sWc'])
  const [vol, setVolume] = useState(1)
  const [mute, setMute] = useState(true)
  const [playpause, setPlayPause] = useState(false)

  const playerRef = useRef()

  function customAutoplay() {
    setMute(false)
    setVolume(0.5)

  }

  function prevSong() {
    console.log("prev")
    // let calcIndex = currSongIndex - 1;
    // calcIndex = (calcIndex === -1) ? songs.length - 1 : calcIndex;
    // setSongIndex(calcIndex);
    playerRef.current.getInternalPlayer().previousVideo();
  }

  function nextSong() {
    console.log("next")
    // let calcIndex = (currSongIndex + 1) % songs.length
    // console.log(calcIndex)
    // setSongIndex(calcIndex)
    playerRef.current.getInternalPlayer().nextVideo();
  }

  function onPausePlay() {
    console.log(playerRef);
    setPlayPause(prevState => !prevState)
  }

  // function customButton() {
  //   console.log(playerRef.current.getInternalPlayer())
  //   console.log(playerRef.current.getInternalPlayer().getVideoData())
  // }

  return (
    < React.Fragment>

      <Container className='m-2'>
        <h1>Hardcoded Testing Component</h1>
        <hr />

        <div className="row mb-2">

          <SongList playerRef={playerRef} />

        </div>

        <div className="row">
          <div className='col mb-5'>
            {/* <p>Debug : currSongIndex = {currSongIndex}</p> */}
            {/* <p>Debug name for index 0 = {playerRef.current.getInternalPlayer().getVideoData().title}</p> */}
            <ReactPlayer ref={playerRef} playing={playpause} muted={mute}
              onReady={() => console.log('onReady')}
              onStart={customAutoplay}
              //onPlay={customAutoplay}
              volume={vol}
              height={200}
              width={300}
              controls={true}
              //url={songs[currSongIndex]}
              url={songs}
            />
          </div>

          <h3>Custom Controls</h3>
          <div className="row text-center ">
            <div className="col ">
              <Button onClick={() => prevSong()}>  Prev </Button>
            </div>
            <div className='col'>
              <Button onClick={() => onPausePlay()}> {<FaPlay />} Play/Pause </Button>
            </div>
            <div className="col">
              <Button onClick={() => nextSong()}>Next </Button>
            </div>
            {/* <div className="col">
              <Button onClick={() => customButton()}>Experimental Button</Button>
            </div> */}
          </div>

        </div>
      </Container >
    </React.Fragment >
  )
}

export default Youtube