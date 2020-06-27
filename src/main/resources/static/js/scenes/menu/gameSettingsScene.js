import GameSession from "../../game/gameSession.js";
import Player from "../../game/player.js";
import Hero from "../../game/hero.js";
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
    }
}