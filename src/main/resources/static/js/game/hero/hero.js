import GameObject from "../gameObject.js";

export default class Hero extends GameObject {
    constructor(name, displayName) {
        super(name, displayName);
        this.units = new Map();
    }
}