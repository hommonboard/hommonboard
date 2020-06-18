export default class BaseLoadScene extends Phaser.Scene {
    constructor(sceneName) {
        super(sceneName);
    }

    createLoadingBar() {
        //Progress text
        this.loadText = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 2,
            "Load: 0%",
            {
                font: "65px Arial",
                fill: "#ffffff",
                align: "center"
            }
        );
        this.loadText.setOrigin(0.5, 0.5);
        //Loading bar

        this.load.on("progress", this.onProgress, this);
    }

    onProgress(val) {
        this.loadText.setText("Load: " + Math.round(val * 100) + "%");
    }
}