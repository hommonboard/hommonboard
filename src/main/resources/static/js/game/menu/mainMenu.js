import NewGameButton from "./newGameButton.js";

export default class MainMenu {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;

        this.menuContainer = null;

        this.buttons = [
            new NewGameButton(0, 0, "New Game")
        ];
    }

    preload(scene) {
        this.buttons.forEach(
            button => {
                button.preload(scene);
            }
        );
    }

    create(scene) {
        this.menuContainer = scene.add.container(this.x, this.y);

        this.buttons.forEach(
            button => {
                button.create(scene);
                this.menuContainer.add(button.menuButton);
            },
        this);
    }
}