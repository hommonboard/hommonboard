import {HERO_NAMES} from "./heroNames.js";
import Luna from "./luna.js";
import Labetha from "./labetha.js";

export default class HeroFactory {
    constructor() {
    }

    getHero(name) {
        let hero = null;
        switch(name.toLowerCase()) {
            case HERO_NAMES.LUNA:
                hero = new Luna();
                break;
            case HERO_NAMES.LABETHA:
                hero = new Labetha();
                break;
        }

        return hero;
    }
}