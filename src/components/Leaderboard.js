import React from 'react'

import Login from './Login'
import Rank from './Rank'

class Leaderboard extends React.Component {
  render() {
    const style = {
      fill: 'transparent',
      stroke: 'black',
      strokeDasharray: '15',
    }
    const leaderboardTitle = {
      fontFamily: '"Joti One", cursive',
      fontSize: 50,
      fill: '#88da85',
      cursor: 'default',
    }
    let leaderboard = this.props.leaderboard || []
    leaderboard = leaderboard.sort((prev, next) => { // sort leaderboard  the highest score to the lowest score.
      if (prev.maxScore === next.maxScore) {
        return prev.name <= next.name ? 1 : -1
      }
      return prev.maxScore < next.maxScore ? 1 : -1
    }).map((member, index) => ({ // after sort, highlight the row where the current player appears.
      ...member,
      rank: index + 1,
      currentPlayer: member.id === this.props.currentPlayer.id,
    })).filter((member, index) => { // after map, remove everyone who is not among the top three players. (the current player stay on the final array)
      if (index < 3 || member.id === this.props.currentPlayer.id) {
        return member
      }
      return null
    })

    return (
      <g>
        <text filter="url(#shadow)" 
          style={leaderboardTitle} 
          x="-150" 
          y="-630"
        >
          Leaderboard
        </text>
        <rect style={style} 
          x="-350" 
          y="-600" 
          width="700" 
          height="330" 
        />
        {
          this.props.currentPlayer && leaderboard.map((player, idx) => {
            const position = {
              x: -100,
              y: -530 + (70 * idx)
            }
            return <Rank key={player.id} 
                      player={player} 
                      position={position}
                    />
          })
        }
        {
          !this.props.currentPlayer && 
          <Login authenticate={this.props.authenticate} />
        }
      </g>
    )
  }
}

export default Leaderboard