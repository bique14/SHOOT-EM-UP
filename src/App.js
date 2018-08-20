import React, { Component } from 'react'
import * as Auth0 from 'auth0-web'

import './App.css'
import Canvas from './components/Canvas'
import { getCanvasPosition } from './utils/formulas'

const AUTH = require('./utils/secret')

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
  moveObjects: Function,
  startGame: Function,
}

Auth0.configure({
  domain: AUTH.DOMAIN,
  clientID: AUTH.CLIENT_ID,
  redirectUri: 'http://localhost:3000/',
  responseType: 'token id_token',
  scope: 'openid profile manage:points',
})

class App extends Component<Props> {
  componentDidMount() {
    //  if the player is returning from Auth0 after authenticating. This function simply tries to fetch tokens from the URL and, if it succeeds, fetches the player profile and persists everything in the localstorage.
    Auth0.handleAuthCallback()

    // function to log if the player is authenticated or not
    Auth0.subscribe((auth) => {
      console.log(auth);
    })

    setInterval(() => {
      this.props.moveObjects(this.canvasMousePosition)
    }, 10)

    window.onresize = () => {
      const cnv = document.getElementById('aliens-go-home-canvas')
      cnv.style.width = `${window.innerWidth}px`
      cnv.style.height = `${window.innerHeight}px`
    }
    window.onresize()
  }

  trackMouse(event: any) {
    this.canvasMousePosition = getCanvasPosition(event)
  }

  render() {
    return (
      <div className="App">
        <Canvas angle={this.props.angle}
          trackMouse={event => (this.trackMouse(event))}
          gameState={this.props.gameState}
          startGame={this.props.startGame}
        />
      </div>
    )
  }
}

export default App