import React from 'react'
import SelectedSectionComponent from './SelectedSectionComponent'
import SectionComponent from './SectionComponent'
import VideoPlayer from './VideoPlayer'

function Home() {
  return (
    <React.Fragment>

      <div className="container">
        <div className="row">
          <div className="col">
            <SelectedSectionComponent />
          </div>

        </div>
        <div className="row">
          <div className="col">
            <SectionComponent />
          </div>
          <div className="col">
            <VideoPlayer />
          </div>
        </div>
      </div>

    </React.Fragment >
  )
}

export default Home