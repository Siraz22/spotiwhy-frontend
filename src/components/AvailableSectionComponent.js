import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSections } from './api/APIAxios'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'

function AvailableSectionComponent(props) {

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

    const sectionsRendered = sections.map((section) => {
      return (
        <React.Fragment key={section.sectionID}>
          <div className="row m-2 ">
            <div className="col-8 row">
              <Link to={`/section/${section.sectionName}`}>
                <Button onClick={() => props.setSelectedSection({ sectionName: section.sectionName, sectionID: section.sectionID })} variant='outline-success' >{section.sectionName}</Button>
              </Link>
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
      sectionDescription: "No description",
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
      <div style={{
        border: '2px solid',
        order: -1
      }}>
        <h2>Available Sections Component</h2>

        <Form className='mb-2'>
          <div className="row">
            <div className="col">
              <Form.Control placeholder='Section Name' onChange={e => setSectionName(e.target.value)} />
            </div>
            <div className="col">
              <Button onClick={() => addSection()}>
                Add Section
              </Button>
            </div>
          </div>
        </Form>

        <Link to={`/`}>
          <Button onClick={() => props.setSelectedSection({ sectionName: 'default', sectionID: '' })} variant='info'>All Songs</Button>
        </Link>

        {renderSections()}
      </div>

    </React.Fragment >
  )
}

export default AvailableSectionComponent