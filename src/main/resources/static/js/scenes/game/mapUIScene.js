export default class MapUIScene extends Phaser.Scene {
    constructor() {
        super({key: "MapUIScene", active: false});
    }

    create() {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        this.cameras.main.setViewport(
            windowWidth / 2 - 410,
            windowHeight - 140,
            820,
            260
        );

        let hommonboard = this.add.image(0, 0, "mapUIPanel");
        hommonboard.setOrigin(0, 0);
        this.text = this.add.text(0, 0, 'MAP_UI_SCENE', { fill: '#00ff00' });
    }

    update() {
    }
}