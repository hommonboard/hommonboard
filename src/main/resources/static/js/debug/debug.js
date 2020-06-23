export default class Debug {
    constructor(ctx, enable=false) {
        this.isEnable = enable;
        this.ctx = ctx;
        this.labels = new Map();
        this.values = new Map();
        this.info = [];
        this.baseX = 10;
        this.baseY = 10;
    }

    create(x=10, y=10) {
        this.baseX = x;
        this.baseY = y;
        this.text = this.ctx.add.text(x, y, '', { fill: '#00ff00' });
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
        if (this.isEnable) {
            this.updatePosition();
            this.updateInfo();
            this.text.setText(this.info);
        }
    }

    updateInfo() {
        this.info = [];
        this.labels.forEach((label, k) => {
            this.info.push(label + this.values.get(k));
        });
    }

    updatePosition() {
        this.text.x = this.ctx.cameras.main.worldView.x + this.baseX;
        this.text.y = this.ctx.cameras.main.worldView.y + this.baseY;
    }
}