import React from 'react'
import { signIn } from 'auth0-web'

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
import Login from './Login'
import Leaderboard from './Leaderboard'

type Shape = {
  x: number,
  y: number,
}

type ArrFlyingObject = {
  position: Shape,
  id: number,
}

type Game = {
  started: boolean,
  kills: number,
  lives: number,
  flyingObjects: [ArrFlyingObject],
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
    const lives = []
    for (let i = 0 ; i < this.props.gameState.lives ; i++) {
      const heartPosition = {
        x: -180 - (i * 70),
        y: 35
      }
      lives.push(<Heart key={i} position={heartPosition}/>)
    }

    // console.log('current player :',this.props.currentPlayer)
    return (
      <svg id="aliens-go-home-canvas"
        preserveAspectRatio="xMaxYMax none"
        onMouseMove={this.props.trackMouse}
        viewBox={viewBox}
        onClick={this.props.shoot}
      >
        <defs>
          <filter id="shadow">
            <feDropShadow dx="1" dy="1" stdDeviation="2" />
          </filter>
        </defs>
        <Sky />
        <Ground />
        {this.props.gameState.cannonBalls.map(cannonBall => (
          <CannonBall
            key={cannonBall.id}
            position={cannonBall.position}
          />
        ))}

        <CannonPipe rotation={this.props.angle}/>
        <CannonBase />
        <CurrentScore score={this.props.gameState.kills} />

        {!this.props.gameState.started &&
          <g>
            <StartGame onClick={() => this.props.startGame()} />
            <Title />
             <Leaderboard currentPlayer={this.props.currentPlayer} 
              authenticate={signIn} 
              leaderboard={this.props.players} 
            />
            <Login authenticate={signIn} />
          </g>
        }

        {this.props.gameState.flyingObjects.map(flyingObject => (
          <FlyingObject key={flyingObject.id}
            position={flyingObject.position}
          />
        ))}
        {lives}
      </svg>
    )
  }
}

export default Canvas