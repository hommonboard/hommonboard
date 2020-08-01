export default class Debug {
    constructor() {
        this.labels = new Map();
        this.values = new Map();
        this.info = [];
        this.scene = null;
    }

    init(scene) {
        this.scene = scene;
        this.text = this.scene.add.text(0, 0, '', { fill: '#00ff00' });
    }

    addInfoElement(key, label, value = "") {
        this.labels.set(key, label);
        this.values.set(key, value);
    }

    setValue(key, value="") {
        if (this.values.get(key) != undefined) {
            this.values.set(key, value);
        }
    }

    update() {
        this.updateInfo();
        this.text.setText(this.info);
    }

    updateInfo() {
        this.info = [];
        this.labels.forEach((label, k) => {
            this.info.push(label + this.values.get(k));
        });
    }
}