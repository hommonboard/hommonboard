import PreloadScene from "./scenes/load/preloadScene.js";
import LoadMenuScene from "./scenes/load/loadMenuScene.js";
import MenuScene from "./scenes/menu/menuScene.js";
import GameSettingsScene from "./scenes/menu/gameSettingsScene.js";
import LoadGameScene from "./scenes/load/loadGameScene.js";
import GameScene from "./scenes/game/gameScene.js";
import {createResizeGameWindowFunction} from "./utils.js";

window.onload = function() {
    var config = {
        type: Phaser.WEBGL,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: '#2d2d2d',
        parent: 'gameContainer',
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 0 } // Top down game, so no gravity
            }
        },
        pixelArt: true,
        scene: [
            PreloadScene,
            LoadMenuScene,
            MenuScene,
            GameSettingsScene,
            LoadGameScene,
            GameScene
        ]
    };

    var game = new Phaser.Game(config);

    var resizeGameWindow = createResizeGameWindowFunction(game);
    resizeGameWindow();
    window.addEventListener("resize", resizeGameWindow, false);
};



