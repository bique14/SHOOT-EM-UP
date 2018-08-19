// @flow
import React from 'react'
import FlyingObjectBase from './FlyingObjectBase'
import FlyingObjectTop from './FlyingObjectTop'

type Shape = {
  x: number,
  y: number,
}

type Props = {
  position: Shape,
}

class FlyingObject extends React.Component<Props> {
  render() {
    return (
      <g>
        <FlyingObjectBase position={this.props.position}/>
        <FlyingObjectTop position={this.props.position}/>
      </g>
    )
  }
}

export default FlyingObject