import React, { useEffect, useState } from 'react'
import SelectedSectionComponent from './SelectedSectionComponent'
import AvailableSectionComponent from './AvailableSectionComponent'
import VideoPlayer from './VideoPlayer'
import { Button, Col, Row } from 'react-bootstrap'
import { Switch, Route, Redirect } from 'react-router-dom'
import NoSectionSelectedComponent from './NoSectionSelectedComponent'

function Home() {

  const [selectedSection, setSelectedSection] = useState(
    {
      sectionName: 'default',
      sectionID: ''
    }
  )

  function debug() {
    console.log(selectedSection)
  }

  return (
    <React.Fragment>

      <div className="container">

        <Row>

          <div className="col-sm-12 col-md-6 order-md-1">
            <AvailableSectionComponent setSelectedSection={setSelectedSection} />
          </div>

          <div className="col-sm-12 col-md-12 order-md-0">

            <Switch>

              {/* <Route path="/" exact>
                <Redirect to="/default" />
              </Route> */}

              {/* <Route path="/" exact>
                <NoSectionSelectedComponent />
              </Route> */}

              <Route path="/" exact render={
                (props) => (
                  <NoSectionSelectedComponent
                    {...props}
                  />
                )
              } />

              <Route path="/section/:selectedSection" render={
                (props) => (
                  <SelectedSectionComponent
                    {...props}
                    selectedSection={selectedSection}
                  />
                )
              } />

            </Switch>
          </div>

          <div className="col-sm-12 col-md-6 order-md-1">
            <VideoPlayer />
          </div>

        </Row>

      </div>

      {/* <Button onClick={debug}>Debug</Button> */}

    </React.Fragment >
  )
}

export default Home