export default class GameObject {
    constructor(name, displayName) {
        this.name = name;
        this.displayName = displayName ? displayName : name;
        this.source = null;
        this.body = null;
    }

    preload(ctx) {
        ctx.load.image(this.name, this.source);
    }

    create(ctx) {
    }
}