import React, { Component } from 'react';
import './App.css';
import Weather from './Weather'


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to Weather Living</h1>
        <Weather />
      </div>
    );
  }
}

export default App;