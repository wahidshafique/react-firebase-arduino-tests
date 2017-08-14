const Firebase = require("firebase");
const five = require("johnny-five");
const firebaseKey = require('./firebasekey.js');

// Create a new reference of Firebase db from module (you have to add the key yourself by visiting the firebase console)
const config = firebaseKey.key;
Firebase.initializeApp(config);
const firebaseRefArduino = Firebase.database().ref("arduino");
const firebaseRefApp = Firebase.database().ref("app");

const LEDPINS = [9, 10, 11];
const REFRESH_RATE = 100;
firebaseRefArduino.set({ isArduinoOn: false })
firebaseRefArduino.set({ isPlayingSong: false });



five.Board({ repl: false }).on("ready", function () {

  firebaseRefArduino.update({ isArduinoOn: true })
  var rgb = new five.Led.RGB(LEDPINS);
  var piezo = new five.Piezo(3);

  this.on("exit", function () {
    console.log("exiting...")
    firebaseRefArduino.update({ isArduinoOn: false });
  });


  this.loop(REFRESH_RATE, function () {

    let fbColor = '#000000';

    firebaseRefApp.on('value', snap => {
      if (snap.val()) {
        fbColor = snap.val().color
      } else {
        console.log("the app firebase reference has not been initialized...");
      }
    });

    firebaseRefArduino.on('value', snap => {
      if (snap.val().isPlayingSong && !piezo.isPlaying) {
        piezoSong(piezo);
      }
    })
    //not sure how extensive the range of the arduino LED is...
    rgb.color(fbColor);
  });
});

// Start reading from stdin so we don't exit.
process.on('SIGINT', function () {
  console.log('Got SIGINT.  Press Control-D to exit.');
  firebaseRefArduino.update({ isArduinoOn: false });
  process.exit();
});

const songs = [
  {
    song: [
      ["E5", 1],
      ["C5", 1],
      ["D5", 1],
      ["G4", 2],
      [null, 1],
      ["G4", 1],
      ["D5", 1],
      ["E5", 1],
      ["C5", 2],
      [null, 1]
    ],
    tempo: 150
  },

  {
    song: [
      ["G4", 1],
      [null, 1 / 8],
      ["C5", 7 / 8],
      [null, 1 / 8],
      ["C5", 1 / 8],
      [null, 1 / 8],
      ["C5", 10 / 8],
      [null, 6 / 8],
      ["G4", 1],
      [null, 1 / 8],
      ["D5", 7 / 8],
      [null, 1 / 8],
      ["B4", 1 / 8],
      [null, 1 / 8],
      ["C5", 10 / 8],
      [null, 6 / 8],
      ["G4", 1],
      [null, 1 / 8],
      ["C5", 7 / 8],
      [null, 1 / 8],
      ["F5", 1 / 8],
      [null, 1 / 8],
      ["F5", 1],
      [null, 1 / 8],
      ["E5", 7 / 8],
      [null, 1 / 8],
      ["D5", 1 / 8],
      [null, 1 / 8],
      ["C5", 1],
      [null, 1 / 8],
      ["B4", 7 / 8],
      [null, 1 / 8],
      ["C5", 1 / 8],
      [null, 1 / 8],
      ["D5", 10 / 8],
      [null, 6 / 8]
    ],
    tempo: 90
  }
]

function piezoSong(piezo) {
  const randSong = songs[Math.floor(Math.random() * songs.length)];
  console.log(randSong)
  piezo.play({
    // song is composed by an array of pairs of notes and beats
    // The first argument is the note (null means "no note")
    // The second argument is the length of time (beat) of the note (or non-note)
    song:randSong.song,
    tempo: randSong.tempo 
  }, function () {
      //console.log('hello')
      firebaseRefArduino.update({ isPlayingSong: false });
    });
}








// process.on('SIGINT', function () {
//   console.log("Caught interrupt signal");
//   firebaseRefArduino.update({ isArduinoOn: false });
//   process.exit();
// });