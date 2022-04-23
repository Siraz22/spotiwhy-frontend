import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
export const SongsContext = createContext();
export const SectionsContext = createContext();

//reference for Context syntax using children : https://stackoverflow.com/questions/70716489/how-to-send-data-from-one-component-to-another-components-with-context-in-react

function APIAxios({ children }) {

  // const [songsState, songsDispatch] = useReducer(songsReducer, [])
  // const [sectionState, sectionsDispatch] = useReducer(sectionsReducer, [])
  //
  // function songsReducer(songsState, action) {
  //   switch (action.type) {
  //     case SONGS_TYPE.GET: console.log("Get songs called");
  //     case SONGS_TYPE.ADD: console.log("Add songs called");
  //   }
  // }

  // function sectionsReducer(sectionsState, action) {
  //   switch (action.type) {
  //     case SECTIONS_TYPE.GET: console.log("Get section called");
  //     case SECTIONS_TYPE.ADD: console.log("Add sections called");
  //   }
  // }

  const baseURL = "http://localhost:8080"
  //const [songs, setSongs] = useState([])
  //const [sections, setSections] = useState([])

  // SONG API
  // async function getSongs() {
  //   return await axios.get(baseURL + `/songs`)
  // }

  async function getSongs() {
    return await axios.get(baseURL + `/songs`)
  }

  async function addSong(passedSong) {
    return await axios.post(baseURL + `/addSong`, passedSong)
  }

  async function deleteSong(songId) {
    return await axios.delete(baseURL + `/deleteSong/${songId}`)
  }

  async function updateSong(songId, passedSong) {
    return await axios.put(baseURL + `/deleteSong/${songId}`, passedSong)
  }

  // SECTION API
  async function getSections() {
    return await axios.get(baseURL + `/sections`)
  }

  async function getSectionById(id) {
    return await axios.get(baseURL + `/section/${id}`)
  }

  async function addSection(passedSection) {
    return await axios.post(baseURL + `/addSection`, passedSection)
  }

  async function deleteSection(sectionId) {
    return await axios.delete(baseURL + `/deleteSection/${sectionId}`)
  }

  async function updateSection(sectionId, passedSection) {
    return await axios.put(baseURL + `/deleteSection/${sectionId}`, passedSection)
  }

  return (
    <SongsContext.Provider
      value={{
        //songs: songs, setSongs: setSongs,
        songAPIcalls: { getSongs, addSong, updateSong, deleteSong }
      }}
    >
      <SectionsContext.Provider
        value={{
          //sections: sections, setSections: setSections,
          sectionAPIcalls: { getSections, addSection, deleteSection, updateSection, getSectionById }
        }}
      >

        {children}

      </SectionsContext.Provider>
    </SongsContext.Provider>
  )
}
export const useSongs = () => useContext(SongsContext);
export const useSections = () => useContext(SectionsContext);
export default APIAxios