import React, { createContext, useContext, useRef, useState } from 'react'
export const CustomGlobalContext = createContext();

function CustomGlobalInstances({ children }) {

  const [currPlayingSongSet, setCurrPlayingSet] = useState([])
  const [playingSongIndex, setPlayingSongIndex] = useState(0)
  const playerRef = useRef();

  return (
    <CustomGlobalContext.Provider
      value={{
        currPlayingSongSet: currPlayingSongSet,
        setCurrPlayingSet: setCurrPlayingSet,
        playingSongIndex: playingSongIndex,
        setPlayingSongIndex: setPlayingSongIndex,
        playerRef: playerRef
      }}
    >

      {children}

    </CustomGlobalContext.Provider>
  )

}

export const useGlobalInstances = () => useContext(CustomGlobalContext);
export default CustomGlobalInstances