import GameObject from "../gameObject.js";
import {INFO} from "../info.js";
import {getX, getY} from "../tools.js";

export default class Castle extends GameObject {
    constructor(gameSession, name, displayName) {
        super(gameSession, name, displayName);
        this.units = new Map();

        this.mapCastle = null;

        this.mapCastleKey = "castleMap" + this.name + "Key";
        this.mapCastleSource = "../assets/images/castles/castle_map.png";

        this.mapUICastleKey = "castleMapUI" + this.name + "Key";
        this.mapUICastleSource = "../assets/images/castles/castle_map_ui.png";
        this.mapUICastleBorderKey = "castleMapUIBorder";
        this.mapUICastleBorderSource = "../assets/images/castles/castle_map_ui_border.png";
    }

    preload(scene) {
        scene.load.image(this.mapUICastleBorderKey, this.mapUICastleBorderSource);
        scene.load.image(this.mapUICastleKey, this.mapUICastleSource);
        scene.load.image(this.mapCastleKey, this.mapCastleSource);
    }

    create(scene) {
    }
}