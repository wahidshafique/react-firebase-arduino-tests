var Firebase = require("firebase");
var five = require("johnny-five");
const firebaseKey = require('./firebasekey.js');

// Create a new reference of Firebase db from module (you have to add the key yourself by visiting the firebase console)
var config = firebaseKey.key;

Firebase.initializeApp(config);

var firebaseRef = Firebase.database().ref();

five.Board().on("ready", function () {

  var rgb = new five.Led.RGB([9, 10, 11]);
  var index = 0;
  var rainbow = ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "8F00FF"];

  this.loop(1000, function () {
    rgb.color(rainbow[index++]);
    if (index === rainbow.length) {
      index = 0;
    } else {
      firebaseRef.set({ "colornow": rainbow[index] });
    }
  });
});