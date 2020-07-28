export default class GameObject {
    constructor(gameSession, name, displayName) {
        this.gameSession = gameSession
        this.name = name;
        this.displayName = displayName ? displayName : name;
        this.indX = 0;
        this.indY = 0;
    }
}