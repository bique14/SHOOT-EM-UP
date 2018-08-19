import React, { Component } from 'react';
import './App.css';
import Canvas from './components/Canvas'

class App extends Component<Props> {
  render() {
    return (
      <div className="App">
        <Canvas />
      </div>
    );
  }
}

export default App