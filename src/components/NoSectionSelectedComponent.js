import React, { useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { SectionsContext, useSections, useSongs } from './api/APIAxios'
import { v4 as uuid } from 'uuid'

function NoSectionSelectedComponent() {

  const sectionsContext = useSections();
  const songsContext = useSongs();
  const [songs, setSongs] = useState([])
  const [songName, setSongName] = useState('')
  const [songURL, setSongURL] = useState('')
  const [sections, setSections] = useState([])
  const [selectedSongsID, setSelectedSongs] = useState([])
  const [selectedSection, setSelectedSection] = useState('')

  useEffect(() => {
    songsContext.songAPIcalls.getSongs()
      .then((res) => {
        console.log(res.data)
        setSongs(res.data)
      })
      .catch(err => console.log(err))

    sectionsContext.sectionAPIcalls.getSections()
      .then((res) => {
        console.log(res.data)
        setSections(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (selectedSongsID.length === 0) {
      setSelectedSection('')
    }
  }, [selectedSongsID])

  function refreshSongList() {

    songsContext.songAPIcalls.getSongs()
      .then((res) => {
        console.log(res.data)
        setSongs(res.data)
      })
      .catch(err => console.log(err))
  }

  function checkboxChecked(songID, checked) {
    console.log("checkbox clicked")

    if (checked) {
      setSelectedSongs([...selectedSongsID, songID])
    }
    else if (!checked) {
      setSelectedSongs(selectedSongsID.filter((entry) => entry !== songID))
    }
  }

  function renderSongs() {
    const songsRendered = songs.map((song) => {
      return (
        <React.Fragment key={song.songID}>
          <div className="row m-2 ">
            <div className="col">
              <Form.Check type='checkbox' onChange={(event) => checkboxChecked(song.songID, event.target.checked)}></Form.Check>
            </div>
            <div className="col-10 row">
              <Button variant='outline-success' >{song.songName}</Button>
            </div>
            <div className="col">
              <Button onClick={() => deleteSong(song.songID)}>Delete Song</Button>
            </div>
          </div>
        </React.Fragment >
      )
    })

    return songsRendered
  }

  function renderSections() {
    const sectionsRendered = sections.map((section) => {
      return (
        <React.Fragment key={section.sectionID}>
          <Form.Check
            type="radio"
            name="sectionToAddSongs"
            onChange={() => setSelectedSection(section.sectionID)}
            label={section.sectionName}
          />
        </React.Fragment >
      )
    })
    return sectionsRendered
  }

  function addSongsToSection() {
    selectedSongsID.map((songID) => {
      //console.log(songID)

      songsContext.songAPIcalls.addSongToSection(songID, selectedSection)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => console.log(err))
    })
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
              <h2>All Songs Section Component</h2>
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

            {selectedSongsID.length !== 0 && <div className="">
              Add songs to which section?
              <Form>
                {renderSections()}
              </Form>
              <Button onClick={addSongsToSection} variant='secondary'>
                Add to section
              </Button>
            </div>}

          </div>
        </div>

        <div className="row mb-2">
          <Form>
            {renderSongs()}
          </Form>
        </div>
      </div>

    </React.Fragment >
  )
}

export default NoSectionSelectedComponent