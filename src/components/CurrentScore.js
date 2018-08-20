// @flow
import React from 'react'

type Props = {
  score: number,
}

class CurrentScore extends React.Component<Props> {
  render() {
    const scoreStyle = {
      fontFamily: '"Joti One", cursive',
      fontSize: 60,
      fill: '#d6d33e',
    }

    return (
      <g filter="url(#shadow)">
        <text style={scoreStyle} x="350" y="70">
          SCORE: {this.props.score}
        </text>
      </g>
    )
  }
}

export default CurrentScore