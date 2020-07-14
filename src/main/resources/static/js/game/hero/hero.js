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
    }

    preload(ctx) {
        ctx.load.image(this.sourceMapBorderKey, this.sourceMapBorder);
        ctx.load.image(this.sourceMapFaceKey, this.sourceMapFace);
    }

    create(ctx) {
        this.mapFace = ctx.physics.add.sprite(0, 0, this.sourceMapFaceKey);
        this.mapFace.setOrigin(0, 0);
        this.mapBorder = ctx.physics.add.sprite(0, 0, this.sourceMapBorderKey);
        this.mapBorder.setOrigin(0, 0);

        this.mapObject = ctx.add.container(
            384, 384,
            [this.mapFace, this.mapBorder]
        );

        this.mapFace.setInteractive();

        this.mapFace.on('pointerup', function () {
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
    }

    setInactive() {
        this.active = false;
        if (this.mapBorder) {
            this.mapBorder.clearTint();
        }
    }
}