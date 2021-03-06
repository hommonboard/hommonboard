import BaseLoadScene from "./baseLoadScene.js";
import NewGameButton from "../../game/menu/newGameButton.js";
import MainMenu from "../../game/menu/mainMenu.js";

export default class LoadMenuScene extends BaseLoadScene {
    constructor() {
        super("LoadMenuScene");
    }

    preload() {
        this.createLoadingBar();

        this.game.mainMenu = new MainMenu(this.game.config.width / 2,
                                          this.game.config.height - this.game.config.height / 3);

//        this.game.menu.newGameButton = new NewGameButton(
//           this.game.config.width / 2,
//           this.game.config.height - this.game.config.height / 3,
//           "New game"
//        );

        this.load.image("introBackground", "/assets/images/intro/clear-sky.png" );
        this.load.image("hommonboard", "/assets/images/intro/hommonboard.png" );
        this.game.mainMenu.preload(this);
        this.load.image("githublogo", "/assets/images/intro/githublogo.png" );
        this.load.bitmapFont("font", "/assets/fonts/font_empty.png", "/assets/fonts/font_empty.fnt");
    }

    create() {
        this.scene.start("MenuScene");
    }
}