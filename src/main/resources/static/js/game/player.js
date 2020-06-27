export default class Player {
    constructor(name) {
        this.name = name;
        this.heroes = new Map();
        this.activeHero = null;
        this.castles = new Map();
        this.activeCastle = null;
    }

    init(hrs, cstls) {
        this.heroes = new Map();
        this.castles = new Map();

        if (hrs != null && hrs.length > 0) {
            hrs.forEach((hero) => {
                this.addHero(hero);
            });
            this.setActiveHero(hrs[0].name);
        }

        if (cstls != null && cstls.length > 0) {
            cstls.forEach((castle) => {
                this.addCastle(castle);
            });
            this.setActiveCastle(cstls[0].name);
        }
    }

    addHero(hero) {
        this.heroes.set(hero.name, hero);
    }

    setActiveHero(name) {
        if (this.heroes.get(name)) {
            this.activeHero = this.heroes.get(name);
        }
    }

    addCastle(castle) {
            this.castles.set(castle.name, castle);
    }

    setActiveCastle(name) {
        if (this.castles.get(name)) {
            this.activeCastle = this.castles.get(name);
        }
    }
}