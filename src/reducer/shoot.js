import { calculateAngle } from '../utils/formulas'

function shoot(state, action) {
  // If it is not, it simply returns the current state. 
  if(!state.gameState.started) {
    return state
  }

  const { cannonBalls } = state.gameState

  // it checks if the game already contains two cannon balls
  // limiting the number of cannon balls (2 balls)
  if(cannonBalls.length === 2) {
    return state
  }

  const { x, y } = action.mousePosition

  const angle = calculateAngle(0, 0, x, y)

  const id = (new Date()).getTime()
  const cannonBall = {
    position: { 
      x: 0, 
      y: 0,
    },
    angle,
    id,
  }

  return {
    ...state,
    gameState: {
      ...state.gameState,
      cannonBalls: [...cannonBalls, cannonBall],
    }
  }
}

export default shoot