import React from 'react'

class Rank extends React.Component {
  render() {
    const { x, y } = this.props.position
    const rectId = 'rect' + this.props.player.rank
    const clipId = 'clip' + this.props.player.rank
    const pictureStyle = {
      height: 60,
      width: 60,
    }
    const textStyle = {
      fontFamily: '"Joti One", cursive',
      fontSize: 35,
      fill: '#e3e3e3',
      cursor: 'default',
    }

    if (this.props.player.currentPlayer) {
      textStyle.fill = '#e9ea64'
    }

    const pictureProperties = {
      style: pictureStyle,
      x: x - 140,
      y: y - 40,
      href: this.props.player.picture,
      clipPath: `url(#${clipId})`,
    }
    const frameProperties = {
      width: 55,
      height: 55,
      rx: 30,
      x: pictureProperties.x,
      y: pictureProperties.y,
    }

    return (
      <g>
        <defs>
          <rect id={rectId} 
            {...frameProperties} 
          />
          <clipPath id={clipId}>
            <use xlinkHref={'#' + rectId} />
          </clipPath>
        </defs>
        <use xlinkHref={'#' + rectId} 
          strokeWidth="2" 
          stroke="black"
        />
        <text filter="url(#shadow)" 
          style={textStyle} 
          x={x - 200} 
          y={y}
        >
          {this.props.player.rank}º
        </text>
        <image {...pictureProperties} />
        <text filter="url(#shadow)" 
          style={textStyle} 
          x={x - 60} 
          y={y}
        >
          {this.props.player.name}
        </text>
        <text filter="url(#shadow)" 
          style={textStyle} 
          x={x + 350} 
          y={y}
        >
          {this.props.player.maxScore}
        </text>
      </g>
    )
  }
}

export default Rank