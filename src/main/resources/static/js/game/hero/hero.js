import GameObject from "../gameObject.js";

export default class Hero extends GameObject {
    constructor(name, displayName) {
        super(name, displayName);
        this.units = new Map();

        this.active = false;

        this.mapFace = null;
        this.mapBorder = null;
        this.mapObject = null;

        this.sourceMapFaceKey = "heroMapFace" + this.name + "Key";
        this.sourceMapFace = null;
        this.sourceMapBorderKey = "heroMapBorderKey";
        this.sourceMapBorder = "../assets/images/heroes/hero_map_border.png";

        this.mapUIFace = null;
        this.mapUIBorder = null;
        this.mapUIObject = null;

        this.sourceMapUIFaceKey = "heroMapUIFace" + this.name + "Key";
        this.sourceMapUIFace = null;
        this.sourceMapUIBorderKey = "heroMapUIBorderKey";
        this.sourceMapUIBorder = "../assets/images/heroes/hero_map_border.png";
    }

    preload(ctx) {
        ctx.load.image(this.sourceMapBorderKey, this.sourceMapBorder);
        ctx.load.image(this.sourceMapFaceKey, this.sourceMapFace);
        ctx.load.image(this.sourceMapUIBorderKey, this.sourceMapUIBorder);
        ctx.load.image(this.sourceMapUIFaceKey, this.sourceMapUIFace);
    }

    createOnMap(ctx) {
        this.mapFace = ctx.physics.add.sprite(0, 0, this.sourceMapFaceKey);
        this.mapFace.setOrigin(0, 0);
        this.mapBorder = ctx.physics.add.sprite(0, 0, this.sourceMapBorderKey);
        this.mapBorder.setOrigin(0, 0);

        this.mapObject = ctx.add.container(
            384, 384,
            [this.mapFace, this.mapBorder]
        );
    }

    createOnMapUI(ctx) {
        this.mapUIFace = ctx.physics.add.sprite(0, 0, this.sourceMapUIFaceKey);
        this.mapUIFace.setOrigin(0, 0);
        this.mapUIBorder = ctx.physics.add.sprite(0, 0, this.sourceMapUIBorderKey);
        this.mapUIBorder.setOrigin(0, 0);

        this.mapUIObject = ctx.add.container(
            5, 5,
            [this.mapUIFace, this.mapUIBorder]
        );

        this.mapUIFace.setInteractive();

        this.mapUIFace.on('pointerup', function () {
            if (!this.active) {
                this.setActive();
            } else {
                this.setInactive();
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