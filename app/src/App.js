import React, { Component } from 'react'
import { CirclePicker as ColorPicker, SketchPicker as HelperPicker } from 'react-color'
import * as firebase from 'firebase'
import { Col, Row } from 'react-materialize'
import logo from './logo.svg'
import './App.css'

class App extends Component {

  constructor() {
    super();
    this.state = {
      colorsArray: [],
      color: '#a00000',
      dbRefApp: firebase.database().ref('app'),
      dbRefArduino: firebase.database().ref('arduino'),
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

    this.state.dbRefApp.on('value', snap => {
      if (snap.val() !== null) {
        this.setState({ color: snap.val().color })
      }
    })
  }


  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
    this.state.dbRefApp.set({
      color: this.state.color
    })
  };

  removeColor = (e) => {
    e.preventDefault();
    this.state.dbRefApp.set({
      color: "#000000"
    })
  }

  render() {
    const colorBoxStyle = {
      backgroundColor: this.state.color
    };

    return (
      <div className="App">
        <div className="App-header" style={colorBoxStyle}>
          <img src={logo} onClick={this.removeColor} className="App-logo" alt="logo" />
          <h4>{this.state.color}</h4>
          <h5>The Arduino {this.state.isArduinoOn ? 'is on' : 'is off'} {!this.state.isArduinoInit ? "and it's firebase data has not been initialized (try running it for the first time)" : ''}</h5>
        </div>
        <Row className="container color-box">
          <Col>
            <ColorPicker circleSize='80' color={this.state.colors} onChangeComplete={this.handleChangeComplete} width={300}
              colors={
                ["#ff0000", "#00ff00", "#000fff", "#ffff00", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]
              }
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
