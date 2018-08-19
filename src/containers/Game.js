import { connect } from 'react-redux';
import App from '../App';

function mapStateToProps(state) {
  return {
    message: state.message
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const Game = connect(mapStateToProps, mapDispatchToProps)(App)
export default Game
