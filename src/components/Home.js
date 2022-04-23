import React, { useEffect, useState } from 'react'
import SelectedSectionComponent from './SelectedSectionComponent'
import AvailableSectionComponent from './AvailableSectionComponent'
import VideoPlayer from './VideoPlayer'
import { Button } from 'react-bootstrap'
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
        <div className="row">
          <div className="col">
            <Switch>

              {/* <Route path="/" exact>
                <Redirect to="/default" />
              </Route> */}

              <Route path="/" exact>
                <NoSectionSelectedComponent />
              </Route>

              {/* <Route path="/section/:sectionName">
                <SelectedSectionComponent selectedSection={selectedSection} />
              </Route> */}

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

        </div>
        <div className="row">
          <div className="col">
            <AvailableSectionComponent setSelectedSection={setSelectedSection} />
          </div>
          <div className="col">
            <VideoPlayer />
          </div>
        </div>
      </div>

      <Button onClick={debug}>Debug</Button>

    </React.Fragment >
  )
}

export default Home