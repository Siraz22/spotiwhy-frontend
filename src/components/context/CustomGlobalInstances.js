import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
export const CustomGlobalContext = createContext();

function CustomGlobalInstances({ children }) {

  const [currPlayingSongSet, setCurrPlayingSet] = useState([])
  const [playingSongIndex, setPlayingSongIndex] = useState(0)
  const playerRef = useRef();
  //const [sections, setSections] = useState([])
  const [shuffle, setShuffle] = useState(false)

  return (
    <CustomGlobalContext.Provider
      value={{
        currPlayingSongSet: currPlayingSongSet,
        setCurrPlayingSet: setCurrPlayingSet,
        playingSongIndex: playingSongIndex,
        setPlayingSongIndex: setPlayingSongIndex,
        shuffle: shuffle,
        setShuffle: setShuffle,
        playerRef: playerRef,
      }}
    >

      {children}

    </CustomGlobalContext.Provider>
  )

}

export const useGlobalInstances = () => useContext(CustomGlobalContext);
export default CustomGlobalInstances