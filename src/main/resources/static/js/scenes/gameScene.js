export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        var map = this.make.tilemap({ key: 'map' });

        var tiles = map.addTilesetImage('ground', 'groundTiles');

        var layer = map.createStaticLayer(0, tiles, 0, 0);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        var cursors = this.input.keyboard.createCursorKeys();

        var controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        };

        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

        this.hero = this.add.sprite(32, 32, "luna");

    }

    update(time, delta) {
        this.controls.update(delta);
    }
}