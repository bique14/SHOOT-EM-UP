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
import StartGame from './StartGame'
import Title from './Title'

type Game = {
  started: boolean,
  kills: number,
  lives: number,
}

type Props = {
  angle: number,
  gameState: Game,
  trackMouse: Function,
  startGame: Function,
}

class Canvas extends React.Component<Props> {

  render() {
    const gameHeight = 1200
    const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight]

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
        <Heart position={{x: -300, y: 35}} />

        { !this.props.gameState.started &&
          <g>
            <StartGame onClick={() => this.props.startGame()} />
            <Title />
          </g>
        }

        { this.props.gameState.started &&
          <g>
            <FlyingObject position={{x: -150, y: -300}}/>
            <FlyingObject position={{x: 150, y: -300}}/>
          </g>
        }
      </svg>
    )
  }
}

export default Canvas