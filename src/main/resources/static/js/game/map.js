export default class Map {
    constructor() {
        this.map = null;

        this.groundTilesName = "ground";
        this.borderTilesName = "gameBoardBorder";
        this.treeTilesName = "trees";
        this.fogTilesName = "spaceTile";
        this.groundTiles = null;
        this.treeTiles = null;
        this.borderTiles = null;
        this.fogTiles = null;

        this.groundLayerName = "GroundLayer";
        this.borderLayerName = "BorderLayer";
        this.treeLayerName = "TreeLayer";
        this.fogLayerName = "FogLayer";
        this.groundLayer = null;
        this.borderLayer = null;
        this.treeLayer = null;
        this.fogLayer = null;

        this.groundSourceKey = "groundSourceTiles";
        this.borderSourceKey = "borderSourceTiles";
        this.treeSourceKey = "treeSourceTiles";
        this.fogSourceKey = "fogSourceTiles";
        this.groundSource = "../assets/tilemaps/tiles/ground.png";
        this.treeSource = "../assets/tilemaps/tiles/trees.png";
        this.borderSource = "../assets/tilemaps/tiles/gameBoardBorder.png";
        this.fogSource = "../assets/tilemaps/tiles/spaceTile.png";
        this.mapDataKey = "map";
        this.mapDataSource = "../assets/tilemaps/maps/map.json";
    }

    preload(ctx) {
        ctx.load.image(this.groundSourceKey, this.groundSource);
        ctx.load.image(this.borderSourceKey, this.borderSource);
        ctx.load.image(this.treeSourceKey, this.treeSource);
        ctx.load.image(this.fogSourceKey, this.fogSource);
        ctx.load.tilemapTiledJSON(this.mapDataKey, this.mapDataSource);
    }

    create(ctx) {
        this.map = ctx.make.tilemap({ key: this.mapDataKey });

        this.groundTiles = this.map.addTilesetImage(this.groundTilesName, this.groundSourceKey);
        this.treeTiles = this.map.addTilesetImage(this.treeTilesName, this.treeSourceKey);
        this.borderTiles = this.map.addTilesetImage(this.borderTilesName, this.borderSourceKey);
        this.fogTiles = this.map.addTilesetImage(this.fogTilesName, this.fogSourceKey);

        this.groundLayer = this.map.createStaticLayer(this.groundLayerName, this.groundTiles, 0, 0);
        this.treeLayer = this.map.createStaticLayer(this.treeLayerName, this.treeTiles, 0, 0);
        this.treeLayer.setCollisionByProperty({ collides: true });
        this.borderLayer = this.map.createStaticLayer(this.borderLayerName, this.borderTiles, 0, 0);
        this.borderLayer.setCollisionByProperty({ collides: true });
        this.fogLayer = this.map.createDynamicLayer(this.fogLayerName, this.fogTiles, 0, 0);
    }
}