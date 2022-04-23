import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useSections, useSongs } from './api/APIAxios'
import { v4 as uuid } from 'uuid'

function NoSectionSelectedComponent() {

  //const sectionsContext = useSections();
  const songsContext = useSongs();
  const [songs, setSongs] = useState([])
  const [songName, setSongName] = useState('')
  const [songURL, setSongURL] = useState('')
  const [sections, setSections] = useState([])

  useEffect(() => {

    songsContext.songAPIcalls.getSongs()
      .then((res) => {
        console.log(res.data)
        setSongs(res.data)
      })
      .catch(err => console.log(err))

  }, [])

  function refreshSongList() {

    songsContext.songAPIcalls.getSongs()
      .then((res) => {
        console.log(res.data)
        setSongs(res.data)
      })
      .catch(err => console.log(err))

    //refreshing the section will update the section songs set too
    // sectionsContext.sectionAPIcalls.getSections()
    //   .then((res) => {
    //     console.log(res.data)
    //     setSections(sections)
    //   })
    //   .catch(err => console.log(err))
  }

  function renderSongs() {
    const songsRendered = songs.map((song) => {
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
            <h2>No Section Seleted</h2>
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

export default NoSectionSelectedComponent