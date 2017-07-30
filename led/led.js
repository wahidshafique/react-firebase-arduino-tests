const Firebase = require("firebase");
const five = require("johnny-five");
const firebaseKey = require('./firebasekey.js');

// Create a new reference of Firebase db from module (you have to add the key yourself by visiting the firebase console)
const config = firebaseKey.key;
Firebase.initializeApp(config);
const firebaseRefArduino = Firebase.database().ref().child('arduino');
const firebaseRefApp = Firebase.database().ref().child('app');

const LEDPINS = [9, 10, 11];
firebaseRefArduino.set({ isArduinoOn: false })


five.Board().on("ready", function () {

  firebaseRefArduino.update({ isArduinoOn: true })
  var rgb = new five.Led.RGB(LEDPINS);

  this.loop(1000, function () {

    let fbColor = '#555555';

    firebaseRefApp.on('value', snap => {
      if (snap.val()) {
        fbColor = snap.val().color
      } else {
        console.log("the app firebase reference has not been initialized...");
      }
    });
    console.log(fbColor);
    //not sure how extensive the range of the arduino LED is...
    rgb.color(fbColor);
  })
});

five.Board().on("close", function () {
  firebaseRefArduino.set({ isArduinoOn: false });
})