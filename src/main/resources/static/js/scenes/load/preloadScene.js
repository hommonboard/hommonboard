export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

    preload() {
        //todo
    }

    create() {
        this.scene.start("LoadMenuScene");
    }
}