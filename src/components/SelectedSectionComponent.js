import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useSections, useSongs } from './api/APIAxios'
import { v4 as uuid } from 'uuid'

function SelectedSectionComponent(props) {

  const sectionsContext = useSections();
  const songsContext = useSongs();
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
    const songsRendered = sectionSongs.map((song) => {
      return (
        <React.Fragment key={song.songID}>
          <div className="row m-2 ">
            <div className="col-10 row">
              <Button variant='outline-success' >{song.songName}</Button>
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
                    Add Song
                  </Button>
                </div>
              </div>
            </Form>

          </div>
        </div>
      </div>

      <div className="row mb-2">
        {renderSongs()}
      </div>

    </React.Fragment >
  )
}

export default SelectedSectionComponent