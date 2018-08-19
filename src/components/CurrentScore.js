// @flow
import React from 'react'

type Props = {
  score: number,
}

class CurrentScore extends React.Component<Props> {
  render() {
    const scoreStyle = {
      fontFamily: '"Joti One", cursive',
      fontSize: 80,
      fill: '#d6d33e',
    }

    return (
      <g filter="url(#shadow)">
        <text style={scoreStyle} x="300" y="80">
          {this.props.score}
        </text>
      </g>
    )
  }
}

export default CurrentScore