export default class GameSession {
    constructor() {
        this.players = new Map();
        this.activePlayer = null;
    }

    init(ps) {
        this.players = new Map();

        if (ps != null && ps.length > 0) {
            ps.forEach((player) => {
                this.addPlayer(player);
            });
            this.setActivePlayer(ps[0].name);
        }
    }

    addPlayer(player) {
        this.players.set(player.name, player);
    }

    setActivePlayer(name) {
        this.activePlayer = this.players.get(name);
    }
}