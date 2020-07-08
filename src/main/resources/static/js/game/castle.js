import GameObject from "./gameObject.js";

export default class Castle extends GameObject {
    constructor(name, displayName) {
        super(name, displayName);
        this.units = new Map();
    }
}