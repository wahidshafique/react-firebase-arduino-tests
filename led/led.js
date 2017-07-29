const Firebase = require("firebase");
const five = require("johnny-five");
const firebaseKey = require('./firebasekey.js');

// Create a new reference of Firebase db from module (you have to add the key yourself by visiting the firebase console)
const config = firebaseKey.key;
Firebase.initializeApp(config);
const firebaseRef = Firebase.database().ref();

const LEDPINS = [9, 10, 11];


five.Board().on("ready", function () {
  var rgb = new five.Led.RGB(LEDPINS);
  this.loop(1000, function () {

    let fbColor = '#555555';

    firebaseRef.on('value', snap => {
      if (snap.val) {
        fbColor = snap.val().color
      }
    });
    console.log(fbColor);
    //not sure how extensive the range of the arduino LED is...
    rgb.color(fbColor);
  })
});