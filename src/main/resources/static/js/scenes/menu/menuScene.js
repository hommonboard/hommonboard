export default class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    create() {
        this.createIntroBackground();
        this.createIntroMenu();
        this.createGithubLink();
    }

    createIntroBackground() {
        this.introBackground = this.add.tileSprite(
            0, 0,
            this.game.config.width, this.game.config.height,
            "introBackground"
        );
        this.introBackground.setOrigin(0, 0);
        this.hommonboard = this.add.image(
            this.game.config.width / 2, this.game.config.height / 3,
            "hommonboard"
        );
    }

    createIntroMenu() {
        this.createNewGameButton();
    }

    createNewGameButton() {
        this.game.menu.newGameButton.create(this);
    }

    createGithubLink() {
        let githublogo = this.add.image(
             this.game.config.width / 3, this.game.config.height - 30,
             "githublogo"
         );

        let txtGithub = this.add.bitmapText(
            this.game.config.width / 2,
            this.game.config.height - 43,
            "font",
            "Project on Github",
            23
        );

        txtGithub.x = this.game.config.width / 2 - txtGithub.width / 2 + githublogo.width / 3;
        githublogo.x = txtGithub.x - githublogo.width / 2 - 5;

        txtGithub.setInteractive();
        txtGithub.on("pointerdown", () => {
            window.open("https://github.com/hommonboard/hommonboard","_blank")
        }, this);
        txtGithub.on("pointerover", () => pointerOver(txtGithub), this);
        txtGithub.on("pointerout", () => pointerOut(txtGithub), this);
    }

    update() {
        this.introBackground.tilePositionX += 0.1;
    }
}

function pointerOver(pointer) {
    pointer.setScale(1.05);
}

function pointerOut(pointer) {
    pointer.setScale(1);
}