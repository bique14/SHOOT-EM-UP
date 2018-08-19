import {
  MOVE_OBJECTS
} from '../actions'
import moveObjects from './moveObjects'

const initialState = {
  message: `It's easy to integrate React and Redux, isn't it?`
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case MOVE_OBJECTS:
      return moveObjects(state, action)
    default:
      return state
  }
}

export default reducer