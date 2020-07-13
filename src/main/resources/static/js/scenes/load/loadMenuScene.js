import BaseLoadScene from "./baseLoadScene.js";

export default class LoadMenuScene extends BaseLoadScene {
    constructor() {
        super("LoadMenuScene");
    }

    preload() {
        this.createLoadingBar();
        this.load.image("introBackground", "/assets/images/intro/clear-sky.png" );
        this.load.image("hommonboard", "/assets/images/intro/hommonboard.png" );
        this.load.image("menuButtonBody", "/assets/images/ui/menu/menu_button_body.png" );
        this.load.image("menuButtonBorder", "/assets/images/ui/menu/menu_button_border.png" );
        this.load.image("githublogo", "/assets/images/intro/githublogo.png" );
        this.load.bitmapFont("font", "/assets/fonts/font_empty.png", "/assets/fonts/font_empty.fnt");
    }

    create() {
        this.scene.start("MenuScene");
    }
}