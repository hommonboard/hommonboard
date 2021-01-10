import Hero from "./hero.js";
import {HERO_NAMES} from "./heroNames.js";
import {INFO} from "../info.js";

export default class Luna extends Hero {
    constructor(gameSession) {
        super(gameSession, HERO_NAMES.LUNA, "Luna");
        this.mapFaceSource = "../assets/images/heroes/hero_map_face_luna.png";
        this.mapUIFaceSource = "../assets/images/heroes/hero_map_ui_face_luna.png";
    }
}