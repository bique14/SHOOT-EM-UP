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
    const leaderboard = [
      { id: 'd4', maxScore: 82, name: 'Ado Kukic', picture: 'https://twitter.com/KukicAdo/profile_image', },
      { id: 'a1', maxScore: 235, name: 'Bruno Krebs', picture: 'https://twitter.com/brunoskrebs/profile_image', },
      { id: 'c3', maxScore: 99, name: 'Diego Poza', picture: 'https://twitter.com/diegopoza/profile_image', },
      { id: 'b2', maxScore: 129, name: 'Jeana Tahnk', picture: 'https://twitter.com/jeanatahnk/profile_image', },
      { id: 'e5', maxScore: 34, name: 'Jenny Obrien', picture: 'https://twitter.com/jenny_obrien/profile_image', },
      { id: 'f6', maxScore: 153, name: 'Kim Maida', picture: 'https://twitter.com/KimMaida/profile_image', },
      { id: 'g7', maxScore: 55, name: 'Luke Oliff', picture: 'https://twitter.com/mroliff/profile_image', },
      { id: 'h8', maxScore: 146, name: 'Sebastián Peyrott', picture: 'https://twitter.com/speyrott/profile_image', },
    ]
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
        <CurrentScore score={10}/>
        <Heart position={{x: -300, y: 35}} />

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
      </svg>
    )
  }
}

export default Canvas