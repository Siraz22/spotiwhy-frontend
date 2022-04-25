import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Figure, Form, Image } from 'react-bootstrap';
import { useSections, useSongs } from './api/APIAxios'
import { v4 as uuid } from 'uuid'
import { useGlobalInstances } from './context/CustomGlobalInstances';

function SelectedSectionComponent(props) {

  const sectionsContext = useSections();
  const songsContext = useSongs();

  const globalContext = useGlobalInstances();
  useEffect(() => {

  }, [globalContext])

  const [selectedSection, setSelectedSelection] = useState([])
  const [sectionSongs, setSectionSongs] = useState([])
  const [songName, setSongName] = useState('')
  const [songURL, setSongURL] = useState('')

  useEffect(() => {
    console.log("Use effect running in Selected Component")

    sectionsContext.sectionAPIcalls.getSectionById(props.selectedSection.sectionID)
      .then((res) => {
        console.log(res.data)
        //console.log(res.data.songs_set)
        setSelectedSelection(res.data)
        setSectionSongs(res.data.songs_set)
      })
      .catch(err => console.log(err))
  }, [props])

  function refreshSongList() {

    sectionsContext.sectionAPIcalls.getSectionById(props.selectedSection.sectionID)
      .then((res) => {
        console.log(res.data)
        //console.log(res.data.songs_set)
        setSelectedSelection(res.data)
        setSectionSongs(res.data.songs_set)
      })
      .catch(err => console.log(err))
  }

  function renderSongs() {
    const songsRendered = sectionSongs.map((song, index) => {
      return (
        <React.Fragment key={song.songID}>
          <div className="row m-2 ">
            <div className="col-10 row">
              <Button onClick={() => playSong(index)} variant='outline-success' >{song.songName}</Button>
            </div>
            <div className="col">
              <Button onClick={() => deleteSong(song.songID)}>Delete Song</Button>
            </div>
          </div>
        </React.Fragment>
      )
    })

    return songsRendered
  }

  function playSong(index) {

    //If this song is going to be played, set the songs[] array in VideoPlayer with current section Songs
    //This is facilitated by global Context which contains currPlayingSongSet

    console.log("Index passed is " + index)
    globalContext.setCurrPlayingSet(sectionSongs.map((entry) => { return entry.songURL }))
    console.log(globalContext)
    console.log(globalContext.playerRef.current.getInternalPlayer())
    globalContext.playerRef.current.getInternalPlayer().playVideoAt(index)
  }

  function deleteSong(songIDtoDelete) {
    songsContext.songAPIcalls.deleteSong(songIDtoDelete)
      .then(res => {
        console.log(res)
        refreshSongList();
      })
      .catch(err => console.log(err))
  }

  function addSong() {
    let songObj = {
      songID: uuid(),
      songURL: songURL,
      songName: songName,
      songArtist: "Unnamed Artist"
    }

    songsContext.songAPIcalls.addSong(songObj)
      .then(res => {
        console.log(res)
        refreshSongList()
      })
      .catch(err => console.log(err))
  }

  return (
    <React.Fragment>
      <div style={{
        border: '2px solid'
      }}>
        <div className="container m-2">

          <div className="row mb-2">

            <div className="col">
              <h2>Selected Section</h2>
            </div>
            <div className="col">

              <Form>
                <div className="row">
                  <div className="col">
                    <Form.Control placeholder='Song Name' onChange={e => setSongName(e.target.value)} />
                  </div>
                  <div className="col">

                    <Form.Control placeholder='Song URL' onChange={e => setSongURL(e.target.value)} />
                  </div>
                  <div className="col">
                    <Button onClick={() => addSong()}>
                      Add Song to All
                    </Button>
                  </div>
                </div>
              </Form>

            </div>
          </div>
        </div>

        <div className="row mb-2">

          <div className="col-md-7">
            <Card className="bg-dark text-white">
              <Card.Img
                src={selectedSection.sectionPhotoURL}
                alt="Card image"
                height={300}
              />
              <Card.ImgOverlay>
                <Card.Title>{selectedSection.sectionName}</Card.Title>
                <Card.Text>
                  {selectedSection.sectionDescription}
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </div>
          <div className="col">
            {renderSongs()}
          </div>
        </div>
      </div>

    </React.Fragment >
  )
}

export default SelectedSectionComponent