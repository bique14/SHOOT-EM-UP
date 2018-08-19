import { connect } from 'react-redux';

import App from '../App';
import { moveObjects } from '../actions/index'

function mapStateToProps(state) {
  return {
    angle: state.angle
  }
}

function mapDispatchToProps(dispatch) {
  return {
    moveObjects: (mousePosition) => {
      dispatch(moveObjects(mousePosition))
    }
  }
}

const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default Game