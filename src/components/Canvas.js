// @flow
import React from 'react'
import Sky from './Sky'
import Ground from './Ground'
import CannonBase from './CannonBase'
import CannonPipe from './CannonPipe'
import CannonBall from './CannonBall'
import CurrentScore from './CurrentScore'
import FlyingObject from './FlyingObject'
import Heart from './Heart'

type Props = {
  trackMouse: Function,
  angle: number,
}

class Canvas extends React.Component<Props> {

  render() {
    const viewBox = [window.innerWidth/-2, 100-window.innerHeight, window.innerWidth, window.innerHeight]

    return (
      <svg id="aliens-go-home-canvas"
        preserveAspectRatio="xMaxYMax none"
        onMouseMove={this.props.trackMouse}
        viewBox={viewBox}
      >
        <defs>
          <filter id="shadow">
            <feDropShadow dx="1" dy="1" stdDeviation="2" />
          </filter>
        </defs>
        <Sky />
        <Ground />
        <CannonPipe rotation={this.props.angle}/>
        <CannonBase />
        <CannonBall position={{x: 0, y: -100}}/>
        <CurrentScore score={10}/>
        <FlyingObject position={{x: -150, y: -300}}/>
        <FlyingObject position={{x: 150, y: -300}}/>
        <Heart position={{x: -300, y: 35}} />
      </svg>
    )
  }
}

export default Canvas