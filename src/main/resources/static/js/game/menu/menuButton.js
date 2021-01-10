export default class MenuButton {
    constructor(x, y, text, fontFamily='Arial', fontSize=23, fontColor='#ffcc66') {
        this.x = x;
        this.y = y;
        this.text = text;

        this.menuButton = null;

        this.menuButtonBodyKey = "menuButtonBody";
        this.menuButtonBodySource = "../assets/images/ui/menu/menu_button_body.png";
        this.menuButtonBody = null;
        this.menuButtonBorderKey = "menuButtonBorder";
        this.menuButtonBorderSource = "../assets/images/ui/menu/menu_button_border.png";
        this.menuButtonBorder = null;

        this.textElement = null;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
    }

    preload(scene) {
        scene.load.image(this.menuButtonBodyKey, this.menuButtonBodySource);
        scene.load.image(this.menuButtonBorderKey, this.menuButtonBorderSource);
    }

    create(scene) {
        this.menuButtonBorder = scene.add.image(0, 0, this.menuButtonBorderKey);
        this.menuButtonBody = scene.add.image(0, 0, this.menuButtonBodyKey);
        this.textElement = scene.add.text(
            0, 0, this.text,
            {
                fontFamily: this.fontFamily,
                fontSize: this.fontSize,
                color: this.fontColor
            }
        );

        this.textElement.setOrigin(0.5, 0.5);

        this.menuButton = scene.add.container(
            this.x,
            this.y,
            [this.menuButtonBorder, this.menuButtonBody, this.textElement]
        );
    }
}