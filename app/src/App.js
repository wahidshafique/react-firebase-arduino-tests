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
      colorRef: firebase.database().ref(),
    }
  }

  // componentDidMount() {
  //   this.state.colorRef.on('value', snap => {
  //     this.setState({
  //       colors: snap.val()
  //     })
  //   });
  // }

  handleChangeComplete = (color) => {
    this.setState({ colors: color.hex });
    this.state.colorRef.set({
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
        </div>
        <div className="box">
          <SketchPicker color = {this.state.colors} onChangeComplete={ this.handleChangeComplete }/>
        </div>

      </div>
    );
  }
}

export default App;
