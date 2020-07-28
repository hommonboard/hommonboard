import GameSession from "../../game/gameSession.js";
import Player from "../../game/player.js";
import HeroFactory from "../../game/hero/heroFactory.js";
import {HERO_NAMES} from "../../game/hero/heroNames.js";
import Map from "../../game/map.js";
import Castle from "../../game/castle.js";
import Unit from "../../game/unit.js";

export default class GameSettingsScene extends Phaser.Scene {
    constructor() {
        super("GameSettingsScene");
    }

    create() {
        this.createGameSession();
        this.scene.start("LoadGameScene");
    }

    createGameSession() {
        this.game.gameSession = new GameSession();

        let map = new Map(this.game.gameSession);
        this.game.gameSession.setMap(map);

        let player = new Player(this.game.gameSession, "player1");

        let heroFactory = new HeroFactory();
        let heroLuna = heroFactory.getHero(HERO_NAMES.LUNA);
        heroLuna.gameSession = this.game.gameSession;
        heroLuna.indX = 5;
        heroLuna.indY = 5;
        player.addHero(heroLuna);

        let heroLabetha = heroFactory.getHero(HERO_NAMES.LABETHA);
        heroLabetha.indX = 5;
        heroLabetha.indY = 6;
        heroLabetha.gameSession = this.game.gameSession;
        player.addHero(heroLabetha);

        player.setActiveHero(heroLuna.name);

        this.game.gameSession.addPlayer(player);
        this.game.gameSession.setActivePlayer(player.name);
    }
}