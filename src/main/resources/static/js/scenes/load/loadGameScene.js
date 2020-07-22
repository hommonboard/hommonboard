import BaseLoadScene from "./baseLoadScene.js";

export default class LoadGameScene extends BaseLoadScene {
    constructor() {
        super("LoadGameScene");
    }

    preload() {
        this.createLoadingBar();
        this.load.image("mapUIPanel", "../assets/images/ui/map/mapUIPanel.png");
        this.game.gameSession.preload(this);
    }

    create() {
        this.scene.start("GameScene");
    }
}