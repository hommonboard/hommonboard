import Hero from "./hero.js";
import {HERO_NAMES} from "./heroNames.js";
import {INFO} from "../info.js";

export default class Luna extends Hero {
    constructor() {
        super(HERO_NAMES.LUNA, "Luna");
        this.sourceMapFace = "../assets/images/heroes/hero_map_face_luna.png";
    }
}