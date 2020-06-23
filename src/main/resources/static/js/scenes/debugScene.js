export default class DebugScene extends Phaser.Scene {
    constructor(debug) {
        super({key: "DebugScene", active: false});
        this.debug = debug;

    }

    create() {
        this.cameras.main.setViewport(10, 10, 300, 300);
        this.debug.init(this);
    }

    update() {
        this.debug.update();
    }
}