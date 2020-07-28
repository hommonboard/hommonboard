import GameObject from "./gameObject.js";

export default class Castle extends GameObject {
    constructor(gameSession, name, displayName) {
        super(gameSession, name, displayName);
        this.units = new Map();
    }
}