import Hero from "./hero.js";
import {HERO_NAMES} from "./heroNames.js";
import {INFO} from "../info.js";

export default class Luna extends Hero {
    constructor() {
        super(HERO_NAMES.LUNA, "Luna");
        this.source = "../assets/images/heroes/luna.png";
    }

    preload(ctx) {
        super.preload(ctx);
    }

    create(ctx) {
        this.body = ctx.physics.add.sprite(INFO.TILE_WIDTH, INFO.TILE_HEIGHT, this.name);
        this.body.setOrigin(0, 0);
    }
}