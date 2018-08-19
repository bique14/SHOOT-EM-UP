import React, { Component } from 'react';
import './App.css';
import Canvas from './components/Canvas'
import { getCanvasPosition } from './utils/formulas'
class App extends Component<Props> {
  componentDidMount() {
    setInterval(() => {
      this.props.moveObjects(this.canvasMousePosition)
    }, 10)
  }

  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event)
  }

  render() {
    return (
      <div className="App">
        <Canvas angle={this.props.angle}
          trackMouse={event => (this.trackMouse(event))}
        />
      </div>
    );
  }
}

export default App