// @flow
import React from 'react'
import { pathFromBezierCurve } from '../utils/formulas'

type Shape = {
  x: number,
  y: number,
}

type Props = {
  position: Shape,
}

class Heart extends React.Component<Props> {
  render() {
    const heartStyle = {
      fill: '#da0d15',
      stroke: '#a51708',
      strokeWidth: '2px',
    }
  
    const leftSide = {
      initialAxis: {
        x: this.props.position.x,
        y: this.props.position.y,
      },
      initialControlPoint: {
        x: -20,
        y: -20,
      },
      endingControlPoint: {
        x: -40,
        y: 10,
      },
      endingAxis: {
        x: 0,
        y: 40,
      },
    }
  
    const rightSide = {
      initialAxis: {
        x: this.props.position.x,
        y: this.props.position.y,
      },
      initialControlPoint: {
        x: 20,
        y: -20,
      },
      endingControlPoint: {
        x: 40,
        y: 10,
      },
      endingAxis: {
        x: 0,
        y: 40,
      },
    }

    return (
      <g filter="url(#shadow)">
        <path style={heartStyle}
          d={pathFromBezierCurve(leftSide)}
        />
        <path style={heartStyle}
          d={pathFromBezierCurve(rightSide)}
        />
      </g>
    )
  }
}

export default Heart