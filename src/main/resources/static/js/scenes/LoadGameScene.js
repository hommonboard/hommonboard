export default class LoadGameScene extends Phaser.Scene {
    constructor() {
        super("LoadGameScene");
    }

    preload() {
        this.load.image('mapTiles', '../assets/tilemaps/tiles/ground.png');
        this.load.tilemapTiledJSON('map', '../assets/tilemaps/maps/ground.json');
    }

    create() {
        this.scene.start("GameScene");
    }
}