import GameObject from "../gameObject.js";
import {INFO} from "../info.js";
import {getX, getY} from "../tools.js";

export default class Hero extends GameObject {
    constructor(gameSession, name, displayName) {
        super(gameSession, name, displayName);
        this.units = new Map();

        this.active = false;

        this.mapFace = null;
        this.mapBorder = null;
        this.mapObject = null;

        this.mapFaceKey = "heroMapFace" + this.name + "Key";
        this.mapFaceSource = null;
        this.mapBorderKey = "heroMapBorderKey";
        this.mapBorderSource = "../assets/images/heroes/hero_map_border.png";

        this.mapUIFace = null;
        this.mapUIBorder = null;
        this.mapUIObject = null;

        this.mapUIFaceKey = "heroMapUIFace" + this.name + "Key";
        this.mapUIFaceSource = null;
        this.mapUIBorderKey = "heroMapUIBorderKey";
        this.mapUIBorderSource = "../assets/images/heroes/hero_map_ui_border.png";
    }

    preload(ctx) {
        ctx.load.image(this.mapBorderKey, this.mapBorderSource);
        ctx.load.image(this.mapUIBorderKey, this.mapUIBorderSource);

        ctx.load.image(this.mapFaceKey, this.mapFaceSource);
        ctx.load.image(this.mapUIFaceKey, this.mapUIFaceSource);
    }

    createOnMap(ctx) {
        this.mapFace = ctx.physics.add.sprite(0, 0, this.mapFaceKey);
        this.mapFace.setOrigin(0, 0);
        this.mapBorder = ctx.physics.add.sprite(0, 0, this.mapBorderKey);
        this.mapBorder.setOrigin(0, 0);

        this.mapObject = ctx.add.container(
            getX(this.indX), getY(this.indY),
            [this.mapFace, this.mapBorder]
        );

        ctx.physics.add.collider(this.mapObject, this.gameSession.map.borderLayer);
        ctx.physics.add.collider(this.mapObject, this.gameSession.map.natureLayer);
    }

    createOnMapUI(ctx, x=5, y=5) {
        this.mapUIFace = ctx.physics.add.sprite(0, 0, this.mapUIFaceKey);
        this.mapUIFace.setOrigin(0, 0);
        this.mapUIBorder = ctx.physics.add.sprite(0, 0, this.mapUIBorderKey);
        this.mapUIBorder.setOrigin(0, 0);

        this.mapUIObject = ctx.add.container(
            x, y,
            [this.mapUIFace, this.mapUIBorder]
        );

        this.mapUIFace.setInteractive();

        this.mapUIFace.on('pointerup', function () {
            if (!this.active) {
                this.gameSession.activePlayer.heroes.forEach(hero => {
                    hero.setInactive();
                });

                this.setActive();
            }

        }, this);
    }

    setActive() {
        this.active = true;
        if (this.mapBorder) {
            this.mapBorder.setTint(0x80e5ff);
        }
        if (this.mapUIBorder) {
            this.mapUIBorder.setTint(0x80e5ff);
        }

        this.gameSession.mapScene.hero = this.mapObject;
        this.gameSession.mapScene.cameras.main.startFollow(this.mapObject);
        this.gameSession.mapScene.cameras.main.roundPixels = true;
    }

    setInactive() {
        this.active = false;
        if (this.mapBorder) {
            this.mapBorder.clearTint();
        }
        if (this.mapUIBorder) {
            this.mapUIBorder.clearTint();
        }
    }
}