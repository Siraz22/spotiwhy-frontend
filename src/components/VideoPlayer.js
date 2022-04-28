import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import { FaPlay, FaPause } from "react-icons/fa";
import { useGlobalInstances } from './context/CustomGlobalInstances';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function VideoPlayer() {

  const globalContext = useGlobalInstances();
  const multiplier = 22

  const [songs, setSongs] = useState([])
  const [vol, setVolume] = useState(1)
  const [mute, setMute] = useState(true)
  const [playpause, setPlayPause] = useState(true)

  const [windowWidth, windowHeight] = useWindowSize();

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

      {/* <span>Window size: {windowWidth} x {windowHeight}</span>; */}

      <div
        className='customClass'
        style={{
          border: '0px solid'
        }}>

        <div className='container'>

          <div className="row">
            <div className='col d-flex justify-content-center'>
              {/* <p>Debug : currSongIndex = {currSongIndex}</p> */}
              {/* <p>Debug name for index 0 = {playerRef.current.getInternalPlayer().getVideoData().title}</p> */}

              <ReactPlayer ref={playerRef} playing={playpause} muted={mute}
                onReady={() => console.log('onReady')}
                onStart={customAutoplay}
                //onPlay={customAutoplay}
                volume={vol}

                height={(windowWidth > 800) ? 360 / 1.2 : 9 * multiplier}
                width={(windowWidth > 800) ? 640 / 1.2 : 16 * multiplier}

                controls={true}
                //url={songs[currSongIndex]}
                url={songs}
              />

            </div>

            <div className="mt-3 row text-center ">
              <div className="col ">
                <Button onClick={() => prevSong()}>  Prev </Button>
              </div>
              <div className='col'>
                <Button onClick={() => onPausePlay()}> {<FaPlay />}/{<FaPause />}  </Button>
              </div>
              <div className="col">
                <Button onClick={() => nextSong()}>Next </Button>
              </div>
            </div>

          </div>
        </div >
      </div>
      {/* <Button onClick={() => console.log(songs)}>Debug Player</Button> */}
    </React.Fragment >
  )
}

export default VideoPlayer