import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import { FaPlay, FaPause } from "react-icons/fa";
import { useGlobalInstances } from './context/CustomGlobalInstances';
import useSound from 'use-sound';
import boopSfx from '../img/quack.mp3'
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io'


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


  // useEffect(() => {
  //   console.log("shuffle")
  //   if (playerRef.current !== null) {
  //     console.log(playerRef.current)
  //     console.log("shuffled!")
  //     playerRef.current.getInternalPlayer().setShuffle(globalContext.shuffle)
  //     playerRef.current.getInternalPlayer().playVideoAt(0)
  //   }
  // }, [globalContext.shuffle])


  //const [temp, setTemp] = useState(0)






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
    setPlaying(false)

    // if (bgPlay) {
    //   setPlaying(true)
    //   playerRef.current.getInternalPlayer().playVideo()
    // }
    // else {
    //   setPlaying(false)
    // }
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



  // const [play, { stop }] = useSound(boopSfx);



  // const MINUTE_MS = 200;

  // useEffect(() => {

  //   console.log('Logs every minute');

  //   const interval = setInterval(() => {
  //     console.log(bgPlay)
  //     //playerRef.current.getInternalPlayer().playVideo()
  //     //console.log('Logs every minute');
  //     if (bgPlay === true) {
  //       playerRef.current.getInternalPlayer().playVideo()
  //       //play()
  //     }
  //   }, [MINUTE_MS]);

  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.

  // }, [bgPlay])




  function customAutoplay() {
    console.log("AutoPlay getting triggered")
    //setPlayPause(false)
    //setVolume(0.5)

    //possible hotfix
    if (globalContext.shuffle) {
      playerRef.current.getInternalPlayer().setShuffle(true)
      playerRef.current.getInternalPlayer().playVideoAt(0)
    }
    else {
      playerRef.current.getInternalPlayer().playVideoAt(globalContext.playingSongIndex)
    }
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
        style={{ margin: '20px' }}
      >
        <Row
          style={{
            backgroundColor: 'rgb(96 104 108 / 27%)',
            padding: '10px 0px 10px 0px',
            borderRadius: '20px 20px 0px 0px'
          }}
        >
          <Col
            id="player-col"
            s={12}
            md={12}
            className="d-flex align-items-center justify-content-center"
          >
            <ReactPlayer
              ref={playerRef}
              playing={playing}

              //this will be called only once at the start
              onStart={customAutoplay}

              onPlay={handlePlay}
              onPause={handlePause}

              height={(windowWidth > 800) ? 360 / 1.2 : 9 * multiplier}
              width={(windowWidth > 800) ? 640 / 1.2 : 16 * multiplier}

              controls={true}
              url={songs}
            />
          </Col>

          <Col
            id="info-col"
            s={12}
            style={{
              paddingTop: '20px'
            }}
            className="text-center"
          >
            <span style={{ fontSize: '1.3rem', color: 'white' }} >Butterfly Effect</span>
            <br />
            <span style={{ fontSize: '1rem' }}>Travis Scotts</span>
          </Col>
        </Row>

        <Row
          style={{ backgroundColor: '#16102d7d', padding: '10px 0px 15px 0px', borderRadius: '0px 0px 20px 20px' }}
          className="text-center"
        >

          <Col s={4}>
            <Button variant='none' onClick={() => prevSong()}> <IoMdSkipBackward color='white' /> </Button>
          </Col>
          <Col s={4}>
            <Button

              onClick={handlePlayPause}
              style={{ borderRadius: '10px', backgroundColor: 'gray' }}
            >
              {playing ? <FaPause color='#16102d7d' /> : <FaPlay />}
            </Button>
          </Col>
          <Col s={4}>
            <Button variant='none' onClick={() => nextSong()}> <IoMdSkipForward color='white' /> </Button>
          </Col>

        </Row>

      </div>


      {/* <Form>
        <Form.Check label="BG Play"
          onChange={(e) => (setBgPlay(e.target.checked))}
        />
      </Form> */}

      {/* <Button onClick={debug}>Debug Video Player</Button> */}

      {/* <span>{temp}</span> */}
      {/* <span>States</span>
      <p>Playing state is = {playing ? 'true' : 'false'}</p> */}
      {/* <WindowFocusHandler /> */}


    </React.Fragment >
  )

  function debug() {
    console.log(playerRef.current.getInternalPlayer())
    //playerRef.current.getInternalPlayer().setShuffle(true)
    // console.log(playerRef.current.getInternalPlayer().playVideo())
    //console.log(temp)
    console.log(songs)
    console.log(globalContext.shuffle)
    console.log(playerRef.current.getInternalPlayer().getPlaylist())
  }
}

export default VideoPlayer