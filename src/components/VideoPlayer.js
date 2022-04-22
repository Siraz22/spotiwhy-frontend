import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import { FaPlay } from "react-icons/fa";

function VideoPlayer() {
  const [songs, setSongs] = useState([])
  const [vol, setVolume] = useState(1)
  const [mute, setMute] = useState(true)
  const [playpause, setPlayPause] = useState(true)

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

  return (
    < React.Fragment>

      <div className='container m-2'>
        <h3>Player Component</h3>
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
          </div>

        </div>
      </div >
    </React.Fragment >
  )
}

export default VideoPlayer