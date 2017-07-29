# Setup

![](https://raw.githubusercontent.com/wahidshafique/react-firebase-arduino-tests/master/example.png)

This is just a quick example of how to work with firebase, react, and the johnny-five library

### Objectives
  - Communicate to and from the arduino board
  - Hve a 3 way data-bind
  - Learn/expand skills
 
### Installation

Install the dependencies and devDependencies and start the proccess for your arduino once you've hooked up the board to your computer. For the LED example, you just need to attach an RGB led to any |pwm| digital pins

```sh
$ cd arduino-led-picker/led
$ npm install 
$ node led
```
During the install, you may get errors regarding specific packages, you may have to install them independently 
The above will then connect to firebase and update values of whatever data you define


Open a new terminal for the second part (running the server)

```sh
$ cd arduino-led-picker/app
$ npm install 
$ yarn start
```
This will start a server at ```localhost:3000``` and if all is working you'll be recieving the data that you defined in ```led.js```

License
----

MIT
