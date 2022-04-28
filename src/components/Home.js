import React, { useEffect, useState } from 'react'
import SelectedSectionComponent from './SelectedSectionComponent'
import AvailableSectionComponent from './AvailableSectionComponent'
import VideoPlayer from './VideoPlayer'
import { Button, Col, Row } from 'react-bootstrap'
import { Switch, Route, Redirect } from 'react-router-dom'
import NoSectionSelectedComponent from './NoSectionSelectedComponent'
import OperationsHeader from './OperationsHeader'

function Home() {

  const [selectedSection, setSelectedSection] = useState(
    {
      sectionName: 'default',
      sectionID: ''
    }
  )

  //When we delete a section, since available sections is diff component, 
  //we need to explicitly call the refresh sections in this function too
  //Using this temp variable which will be passed to trigger useEffect 

  //NOTE : boolean value is chosen as it is easier to oscilate between
  //it has no significance other than to trigger a changed variable
  const [sectionDeletedRefreshTemp, setSectionDeletedRefreshTemp] = useState(false)

  function debug() {
    console.log(selectedSection)
  }

  return (
    <React.Fragment>

      <div
        style={{ padding: '1rem 1rem' }}
      >
        <Row>

          <div className="col-sm-12 col-md-12 order-md-0">
            <OperationsHeader />
          </div>

          <div className="col-sm-12 col-md-7 order-md-1">
            <AvailableSectionComponent
              setSelectedSection={setSelectedSection}
              sectionDeletedRefreshTemp={sectionDeletedRefreshTemp}
            />
          </div>

          <div className="col-sm-12 col-md-12 order-md-0">

            <Switch>

              {/* <Route path="/" exact>
                <Redirect to="/default" />
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
                    setSectionDeletedRefreshTemp={setSectionDeletedRefreshTemp}
                  />
                )
              } />

            </Switch>
          </div>

          <div className="col-sm-12 col-md-5 order-md-1">
            <VideoPlayer />
          </div>

        </Row>

      </div>

      {/* <Button onClick={debug}>Debug</Button> */}

    </React.Fragment >
  )
}

export default Home