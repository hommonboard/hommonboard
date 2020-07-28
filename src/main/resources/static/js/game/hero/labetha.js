import Hero from "./hero.js";
import {HERO_NAMES} from "./heroNames.js";
import {INFO} from "../info.js";

export default class Labetha extends Hero {
    constructor(gameSession) {
        super(gameSession, HERO_NAMES.LABETHA, "Labetha");
        this.sourceMapFace = "../assets/images/heroes/hero_map_face_labetha.png";
        this.sourceMapUIFace = "../assets/images/heroes/hero_map_ui_face_labetha.png";
    }
}