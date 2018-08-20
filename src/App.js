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
  constructor(props) {
    super(props)
    this.socket = null
    this.currentPlayer = null
  }

  componentDidMount() {
    //  if the player is returning from Auth0 after authenticating. This function simply tries to fetch tokens from the URL and, if it succeeds, fetches the player profile and persists everything in the localstorage.
    Auth0.handleAuthCallback()

    // function to log if the player is authenticated or not
    Auth0.subscribe((auth) => {
      if (!auth) {
        return
      }

      this.playerProfile = Auth0.getProfile()
      this.currentPlayer = {
        id: this.playerProfile.sub,
        maxScore: 0,
        name: this.playerProfile.name,
        picture: this.playerProfile.picture,
      }

      // create the currentPlayer constant and update the Redux store 
      this.props.loggedIn(this.currentPlayer)

      // connect to your real-time service
      this.socket = io('http://localhost:3001', {
        query: `token=${Auth0.getAccessToken()}`,
      })

      let emitted = false
      this.socket.on('players', (players) => {
        // listen to the players event emitted by your real-time service 
        // to update the Redux store
        this.props.leaderboardLoaded(players)

        if (emitted) {
          return
        }
        this.socket.on('players', (players) => {
          this.props.leaderboardLoaded(players);
          players.forEach((player) => {
            if (player.id === this.currentPlayer.id) {
              this.currentPlayer.maxScore = player.maxScore;
            }
          })
        })
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

  // to check if players have reached a new maxScore. 
  // If so, your game emits a new-max-score event to update the leaderboard.
  componentWillReceiveProps(nextProps) {
    if (!nextProps.gameState.started && this.props.gameState.started) {
      if (this.currentPlayer.maxScore < this.props.gameState.kills) {
        this.socket.emit('new-max-score', {
          ...this.currentPlayer,
          maxScore: this.props.gameState.kills,
        });
      }
    }
  }

  trackMouse(event: any) {
    this.canvasMousePosition = getCanvasPosition(event)
  }

  shoot() {
    this.props.shoot(this.canvasMousePosition)
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
          shoot={this.shoot.bind(this)}
        />
      </div>
    )
  }
}

export default App