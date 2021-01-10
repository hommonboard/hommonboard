import MenuButton from "./menuButton.js";

export default class NewGameButton extends MenuButton {
    constructor(x, y, text="New Game") {
        super(x, y, text);
    }

    create(scene) {
        super.create(scene);

        this.menuButtonBody.setInteractive();

        this.menuButtonBody.on('pointerover', function () {
            this.menuButtonBody.setTint(0x80ff80);
            this.menuButtonBorder.setTint(0xffe033);
        }.bind(this));

        this.menuButtonBody.on('pointerout', function () {
            this.menuButtonBody.clearTint();
            this.menuButtonBorder.clearTint();
        }.bind(this));

        this.menuButtonBody.on("pointerup", function () {
            scene.scene.start("GameSettingsScene");
        }.bind(this));
    }
}