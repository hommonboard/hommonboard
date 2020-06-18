export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        var map = this.make.tilemap({ key: 'map' });
        var groundTiles = map.addTilesetImage('ground', 'groundTiles');
        var borderTiles = map.addTilesetImage('gameBoardBorder', 'borderTiles');
        var groundLayer = map.createStaticLayer("GroundLayer", groundTiles, 0, 0);
        var borderLayer = map.createStaticLayer("BorderLayer", borderTiles, 0, 0);
        borderLayer.setCollisionByProperty({ collides: true });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.hero = this.physics.add.sprite(96, 96, "luna");
        this.physics.add.collider(this.hero, borderLayer);

        let camera = this.cameras.main;
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.startFollow(this.hero);
    }

    update(time, delta) {
        // Stop any previous movement from the last frame
        this.hero.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.hero.body.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.hero.body.setVelocityX(200);
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.hero.body.setVelocityY(-200);
        } else if (this.cursors.down.isDown) {
            this.hero.body.setVelocityY(200);
        }
    }
}