export default class GameObject {
    constructor(name, displayName) {
        this.name = name;
        this.displayName = displayName ? displayName : name;
    }
}