import { calculateNextPosition } from '../utils/formulas'

const moveBalls = cannonBalls => (
  cannonBalls.filter(cannonBall => (
    // remove cannonBalls that are not within a specific area.
    cannonBall.position.y > -1200 && cannonBall.position.x > -800 && cannonBall.position.x < 800
  )).map((cannonBall) => {
    const { x, y } = cannonBall.position
    const { angle } = cannonBall
    return {
      ...cannonBall,
      position: calculateNextPosition(x, y, angle, 5),
    }
  })
)

export default moveBalls