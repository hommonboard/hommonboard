export default class GameSession {
    constructor() {
        this.players = new Map();
        this.activePlayer = null;
        this.map = new Map();
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