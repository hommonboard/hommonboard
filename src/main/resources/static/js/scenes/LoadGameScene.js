export default class LoadGameScene extends Phaser.Scene {
    constructor() {
        super("LoadGameScene");
    }

    preload() {
        this.load.image('groundTiles', '../assets/tilemaps/tiles/ground.png');
        this.load.tilemapTiledJSON('map', '../assets/tilemaps/maps/map.json');
    }

    create() {
        this.scene.start("GameScene");
    }
}