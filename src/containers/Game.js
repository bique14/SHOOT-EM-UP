import { connect } from 'react-redux';

import App from '../App';
import { 
  leaderboardLoaded, 
  loggedIn,
  moveObjects,
  startGame,
  shoot,
} from '../actions/index'

function mapStateToProps(state) {
  return {
    angle: state.angle,
    gameState: state.gameState,
    currentPlayer: state.currentPlayer,
    players: state.players,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    moveObjects: (mousePosition) => {
      dispatch(moveObjects(mousePosition))
    },
    startGame: () => {
      dispatch(startGame())
    },
    leaderboardLoaded: (players) => {
      dispatch(leaderboardLoaded(players))
    },
    loggedIn: (players) => {
      dispatch(loggedIn(players))
    },
    shoot: (mousePosition) => {
      dispatch(shoot(mousePosition))
    }
  }
}

const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default Game