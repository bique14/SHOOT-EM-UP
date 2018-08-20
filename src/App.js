import React, { Component } from 'react'
import * as Auth0 from 'auth0-web'
import io from 'socket.io-client'

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
  audience: 'https://aliens-go-home.digituz.com.br',
})

class App extends Component<Props> {
  componentDidMount() {
    //  if the player is returning from Auth0 after authenticating. This function simply tries to fetch tokens from the URL and, if it succeeds, fetches the player profile and persists everything in the localstorage.
    Auth0.handleAuthCallback()

    // function to log if the player is authenticated or not
    Auth0.subscribe((auth) => {
      if (!auth) {
        return
      }

      const playerProfile = Auth0.getProfile()
      const currentPlayer = {
        id: playerProfile.sub,
        maxScore: 0,
        name: playerProfile.name,
        picture: playerProfile.picture,
      }

      // create the currentPlayer constant and update the Redux store 
      this.props.loggedIn(currentPlayer)

      // connect to your real-time service
      const socket = io('http://localhost:3001', {
        query: `token=${Auth0.getAccessToken()}`,
      })

      let emitted = false
      socket.on('players', (players) => {
        // listen to the players event emitted by your real-time service 
        // to update the Redux store
        this.props.leaderboardLoaded(players)

        if (emitted) {
          return
        }
        socket.emit('new-max-score', {
          id: playerProfile.sub,
          maxScore: 120,
          name: playerProfile.name,
          picture: playerProfile.picture,
        })
        emitted = true
        setTimeout(() => {
          socket.emit('new-max-score', {
            id: playerProfile.sub,
            maxScore: 222,
            name: playerProfile.name,
            picture: playerProfile.picture,
          })
        }, 5000)
      })
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
          currentPlayer={this.props.currentPlayer}
          players={this.props.players}
        />
      </div>
    )
  }
}

export default App