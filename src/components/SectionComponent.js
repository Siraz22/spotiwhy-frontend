import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSections, useSongs } from './api/APIAxios'
import { v4 as uuid } from 'uuid'

function SectionComponent() {

  const sectionsContext = useSections();
  const [sections, setSections] = useState([])
  const [sectionName, setSectionName] = useState('')

  useEffect(() => {
    sectionsContext.sectionAPIcalls.getSections()
      .then((res) => {
        console.log(res.data)
        setSections(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  function refreshSection() {
    sectionsContext.sectionAPIcalls.getSections()
      .then((res) => {
        console.log(res.data)
        setSections(sections)
      })
      .catch(err => console.log(err))
  }

  function renderSections() {
    console.log("rendering sections")
    console.log(sections)

    const sectionsRendered = sections.map((section) => {
      return (
        <React.Fragment key={section.sectionID}>
          <div className="row m-2 ">
            <div className="col-8 row">
              <Button variant='outline-success' >{section.sectionName}</Button>
            </div>
            <div className="col">
              <Button onClick={() => deleteSection(section.sectionID)}>Delete section</Button>
            </div>
          </div>
        </React.Fragment>
      )
    })

    return sectionsRendered
  }

  function deleteSection(sectionIDtoDelete) {
    sectionsContext.sectionAPIcalls.deleteSection(sectionIDtoDelete)
      .then(res => {
        console.log(res)
        refreshSection()
      })
      .catch(err => console.log(err))
  }

  function addSection() {
    let sectionObj = {
      sectionID: uuid(),
      sectionPhotoURL: '',
      sectionName: sectionName,
      sectionOwnerId: "siraz",
      songs_set: []
    }

    sectionsContext.sectionAPIcalls.addSection(sectionObj)
      .then(res => {
        console.log(res)
        refreshSection()
      })
      .catch(err => console.log(err))
  }

  return (
    <React.Fragment>
      <h2>Sections Component</h2>
      {renderSections()}
    </React.Fragment>
  )
}

export default SectionComponent