import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useSections } from './api/APIAxios'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

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


          {/* <div className="row m-2 ">
            <div className="col-8 row">
              <Link to={`/section/${section.sectionName}`}>
                <Button onClick={() => props.setSelectedSection({ sectionName: section.sectionName, sectionID: section.sectionID })} variant='outline-success' >{section.sectionName}</Button>
              </Link>
            </div>
            <div className="col">
              <Button onClick={() => deleteSection(section.sectionID)}>Delete section</Button>
            </div>
          </div> */}

          <Link to={`/section/${section.sectionName}`} style={{ textDecoration: 'none' }}>
            <Card
              onClick={() => props.setSelectedSection({ sectionName: section.sectionName, sectionID: section.sectionID })}
              //onClick={() => console.log(props)}
              className="bg-dark text-white" style={{ width: '12rem' }}
            >
              <Card.Img variant="top" height={130} src={section.sectionPhotoURL} />
              <Card.Body>
                <Card.Title>{section.sectionName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Section description
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Link>

        </React.Fragment >
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

        <Link to={`/`} style={{ textDecoration: 'none' }}>
          <Button onClick={() => props.setSelectedSection({ sectionName: 'default', sectionID: '' })} variant='info'>All Songs</Button>
        </Link>

        <Carousel
          swipeable={true}
          //arrows={false}
          draggable={true}
          //showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          transitionDuration={500}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="carousel-item-padding-40-px"
        >

          {renderSections()}

        </Carousel>

      </div>

    </React.Fragment >
  )
}

export default AvailableSectionComponent