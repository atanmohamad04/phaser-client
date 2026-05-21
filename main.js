import mainMenuScene from "./src/scenes/mainMenuScene.js";
import gameScene from "./src/scenes/gameScene.js";
import finalTestScene from './src/scenes/finalTestScene.js';

const SERVER_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://192.168.18.14:3000"
  : "https://phaser-server-production.up.railway.app/";

window.socket = io(SERVER_URL);

const config = {
  type: Phaser.AUTO,

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1480,
    height: 720
  },

  backgroundColor: "#000000",

  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },

  scene: [mainMenuScene, gameScene, finalTestScene]
};

new Phaser.Game(config);