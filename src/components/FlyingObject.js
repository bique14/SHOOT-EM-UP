
import React from 'react'
import styled, { keyframes } from 'styled-components';

import FlyingObjectBase from './FlyingObjectBase'
import FlyingObjectTop from './FlyingObjectTop'
import { gameHeight } from '../utils/constants';

type Shape = {
  x: number,
  y: number,
}

type Props = {
  position: Shape,
}

const moveVertically = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(${gameHeight}px);
  }
`

const Move = styled.g`
  animation: ${moveVertically} 4s linear;
`
class FlyingObject extends React.Component<Props> {
  render() {
    return (
      <Move>
        <FlyingObjectBase position={this.props.position}/>
        <FlyingObjectTop position={this.props.position}/>
      </Move>
    )
  }
}

export default FlyingObject