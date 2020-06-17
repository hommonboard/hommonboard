import BaseLoadScene from "./BaseLoadScene.js";

export default class LoadMenuScene extends BaseLoadScene {
    constructor() {
        super("LoadMenuScene");
    }

    preload() {
        this.createLoadingBar();
        this.load.image("introBackground", "/assets/images/intro/clear-sky.png" );
        this.load.image("hommonboard", "/assets/images/intro/hommonboard.png" );
        this.load.image("githublogo", "/assets/images/intro/githublogo.png" );
        this.load.bitmapFont("font", "/assets/fonts/font_empty.png", "/assets/fonts/font_empty.fnt");
    }

    create() {
        this.scene.start("MenuScene");
    }
}