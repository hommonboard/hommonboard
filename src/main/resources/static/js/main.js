import IntroScene from "./scenes/IntroScene.js";
import LoadGameScene from "./scenes/LoadGameScene.js";
import GameScene from "./scenes/GameScene.js";
import {createResizeGameWindowFunction} from "./utils.js"

window.onload = function() {
  var config = {
      type: Phaser.WEBGL,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#2d2d2d',
      parent: 'gameContainer',
      pixelArt: true,
      scene: [IntroScene, LoadGameScene, GameScene]
  };

  var game = new Phaser.Game(config);

  var resizeGameWindow = createResizeGameWindowFunction(game);
  resizeGameWindow();
  window.addEventListener("resize", resizeGameWindow, false);
};



