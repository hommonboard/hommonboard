import {HERO_NAMES} from "./heroNames.js";
import Luna from "./luna.js";

export default class HeroFactory {
    constructor() {
    }

    getHero(name) {
        let hero = null;
        switch(name.toLowerCase()) {
            case HERO_NAMES.LUNA:
                hero = new Luna();
                break;
        }

        return hero;
    }
}