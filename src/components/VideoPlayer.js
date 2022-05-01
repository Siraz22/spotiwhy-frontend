import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import { FaPlay, FaPause } from "react-icons/fa";
import { useGlobalInstances } from './context/CustomGlobalInstances';
import useSound from 'use-sound';
import boopSfx from '../img/quack.mp3'


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

// const BoopButton = () => {
//   const [play] = useSound(boopSfx);
//   return <button onClick={play}>Boop!</button>;
// };

function VideoPlayer() {

  const globalContext = useGlobalInstances();
  const multiplier = 22

  const [songs, setSongs] = useState([])
  const [vol, setVolume] = useState(1)
  const [mute, setMute] = useState(true)
  const [windowWidth, windowHeight] = useWindowSize();

  const playerRef = useRef()

  // Hardcoding for background play starts
  const [bgPlay, setBgPlay] = useState(false)

  useEffect(() => {
    globalContext.playerRef = playerRef

    setSongs(globalContext.currPlayingSongSet)
  }, [globalContext.currPlayingSongSet])

  const [temp, setTemp] = useState(0)






  //PHONE AUTO BACKGROUND PLAY CODING TRAIL SECTION

  const [playing, setPlaying] = useState(true)

  function handlePlayPause() {
    setPlaying(prevState => !prevState)
  }

  function handlePlay() {
    console.log("play clicked")
    setPlaying(true)
  }

  function handlePause() {
    console.log("pause clicked")

    if (bgPlay) {
      setPlaying(true)
      playerRef.current.getInternalPlayer().playVideo()

    }
    else {
      setPlaying(false)
    }
  }

  // function handleBufffer() {
  //   console.log("buffering")

  //   if (bgPlay) {
  //     playerRef.current.getInternalPlayer().playVideo()
  //     setPlaying(true)
  //   }

  // }

  // function handleBufferEnd() {
  //   console.log("buffer ended")

  //   if (bgPlay) {
  //     playerRef.current.getInternalPlayer().playVideo()
  //     setPlaying(true)
  //   }

  // }






  // const onFocus = () => {
  //   console.log("Tab is in focus");
  // };

  // // User has switched away from the tab (AKA tab is hidden)
  // const onBlur = () => {
  //   console.log("Tab is blurred");
  //   playerRef.current.getInternalPlayer().playVideo()
  // };

  // const WindowFocusHandler = () => {
  //   useEffect(() => {
  //     window.addEventListener("focus", onFocus);
  //     window.addEventListener("blur", onBlur);
  //     // Calls onFocus when the window first loads
  //     onFocus();
  //     // Specify how to clean up after this effect:
  //     return () => {
  //       window.removeEventListener("focus", onFocus);
  //       window.removeEventListener("blur", onBlur);
  //     };
  //   }, []);

  //   return <></>;
  // };



  const [play, { stop }] = useSound(boopSfx);




  const MINUTE_MS = 200;

  useEffect(() => {
    const interval = setInterval(() => {
      //setTemp(prevState => prevState + 1)
      //audio.play()
      //console.log(bgPlay)
      play()

      //console.log('Logs every minute');
      if (bgPlay === true) {
        playerRef.current.getInternalPlayer().playVideo()
        play()
      }
    }, [MINUTE_MS]);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])


  // 











  function customAutoplay() {
    console.log("AutoPlay getting triggered")
    //setPlayPause(false)
    //setVolume(0.5)

    //possible hotfix
    playerRef.current.getInternalPlayer().playVideoAt(globalContext.playingSongIndex)
  }

  function prevSong() {
    console.log("prev")
    playerRef.current.getInternalPlayer().previousVideo();
  }

  function nextSong() {
    console.log("next")
    playerRef.current.getInternalPlayer().nextVideo();
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

              <ReactPlayer
                ref={playerRef}
                playing={playing}

                onStart={customAutoplay}

                onPlay={handlePlay}
                // onBuffer={handleBufffer}
                // onBufferEnd={handleBufferEnd}
                onPause={handlePause}

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
                <Button onClick={handlePlayPause}> {playing ? <FaPause /> : <FaPlay />}  </Button>
              </div>
              <div className="col">
                <Button onClick={() => nextSong()}>Next </Button>
              </div>
            </div>

          </div>
        </div >
      </div>
      {/* <Button onClick={() => console.log(songs)}>Debug Player</Button> */}

      <Form>
        <Form.Check label="BG Play"
          onChange={(e) => (setBgPlay(e.target.checked))}
        />
      </Form>
      <Button onClick={debug}>Debug Video Player</Button>
      {/* <span>{temp}</span> */}
      {/* <span>States</span>
      <p>Playing state is = {playing ? 'true' : 'false'}</p> */}
      {/* <WindowFocusHandler /> */}


    </React.Fragment >
  )

  function debug() {
    //console.log(songs)
    // setSongs([
    //   "https://www.youtube.com/watch?v=UhiXEgqhBWs",
    //   "https://www.youtube.com/watch?v=sFWP-GQ0UcU",
    //   "https://www.youtube.com/watch?v=UceaB4D0jpo"
    // ])
    // console.log(playerRef.current)
    // console.log(playerRef.current.getInternalPlayer())
    // console.log(playerRef.current.getInternalPlayer().playVideo())
    //console.log(temp)
    console.log(bgPlay)
  }
}

export default VideoPlayer