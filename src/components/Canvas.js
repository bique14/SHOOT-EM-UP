// @flow
import React from 'react'
import Sky from './Sky'
import Ground from './Ground'
import CannonBase from './CannonBase'
import CannonPipe from './CannonPipe'

type Props = {
  trackMouse: Function,
  angle: number,
}

class Canvas extends React.Component<Props> {

  render() {
    const style = {
      border: '1px solid black'
    }
    const viewBox = [window.innerWidth/-2, 100-window.innerHeight, window.innerWidth, window.innerHeight]
    return (
      <svg id="aliens-go-home-canvas"
        preserveAspectRatio="xMaxYMax none"
        onMouseMove={this.props.trackMouse}
        viewBox={viewBox}
      >
        <Sky />
        <Ground />
        <CannonPipe rotation={this.props.angle}/>
        <CannonBase />
      </svg>
    )
  }
}

export default Canvas