import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, Dropdown, Card, Col, Form, Image, Row, InputGroup } from 'react-bootstrap'
import { useSections } from './api/APIAxios'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    partialVisibilityGutter: 20,
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    partialVisibilityGutter: 45
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    partialVisibilityGutter: 20
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    partialVisibilityGutter: 10
  }
};

function AvailableSectionComponent(props) {

  const sectionsContext = useSections();
  const [sections, setSections] = useState([])
  const [sectionName, setSectionName] = useState('')
  const [addSectionModal, setAddSectionModal] = useState(false)

  useEffect(() => {
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

    const sectionsRendered = sections.map((section) => {
      return (
        <React.Fragment key={section.sectionID}>

          <Link to={`/section/${section.sectionID}`} style={{ textDecoration: 'none', color: 'antiquewhite' }}>

            <div
              id="parent"
              xs={12} className="mb-2"
            >
              <img
                onClick={() => props.setSelectedSection({ sectionID: section.sectionID })}
                src={section.sectionPhotoURL}
                className="customBox-left trimmed-cover"
                style={{
                  // 50% 50% signifies center
                  objectPosition: `65% 50%`,
                  aspectRatio: '1',
                  marginBottom: '15px'
                }}
                width='100%'
              />

              <span xs={12} className="text-truncate d-flex align-items-center justify-content-center">
                {section.sectionName}
              </span>
              <span xs={12} className="text-muted d-flex align-items-center justify-content-center">
                {section.songs_set.length} {(section.songs_set.length === 1 ? 'song' : 'songs')}
              </span>

            </div>

          </Link>
        </React.Fragment >
      )
    })

    return sectionsRendered
  }

  function AddSectionModal() {

    const [sectionPhotoURL, setSectionPhotoURL] = useState('')
    const [sectionName, setSectionName] = useState('')
    const [sectionDescription, setSectionDescription] = useState('')


    function addSection() {
      let sectionObj = {
        sectionID: uuid(),
        sectionPhotoURL: sectionPhotoURL,
        sectionName: sectionName,
        sectionDescription: sectionDescription,
        sectionOwnerId: "siraz",
        songs_set: []
      }

      sectionsContext.sectionAPIcalls.addSection(sectionObj)
        .then(res => {
          console.log(res)
          refreshSection()
        })
        .catch(err => console.log(err))

      setAddSectionModal(false)
    }

    return (
      <Modal show={addSectionModal} onHide={() => setAddSectionModal(false)}>
        <div className="customdarktheme">
          <Modal.Header>
            <Modal.Title>Add Section</Modal.Title>
          </Modal.Header>
          <Modal.Body  >
            <Form>

              <Form.Group>
                <Form.Label>Section Name</Form.Label>
                <InputGroup hasValidation>

                  <Form.Control
                    isInvalid={sectionName === '' ? true : false}
                    isValid={sectionName === '' ? false : true}
                    onChange={event => setSectionName(event.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">Name can't be null</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <Form.Label>Section Description</Form.Label>
                <InputGroup hasValidation>

                  <Form.Control
                    isInvalid={sectionDescription === '' ? true : false}
                    isValid={sectionDescription === '' ? false : true}
                    onChange={event => setSectionDescription(event.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">Description can't be null</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <Form.Label>Section Photo URL</Form.Label>
                <Form.Control
                  onChange={event => setSectionPhotoURL(event.target.value)}
                  placeholder="Optional"
                />
                {/* <Form.Control.Feedback type="invalid">Name can't be null</Form.Control.Feedback> */}
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setAddSectionModal(false)}>
              Close
            </Button>
            <Button
              disabled={sectionName === ''}
              variant="primary" onClick={() => addSection()}>
              Add Section
            </Button>

          </Modal.Footer>
        </div>
      </Modal >
    )
  }

  return (
    <React.Fragment>
      <div
        className="customClass"
        style={{
          border: '0px solid',
        }}>

        <div className="container">

          <span><h5>Sections</h5></span>

          <Row style={{ marginBottom: '20px' }}>
            <Col xs={7}>
              <Link to={`/`} style={{ textDecoration: 'none' }}>
                <Card
                  style={{
                    backgroundColor: '#fff0',
                    border: '0px'
                  }}
                  onClick={() => props.setSelectedSection({ sectionName: 'default', sectionID: '' })}
                  className="text-white"
                >
                  <img
                    className="trimmed-cover"
                    src="/allSongs.png"
                    alt="Card image"
                    height={200}
                    style={{
                      borderRadius: '15px',
                      objectPosition: `30% 60%`
                    }}
                  />

                  <Card.ImgOverlay>
                    <h1>All songs</h1>
                    <Card.Text className="muted">
                      Explore your library
                    </Card.Text>
                  </Card.ImgOverlay>
                </Card>
              </Link>
            </Col>

            <Col xs={5}>
              <div
                style={{ marginBottom: '20px' }}
              >
                <Card
                  style={{
                    backgroundColor: '#fff0',
                    border: '0px'
                  }}
                  className="text-white"
                >
                  <img
                    className="trimmed-cover"
                    style={{ borderRadius: '15px' }}
                    // onClick={() => setAddSectionModal(true)}
                    // src="https://i.gifer.com/OKEq.gif"
                    src="https://media.giphy.com/media/3q3SUqPnxZGQpMNcjc/giphy.gif"
                    height={90}
                  />

                  <Card.ImgOverlay
                    onClick={() => setAddSectionModal(true)}
                    className='d-flex align-items-center justify-content-center'>
                    <span>
                      Add A Section?
                    </span>
                  </Card.ImgOverlay>

                </Card>
              </div>

              <div>
                <Card
                  style={{
                    backgroundColor: '#fff0',
                    border: '0px'
                  }}
                  className="text-white"
                >
                  <img
                    className="trimmed-cover"
                    style={{ borderRadius: '15px' }}
                    // onClick={() => setAddSectionModal(true)}
                    // src="https://i.gifer.com/OKEq.gif"
                    src="https://media.giphy.com/media/3q3SUqPnxZGQpMNcjc/giphy.gif"
                    height={90}
                  />

                  <Card.ImgOverlay
                    onClick={() => setAddSectionModal(true)}
                    className='d-flex align-items-center justify-content-center'>
                    <span>
                      Unnamed Feature
                    </span>
                  </Card.ImgOverlay>

                </Card>
              </div>
            </Col>

          </Row>

          <AddSectionModal />

          <Carousel

            swipeable={true}
            //arrows={false}
            //draggable={true}
            //showDots={true}
            responsive={responsive}
            infinite={true}
            partialVisible={true}
            autoPlay={true}
            autoPlaySpeed={10000}
            transitionDuration={500}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            itemClass="image-item"
          >

            {renderSections()}

          </Carousel>
        </div>
      </div>

    </React.Fragment >
  )
}

export default AvailableSectionComponent