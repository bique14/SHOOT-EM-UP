import { connect } from 'react-redux';

import App from '../App';
import { 
  moveObjects,
  startGame
} from '../actions/index'

function mapStateToProps(state) {
  return {
    angle: state.angle,
    gameState: state.gameState,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    moveObjects: (mousePosition) => {
      dispatch(moveObjects(mousePosition))
    },
    startGame: () => {
      dispatch(startGame())
    }
  }
}

const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default Game