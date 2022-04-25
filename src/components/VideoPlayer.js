import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import { FaPlay } from "react-icons/fa";
import { useGlobalInstances } from './context/CustomGlobalInstances';

function VideoPlayer() {

  const globalContext = useGlobalInstances();

  const [songs, setSongs] = useState([])
  const [vol, setVolume] = useState(1)
  const [mute, setMute] = useState(true)
  const [playpause, setPlayPause] = useState(true)

  const playerRef = useRef()

  useEffect(() => {
    globalContext.playerRef = playerRef
    setSongs(globalContext.currPlayingSongSet)
  }, [globalContext])

  function customAutoplay() {
    setMute(false)
    setVolume(0.5)
  }

  function prevSong() {
    console.log("prev")
    playerRef.current.getInternalPlayer().previousVideo();
  }

  function nextSong() {
    console.log("next")
    playerRef.current.getInternalPlayer().nextVideo();
  }

  function onPausePlay() {
    console.log(playerRef);
    setPlayPause(prevState => !prevState)
  }

  return (
    < React.Fragment>

      <div style={{
        border: '2px solid'
      }}>

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
      </div>
      <Button onClick={() => console.log(songs)}>Debug Player</Button>
    </React.Fragment >
  )
}

export default VideoPlayer