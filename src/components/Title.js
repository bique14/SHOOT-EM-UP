import React from 'react'
import { pathFromBezierCurve } from '../utils/formulas'

class Title extends React.Component {
  render() {
    const textStyle = {
      fontFamily: '"Joti One", cursive',
      fontSize: 120,
      fill: '#cbca62',
    }
  
    const aliensLineCurve = {
      initialAxis: {
        x: -150,
        y: -950,
      },
      initialControlPoint: {
        x: 95,
        y: -50,
      },
      endingControlPoint: {
        x: 285,
        y: -0,
      },
      endingAxis: {
        x: 380,
        y: 0,
      },
    }
  
    const goHomeLineCurve = {
      ...aliensLineCurve,
      initialAxis: {
        x: -180,
        y: -780,
      },
      initialControlPoint: {
        x: 125,
        y: -100,
      },
      endingControlPoint: {
        x: 375,
        y: -0,
      },
      endingAxis: {
        x: 500,
        y: 0,
      },
    }

    return (
      <g filter="url(#shadow)">
        <defs>
          <path id="AliensPath"
            d={pathFromBezierCurve(aliensLineCurve)}
          />
          <path id="GoHomePath"
            d={pathFromBezierCurve(goHomeLineCurve)}
          />
        </defs>
        <text {...textStyle}>
          <textPath xlinkHref="#AliensPath">
            Shoot'
          </textPath>
        </text>
        <text {...textStyle}>
          <textPath xlinkHref="#GoHomePath">
            em up!
          </textPath>
        </text>
      </g>
    )
  }
}

export default Title