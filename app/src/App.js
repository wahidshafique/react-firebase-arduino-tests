import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      colors: '000000'
    }
  }

  componentDidMount() {
    const rootRef = firebase.database().ref()
    const colorRef = rootRef.child('color');
    colorRef.on('value', snap => {
      this.setState({
        colors: snap.val()
      })
    });
  }

  render() {
    const colorBoxStyle = {
      backgroundColor: "#" + this.state.colors
    };

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Colors are</h2>
          <h3>{this.state.colors}</h3>
        </div>

        <div className="box" style={colorBoxStyle}></div>

      </div>
    );
  }
}

export default App;
