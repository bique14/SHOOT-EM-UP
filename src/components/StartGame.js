// @flow
import React from 'react'
import { gameWidth } from '../utils/constants'

type Props = {
  onClick: Function,
}

class StartGame extends React.Component<Props> {
  render() {
    const button = {
      x: gameWidth / -2, // half width
      y: -280, // minus means up (above 0)
      width: gameWidth,
      height: 200,
      rx: 10, // border radius
      ry: 10, // border radius
      style: {
        fill: 'transparent',
        cursor: 'pointer',
      },
      onClick: this.props.onClick,
    }
  
    const text = {
      textAnchor: 'middle', // center
      x: 0, // center relative to X axis
      y: -150, // 150 up
      style: {
        fontFamily: '"Joti One", cursive',
        fontSize: 60,
        fill: '#e3e3e3',
        cursor: 'pointer',
      },
      onClick: this.props.onClick,
    }

    return (
      <g filter="url(#shadow)">
        <rect {...button} />
        <text {...text}>
          Tap To Start!
        </text>
      </g>
    )
  }
}

export default StartGame