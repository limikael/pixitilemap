var PixiTileMap = require("../src/TileMap");
var PixiApp = require("pixiapp");
var inherits = require("inherits");
var PIXI = require("pixi.js");

function App() {
	PixiApp.call(this, 1024, 576);

/*	this.assetLoader = new PIXI.AssetLoader(["tiles.png"]);
	this.assetLoader.addEventListener("onComplete", this.onAssetLoaderComplete.bind(this));
	this.assetLoader.load();*/

	this.sadBorder=true;

	var mapData = [
		"########################################",
		"#                                      #",
		"#       **                             #",
		"#       ==             __*__*____      #",
		"#                      ==========      #",
		"#__           _*              #        #",
		"#==    *      ==              #      ###",
		"###   _=                      #        #",
		"##   _=#_                     #        #",
		"#    =##=                     ###      #",
		"#      ##                     #        #",
		"#             _*              #      ###",
		"#          ___==_       #######        #",
		"#___*__  __===##=_______##             #",
		"#======  ==######=======##     ___*__*_#",
		"######      ##############     ========#",
		"#            #######             #######",
		"#       **      ####               #####",
		"#     ====                    ___    ###",
		"#                             ===      #",
		"#             _*                       #",
		"#      *      ==       _*__            #",
		"#______=               ====            #",
		"#======#_                    _*_       #",
		"#   ####=                    ===       #",
		"#   #####                           ___#",
		"#             _*                    ===#",
		"#          ___==_                      #",
		"#___*______===##=_____*______**________#",
		"#==========######======================#"
	];

	console.log("assets loaded...");

	var texture = PIXI.Texture.fromImage("tiles.png");

	this.tileMap = new PixiTileMap(texture, 40, 40);
	this.tileMap.setTileTokens(["#_*", " ="]);
	this.tileMap.setMap(mapData);

	this.tileMap.position.x=0;
	this.tileMap.position.y=0;
	this.addChild(this.tileMap);
}

inherits(App, PixiApp);

App.prototype.onAssetLoaderComplete = function() {
}

new App();