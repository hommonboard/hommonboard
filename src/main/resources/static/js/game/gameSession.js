export default class GameSession {
    constructor() {
        this.players = new Map();
        this.activePlayer = null;
        this.map = new Map();

        this.mapScene = null;
        this.mapUIScene = null;
    }

    preload(scene) {
        this.map.preload(scene);
        this.players.forEach(player => {
            player.preload(scene);
        });
    }

    createOnMap(scene) {
        this.mapScene = scene;
        var gs = this;

        this.map.create(scene);
        this.players.forEach(player => {
            player.createOnMap(scene);
        });
    }

    createOnMapUI(scene) {
        this.mapUIScene = scene;

        this.players.forEach(player => {
            player.createOnMapUI(scene);
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