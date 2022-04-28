import React, { useEffect, useRef, useState } from 'react'
import { Button, Dropdown, Card, Col, Form, Image, Row } from 'react-bootstrap'
import { useSections } from './api/APIAxios'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'
import { HiDotsVertical } from 'react-icons/hi'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    partialVisibilityGutter: 60,
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 50
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 50
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30
  }
};

function AvailableSectionComponent(props) {

  const sectionsContext = useSections();
  const [sections, setSections] = useState([])
  const [sectionName, setSectionName] = useState('')


  useEffect(() => {
    console.log("Hey I got triggered!")
    refreshSection()
  }, [props.sectionDeletedRefreshTemp])

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
        setSections(res.data)
      })
      .catch(err => console.log(err))
  }

  function renderSections() {

    console.log("Re-rendering the carousel!")
    console.log(sections)

    const sectionsRendered = sections.map((section) => {
      return (
        <React.Fragment key={section.sectionID}>

          <Link to={`/section/${section.sectionName}`} style={{ textDecoration: 'none' }}>
            <Card
              onClick={() => props.setSelectedSection({ sectionName: section.sectionName, sectionID: section.sectionID })}
              //onClick={() => console.log(props)}
              className="bg-dark text-white"
              style={{
                width: '15rem',
                border: '0px solid',
              }}
            >
              <Card.Img variant="top" height={130} src={section.sectionPhotoURL} />

              {/* <Card.ImgOverlay>

                <div>
                  <Dropdown >
                    <Dropdown.Toggle style={{ marginRight: '-380px' }} variant="none" id="dropdown-basic">
                      <HiDotsVertical color='white' fontSize={25} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant='dark'>
                      <Dropdown.Item onClick={() => console.log()}>Delete Section</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

              </Card.ImgOverlay> */}


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
      <div
        className="customClass"
        style={{
          border: '0px solid',
        }}>

        {/* <h2>Available Sections Component</h2>

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
        </Form> */}

        {/* <Link to={`/`} style={{ textDecoration: 'none' }}>
          <Button onClick={() => props.setSelectedSection({ sectionName: 'default', sectionID: '' })} variant='info'>All Songs</Button>
        </Link> */}

        <div className="container">

          <Link to={`/`} style={{ textDecoration: 'none' }}>
            <Card
              onClick={() => props.setSelectedSection({ sectionName: 'default', sectionID: '' })}
              className="bg-dark text-white customClass"
            >
              <Card.Img
                src="/allSongs.png"
                alt="Card image"
                height={160}
              />
              <Card.ImgOverlay>
                <Card.Title style={{ fontSize: "70px" }}>All songs</Card.Title>
                <Card.Text className="muted">
                  Explore your library
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Link>

          <Carousel
            swipeable={true}
            //arrows={false}
            //draggable={true}
            //showDots={false}
            responsive={responsive}
            infinite={true}
            partialVisible={true}
            //itemClass="image-item"
            //autoPlay={true}
            autoPlaySpeed={10000}
            transitionDuration={500}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            itemClass="carousel-item-padding-20-px"
          >

            {renderSections()}

          </Carousel>
        </div>
      </div>

    </React.Fragment >
  )
}

export default AvailableSectionComponent