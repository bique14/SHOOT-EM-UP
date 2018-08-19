// @flow
import React from 'react'

type Shape = {
  x: number,
  y: number,
}

type Props = {
  position: Shape,
}

class FlyingObjectBase extends React.Component<Props> {
  render() {
    const style = {
      fill: '#979797',
      stroke: '#5c5c5c',
    }
    return (
      <ellipse style={style}
        cx={this.props.position.x}
        cy={this.props.position.y}
        rx="40"
        ry="10"
      />
    )
  } 
}

export default FlyingObjectBase