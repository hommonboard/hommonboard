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

        let mapUIPanel = this.add.image(0, 0, "mapUIPanel");
        mapUIPanel.setOrigin(0, 0);

        var hero = this.game.gameSession.activePlayer.activeHero;
        hero.createOnMapUI(this);
    }

    update() {
    }
}