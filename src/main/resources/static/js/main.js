var config = {
    type: Phaser.WEBGL,
    width: window.innerWidth - 30,
    height: window.innerHeight - 30,
    backgroundColor: '#2d2d2d',
    parent: 'gameContainer',
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var controls;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('tiles', '../assets/tilemaps/tiles/ground.png');
    this.load.tilemapTiledJSON('map', '../assets/tilemaps/maps/ground4.json');
}

function create ()
{
    var map = this.make.tilemap({ key: 'map' });

    var tiles = map.addTilesetImage('ground4', 'tiles');

    var layer = map.createStaticLayer(0, tiles, 0, 0);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    var cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5
    };

    controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
}

function update (time, delta)
{
    controls.update(delta);
}