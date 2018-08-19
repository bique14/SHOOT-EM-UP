// @flow
import React from 'react'

type Shape = {
  x: number,
  y: number,
}

type Props = {
  position: Shape
}

class CannonBall extends React.Component<Props> {
  render() {
    const ballStyle = {
      fill: '#777',
      stroke: '#444',
      strokeWidth: '2px'
    }

    return (
      <ellipse style={ballStyle}
        cx={this.props.position.x}
        cy={this.props.position.y}
        rx="16"
        ry="16"
      />
    )
  }
}

export default CannonBall