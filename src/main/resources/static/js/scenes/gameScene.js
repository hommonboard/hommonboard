export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        var map = this.make.tilemap({ key: 'map' });
        var groundTiles = map.addTilesetImage('ground', 'groundTiles');
        var treeTiles = map.addTilesetImage('trees', 'treeTiles');
        var borderTiles = map.addTilesetImage('gameBoardBorder', 'borderTiles');
        var fogTiles = map.addTilesetImage('spaceTile', 'fogTiles');
        var groundLayer = map.createStaticLayer("GroundLayer", groundTiles, 0, 0);
        var treeLayer = map.createStaticLayer("TreeLayer", treeTiles, 0, 0);
        treeLayer.setCollisionByProperty({ collides: true });
        var borderLayer = map.createStaticLayer("BorderLayer", borderTiles, 0, 0);
        this.fogLayer = map.createDynamicLayer("FogLayer", fogTiles, 0, 0);
        borderLayer.setCollisionByProperty({ collides: true });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.hero = this.physics.add.sprite(96, 96, "luna");
        this.physics.add.collider(this.hero, borderLayer);
        this.physics.add.collider(this.hero, treeLayer);

        let camera = this.cameras.main;
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.startFollow(this.hero);
        this.showMap();
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

        this.showMap();
    }

    showMap() {
        let radius = 2;
        let indX = this.fogLayer.worldToTileX(this.hero.x);
        let indY = this.fogLayer.worldToTileY(this.hero.y);

        let startIndX = Math.max(0, indX - radius);
        let endIndX = Math.min(this.fogLayer.layer.width - 1, indX + radius);
        let startIndY = Math.max(0, indY - radius);
        let endIndY = Math.min(this.fogLayer.layer.height - 1, indY + radius);

        for(let y = startIndY; y <= endIndY; y++) {
            for(let x = startIndX; x <= endIndX; x++) {
                this.fogLayer.layer.data[y][x].visible = false;
            }
        }
    }
}