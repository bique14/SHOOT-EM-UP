// @flow
import React from 'react'

type Props = {
  authenticate: Function,
}

class Login extends React.Component<Props> {
  render() {
    const button = {
      x: -300, // half width
      y: -600, // minus means up (above 0)
      width: 600,
      height: 300,
      style: {
        fill: 'transparent',
        cursor: 'pointer',
      },
      onClick: this.props.authenticate,
    }
  
    const text = {
      textAnchor: 'middle', // center
      x: 0, // center relative to X axis
      y: -440, // 440 up
      style: {
        fontFamily: '"Joti One", cursive',
        fontSize: 45,
        fill: '#e3e3e3',
        cursor: 'pointer',
      },
      onClick: this.props.authenticate,
    }

    return (
      <g filter="url(#shadow)">
        <rect {...button} />
        <text {...text}>
          Login to participate!
        </text>
      </g>
    )
  }
}

export default Login