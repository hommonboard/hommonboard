export default class GameSession {
    constructor() {
        this.players = new Map();
        this.activePlayer = null;
        this.map = new Map();

        this.mapScene = null;
        this.mapUIScene = null;
    }

    preload(ctx) {
        this.map.preload(ctx);
        this.players.forEach(player => {
            player.preload(ctx);
        });
    }

    createOnMap(ctx) {
        this.mapScene = ctx;
        var gs = this;

        this.map.create(ctx);
        this.players.forEach(player => {
            player.createOnMap(ctx);
        });
    }

    createOnMapUI(ctx) {
        this.mapUIScene = ctx;

        this.players.forEach(player => {
            player.createOnMapUI(ctx);
        });
    }

    setMap(map) {
        this.map = map;
    }

    addPlayer(player) {
        this.players.set(player.name, player);
    }

    removePlayer(name) {
        let isDeleted = this.players.delete(name);
        if (this.activePlayer.name === name) {
            this.activePlayer = this.players.values().next().value;
        }
        return isDeleted;
    }

    setActivePlayer(name) {
        this.activePlayer = this.players.get(name);
    }
}