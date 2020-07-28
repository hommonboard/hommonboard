export default class Map {
    constructor(gameSession) {
        this.gameSession = gameSession;
        this.map = null;

        this.borderTilesName = "border";
        this.fogTilesName = "fog";
        this.roadTilesName = "road";
        this.natureTilesName = "nature";
        this.groundTilesName = "ground";
        this.borderTiles = null;
        this.fogTiles = null;
        this.roadTiles = null;
        this.natureTiles = null;
        this.groundTiles = null;

        this.borderLayerName = "borderLayer";
        this.fogLayerName = "fogLayer";
        this.roadLayerName = "roadLayer";
        this.natureLayerName = "natureLayer";
        this.groundLayerName = "groundLayer";
        this.borderLayer = null;
        this.fogLayer = null;
        this.roadLayer = null;
        this.natureLayer = null;
        this.groundLayer = null;

        this.borderSourceKey = "borderSourceTiles";
        this.fogSourceKey = "fogSourceTiles";
        this.roadSourceKey = "roadSourceTiles";
        this.natureSourceKey = "natureSourceTiles";
        this.groundSourceKey = "groundSourceTiles";
        this.borderSource = "../assets/tilemaps/tiles/border.png";
        this.fogSource = "../assets/tilemaps/tiles/fog.png";
        this.roadSource = "../assets/tilemaps/tiles/road.png";
        this.natureSource = "../assets/tilemaps/tiles/nature.png";
        this.groundSource = "../assets/tilemaps/tiles/ground.png";

        this.mapDataKey = "map";
        this.mapDataSource = "../assets/tilemaps/maps/map.json";
    }

    preload(ctx) {
        ctx.load.image(this.borderSourceKey, this.borderSource);
        ctx.load.image(this.fogSourceKey, this.fogSource);
        ctx.load.image(this.roadSourceKey, this.roadSource);
        ctx.load.image(this.natureSourceKey, this.natureSource);
        ctx.load.image(this.groundSourceKey, this.groundSource);
        ctx.load.tilemapTiledJSON(this.mapDataKey, this.mapDataSource);
    }

    create(ctx) {
        this.map = ctx.make.tilemap({ key: this.mapDataKey });

        this.groundTiles = this.map.addTilesetImage(this.groundTilesName, this.groundSourceKey);
        this.natureTiles = this.map.addTilesetImage(this.natureTilesName, this.natureSourceKey);
        this.roadTiles = this.map.addTilesetImage(this.roadTilesName, this.roadSourceKey);
        this.fogTiles = this.map.addTilesetImage(this.fogTilesName, this.fogSourceKey);
        this.borderTiles = this.map.addTilesetImage(this.borderTilesName, this.borderSourceKey);

        this.groundLayer = this.map.createStaticLayer(this.groundLayerName, this.groundTiles, 0, 0);
        this.natureLayer = this.map.createStaticLayer(this.natureLayerName, this.natureTiles, 0, 0);
        this.natureLayer.setCollisionByProperty({ collides: true });
        this.roadLayer = this.map.createStaticLayer(this.roadLayerName, this.roadTiles, 0, 0);
        this.borderLayer = this.map.createStaticLayer(this.borderLayerName, this.borderTiles, 0, 0);
        this.borderLayer.setCollisionByProperty({ collides: true });
        this.fogLayer = this.map.createDynamicLayer(this.fogLayerName, this.fogTiles, 0, 0);
    }
}