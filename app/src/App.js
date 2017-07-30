import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      colors: '#a00000',
      dbRefApp: firebase.database().ref().child('app'),
      dbRefArduino: firebase.database().ref().child('arduino'),
      isArduinoOn: false,
      isArduinoInit: true
    }
  }

  componentDidMount() {
    this.state.dbRefArduino.on('value', snap => {
      if (snap.val() !== null) {
        this.setState({
          isArduinoInit: true,
          isArduinoOn: snap.val().isArduinoOn
        })
      } else {
        this.setState({ isArduinoInit: false })
      }
    });
  }

  handleChangeComplete = (color) => {
    this.setState({ colors: color.hex });
    this.state.dbRefApp.set({
      color: this.state.colors
    })
  };

  render() {
    const colorBoxStyle = {
      backgroundColor: this.state.colors
    };

    return (
      <div className="App">
        <div className="App-header" style={colorBoxStyle}>
          <img src={logo} className="App-logo" alt="logo" />
          <h3>{this.state.colors}</h3>
          <h3>The Arduino {this.state.isArduinoOn ? 'is on' : 'is off'} {!this.state.isArduinoInit ? "and it's firebase data has not been initialized (try running it for the first time)" : ''}</h3>
        </div>
        <div className="box">
          <SketchPicker color={this.state.colors} onChangeComplete={this.handleChangeComplete} />
        </div>

      </div>
    );
  }
}

export default App;
