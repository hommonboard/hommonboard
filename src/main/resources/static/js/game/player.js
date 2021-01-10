export default class Player {
    constructor(gameSession, name) {
        this.gameSession = gameSession;
        this.name = name;
        this.heroes = new Map();
        this.activeHero = null;
        this.castles = new Map();
        this.activeCastle = null;

        this.MAX_HEROES_COUNT = 8;
        this.MAX_CASTLES_COUNT = 8;
    }

    preload(scene) {
        this.heroes.forEach(hero => {
            hero.preload(scene);
        });
    }

    createOnMap(scene) {
        this.heroes.forEach(hero => {
            hero.createOnMap(scene);
        });
    }

    createOnMapUI(scene) {
        var x = 5;
        var y = 5;

        this.heroes.forEach(hero => {
            hero.createOnMapUI(scene, x, y);
            x += 70;
        });
    }

    addHero(hero) {
        this.heroes.set(hero.name, hero);
        return true;
    }

    removeHero(name) {
        let isDeleted = this.heroes.delete(name);
        if (this.activeHero.name === name) {
            this.activeHero = this.heroes.values().next().value;
        }
        return isDeleted;
    }

    setActiveHero(name) {
        let isSet = false;
        if (this.heroes.get(name)) {
            this.activeHero = this.heroes.get(name);
            isSet = true;
        }
        return isSet;
    }

    addCastle(castle) {
        this.castles.set(castle.name, castle);
        return true;
    }

    removeCastle(name) {
        let isDeleted = this.castles.delete(name);
        if (this.activeCastle.name === name) {
            this.activeCastle = this.castles.values().next().value;
        }
        return isDeleted;
    }

    setActiveCastle(name) {
        let isSet = false;
        if (this.castles.get(name)) {
            this.activeCastle = this.castles.get(name);
            isSet = true;
        }
        return isSet;
    }
}