import PreloadScene from "./scenes/load/PreloadScene.js";
import LoadMenuScene from "./scenes/load/LoadMenuScene.js";
import MenuScene from "./scenes/MenuScene.js";
import LoadGameScene from "./scenes/load/LoadGameScene.js";
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
      scene: [PreloadScene, LoadMenuScene, MenuScene, LoadGameScene, GameScene]
  };

  var game = new Phaser.Game(config);

  var resizeGameWindow = createResizeGameWindowFunction(game);
  resizeGameWindow();
  window.addEventListener("resize", resizeGameWindow, false);
};



