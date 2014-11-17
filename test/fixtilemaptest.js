var PixiTileMap = require("../src/TileMap");
var PixiApp = require("pixiapp");
var inherits = require("inherits");
var PIXI = require("pixi.js");
var TileMapUtil = require("../src/TileMapUtil");

function App() {
	PixiApp.call(this, 1024, 576);

	this.assetLoader = new PIXI.AssetLoader(["tiles.png"]);
	this.assetLoader.addEventListener("onComplete", this.onAssetLoaderComplete.bind(this));
	this.assetLoader.load();

	this.sadBorder = true;
}

inherits(App, PixiApp);

App.prototype.onAssetLoaderComplete = function() {
	var texture = PIXI.Texture.fromImage("tiles.png");
	var fixedTexture = TileMapUtil.fixTileTexture(texture, 40, 40);

	//PIXI.Texture.addTextureToCache(fixedTexture,"blaj");

	console.log("base texture: "+fixedTexture.baseTexture.width)

	var t=new PIXI.Texture(fixedTexture.baseTexture);

	console.log(fixedTexture.frame);
	console.log(fixedTexture.trim);
	console.log(fixedTexture.crop);

	console.log(t.frame);
	console.log(t.trim);
	console.log(t.crop);

	var sprite = new PIXI.Sprite(t);

	console.log("loaded...");

	this.addChild(sprite);
}

new App();