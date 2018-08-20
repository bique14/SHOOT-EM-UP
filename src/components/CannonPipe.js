// @flow
import React from 'react'
import { pathFromBezierCurve } from '../utils/formulas'

type Props = {
  rotation: number
}

class CannonPipe extends React.Component<Props> {
  render() {
    const cannonPipeStyle = {
      fill: '#2b2b2b',
      stroke: '#000000',
      strokeWidth: '1px',
    }
    const transform = `rotate(${this.props.rotation}, 0, 0)`
  
    const muzzleWidth = 40
    const halfMuzzle = 20
    const height = 100
    const yBasis = 70
  
    const cubicBezierCurve = {
      initialAxis: {
        x: -halfMuzzle,
        y: -yBasis,
      },
      initialControlPoint: {
        x: -40,
        y: height * 1.7,
      },
      endingControlPoint: {
        x: 80,
        y: height * 1.7,
      },
      endingAxis: {
        x: muzzleWidth,
        y: 0,
      },
    }
    
    return (
      <g transform={transform}>
        <path style={cannonPipeStyle}
          d={pathFromBezierCurve(cubicBezierCurve)}
        />
        <line style={cannonPipeStyle}
          x1={-halfMuzzle}
          y1={-yBasis}
          x2={halfMuzzle}
          y2={-yBasis}
        />
      </g>
    )
  }
}

export default CannonPipe