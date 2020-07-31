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

    preload(ctx) {
        ctx.load.image(this.menuButtonBodyKey, this.menuButtonBodySource);
        ctx.load.image(this.menuButtonBorderKey, this.menuButtonBorderSource);
    }

    create(ctx) {
        this.menuButtonBorder = ctx.add.image(0, 0, this.menuButtonBorderKey);
        this.menuButtonBody = ctx.add.image(0, 0, this.menuButtonBodyKey);
        this.textElement = ctx.add.text(
            0, 0, this.text,
            {
                fontFamily: this.fontFamily,
                fontSize: this.fontSize,
                color: this.fontColor
            }
        );

        this.textElement.setOrigin(0.5, 0.5);

        this.menuButton = ctx.add.container(
            this.x,
            this.y,
            [this.menuButtonBorder, this.menuButtonBody, this.textElement]
        );
    }
}