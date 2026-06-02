import mainMenuScene from "./src/scenes/mainMenuScene.js";
import gameScene from "./src/scenes/gameScene.js";
import finalTestScene from './src/scenes/finalTestScene.js';
import LoadingScene from "./src/scenes/loadingScene.js";

const hostname = window.location.hostname;

const isLocal = hostname === "localhost" 
  || hostname === "127.0.0.1"
  || hostname.startsWith("192.168.")
  || hostname.startsWith("10.")
  || hostname.startsWith("172.");

const SERVER_URL = isLocal
  ? `http://${hostname}:3000`
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

  scene: [mainMenuScene, gameScene, finalTestScene, LoadingScene]
};

const game = new Phaser.Game(config);

game.events.on('ready', () => {
    game.scene.start('LoadingScene');
});