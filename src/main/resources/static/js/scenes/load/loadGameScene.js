import BaseLoadScene from "./baseLoadScene.js";

export default class LoadGameScene extends BaseLoadScene {
    constructor() {
        super("LoadGameScene");
    }

    preload() {
        this.createLoadingBar();
        this.load.image('groundTiles', '../assets/tilemaps/tiles/ground.png');
        this.load.image('treeTiles', '../assets/tilemaps/tiles/trees.png');
        this.load.image('borderTiles', '../assets/tilemaps/tiles/gameBoardBorder.png');
        this.load.image('fogTiles', '../assets/tilemaps/tiles/spaceTile.png');
        this.load.tilemapTiledJSON('map', '../assets/tilemaps/maps/map.json');
        this.load.image('luna', '../assets/images/heroes/luna.png');
    }

    create() {
        this.scene.start("GameScene");
    }
}