import Debug from "../../debug/debug.js";
import DebugScene from "../debugScene.js";
import MapUIScene from "./mapUIScene.js";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
        this.target = new Phaser.Math.Vector2();
    }

    create() {
        this.game.gameSession.create(this);

        this.map = this.game.gameSession.map.map;
        this.hero = this.game.gameSession.activePlayer.activeHero.mapObject;

        this.physics.add.collider(this.hero, this.game.gameSession.map.borderLayer);
        this.physics.add.collider(this.hero, this.game.gameSession.map.natureLayer);

        this.fogLayer = this.game.gameSession.map.fogLayer;

        let camera = this.cameras.main;
        camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        camera.startFollow(this.hero);
        this.showMap();

        this.createMarker();
        this.createPathFinder();
        this.createDebug();
        this.createMapUI();

        this.input.on('pointerup', this.handleClick, this);

        this.input.on('pointermove', function (pointer) {
            this.debug.setValue("pointerPosition",  "(" + pointer.worldX + "," + pointer.worldY + ")");
            this.updateMarker(pointer);
        }, this);
    }

    createMarker() {
        this.marker = this.add.graphics();
        this.marker.lineStyle(3, 0xffffff, 1);
        this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);
    }

    createPathFinder() {
        this.finder = new EasyStar.js();
        var grid = [];
            for(var y = 0; y < this.map.height; y++){
                var col = [];
                for(var x = 0; x < this.map.width; x++){
                    col.push(this.getTileID(x,y));
                }
                grid.push(col);
            }
        this.finder.setGrid(grid);

        var acceptableTiles = [0];
        for (let index in this.map.tilesets) {
            let tileset = this.map.tilesets[index];
            let properties = tileset.tileProperties;

            for(var i = 0; i < tileset.total; i++){
                if(!properties.hasOwnProperty(i)) {
                    acceptableTiles.push(tileset.firstgid + i);
                    continue;
                }
                if(!properties[i].collides) acceptableTiles.push(tileset.firstgid + i);
                if(properties[i].cost) this.finder.setTileCost(tileset.firstgid + i, properties[i].cost);
            }
        }

        this.finder.setAcceptableTiles(acceptableTiles);
    }

    createMapUI() {
        let mapUIScene = new MapUIScene();
        this.scene.add("MapUIScene", mapUIScene, true);
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

        this.showMap();
    }

    updateMarker(pointer) {
        // Rounds down to nearest tile
        var pointerTileX = this.map.worldToTileX(pointer.worldX);
        var pointerTileY = this.map.worldToTileY(pointer.worldY);
        this.marker.x = this.map.tileToWorldX(pointerTileX);
        this.marker.y = this.map.tileToWorldY(pointerTileY);
        this.marker.setVisible(!this.checkCollision(pointerTileX, pointerTileY));
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
        let isCollision = false;
        let tile = this.map.getTileAt(x, y, false, 1);
        isCollision = tile != null ? tile.collides == true : false;

        if (!isCollision) {
            tile = this.map.getTileAt(x, y, false, 4);
            isCollision = tile != null ? tile.collides == true : false;
        }

        return isCollision;
    };

    getTileID(x,y) {
        var tile = this.map.getTileAt(x, y, false, 1); // nature layer (index = 1)
        if (tile == null) {
            tile = this.map.getTileAt(x, y, false, 4); // border layer (index = 4)
        }
        return tile != null ? tile.index : 0;
    }

    handleClick(pointer) {
        this.debug.setValue("pointerDownPosition", "(" + pointer.worldX + "," + pointer.worldY + ")");
        var x = pointer.worldX;
        var y = pointer.worldY;
        var toX = Math.floor(x/64);
        var toY = Math.floor(y/64);

        let isCollision = this.checkCollision(toX, toY);
        if (isCollision) return;

        var fromX = Math.floor(this.hero.x/64);
        var fromY = Math.floor(this.hero.y/64);

        this.finder.findPath(fromX, fromY, toX, toY, (path) => {
            if (path != null) {
                this.moveCharacter(path);
            }
        });
        this.finder.calculate();
    };

    moveCharacter(path) {
        var tweens = [];
        for(var i = 0; i < path.length-1; i++){
            var ex = path[i+1].x;
            var ey = path[i+1].y;
            tweens.push({
                targets: this.hero,
                x: {value: ex*this.map.tileWidth, duration: 200},
                y: {value: ey*this.map.tileHeight, duration: 200}
            });
        }

        this.tweens.timeline({
            tweens: tweens
        });
    };
}