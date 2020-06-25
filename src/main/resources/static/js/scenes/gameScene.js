import Debug from "../debug/debug.js";
import DebugScene from "./debugScene.js";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
        this.target = new Phaser.Math.Vector2();
    }

    create() {
        this.map = this.make.tilemap({ key: 'map' });
        var groundTiles = this.map.addTilesetImage('ground', 'groundTiles');
        var treeTiles = this.map.addTilesetImage('trees', 'treeTiles');
        var borderTiles = this.map.addTilesetImage('gameBoardBorder', 'borderTiles');
        var fogTiles = this.map.addTilesetImage('spaceTile', 'fogTiles');
        var groundLayer = this.map.createStaticLayer("GroundLayer", groundTiles, 0, 0);
        var treeLayer = this.map.createStaticLayer("TreeLayer", treeTiles, 0, 0);
        treeLayer.setCollisionByProperty({ collides: true });
        var borderLayer = this.map.createStaticLayer("BorderLayer", borderTiles, 0, 0);
        this.fogLayer = this.map.createDynamicLayer("FogLayer", fogTiles, 0, 0);
        borderLayer.setCollisionByProperty({ collides: true });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.hero = this.physics.add.sprite(96, 96, "luna");
        this.physics.add.collider(this.hero, borderLayer);
        this.physics.add.collider(this.hero, treeLayer);

        let camera = this.cameras.main;
        camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        camera.startFollow(this.hero);
        this.showMap();

        this.createMarker();
        this.createDebug();

        this.input.on('pointerdown', function (pointer) {
            this.target.x = pointer.worldX;
            this.target.y = pointer.worldY;

            this.debug.setValue("pointerDownPosition", "(" + pointer.worldX + "," + pointer.worldY + ")");

            // Move at 200 px/s:
            this.physics.moveToObject(this.hero, this.target, 200);
        }, this);

        this.input.on('pointermove', function (pointer) {
            this.debug.setValue("pointerPosition",  "(" + pointer.worldX + "," + pointer.worldY + ")");

            // Rounds down to nearest tile
            var pointerTileX = this.map.worldToTileX(pointer.worldX);
            var pointerTileY = this.map.worldToTileY(pointer.worldY);
            this.marker.x = this.map.tileToWorldX(pointerTileX);
            this.marker.y = this.map.tileToWorldY(pointerTileY);
            this.marker.setVisible(!this.checkCollision(pointerTileX, pointerTileY));
        }, this);
    }

    createMarker() {
        this.marker = this.add.graphics();
        this.marker.lineStyle(3, 0xffffff, 1);
        this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);
    }

    createDebug() {
        this.debug = new Debug();
        this.debug.addInfoElement("heroPosition", "Hero (x,y)=", "(0,0)");
        this.debug.addInfoElement("pointerDownPosition", "PointerDown (x,y)=", "(0,0)");
        this.debug.addInfoElement("pointerPosition", "Pointer (x,y)=", "(0,0)");
        this.debug.addInfoElement("distance", "Distance=", "0");

        let debugScene = new DebugScene(this.debug);
        this.scene.add("DebugScene", debugScene, true);
    }

    update(time, delta) {

        this.debug.setValue("heroPosition", "("+ this.hero.x + "," + this.hero.y + ")");

        let distance = Phaser.Math.Distance.Between(this.hero.x, this.hero.y, this.target.x, this.target.y);

        if (this.hero.body.speed > 0)
        {
            this.debug.setValue("distance", distance);
            if (distance < 10)
            {
                this.hero.body.reset(this.target.x, this.target.y);
            }
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

    checkCollision(x,y) {
        var tile = this.map.getTileAt(x, y, false, 2);
        return tile != null ? tile.collides == true : false;
    };
}