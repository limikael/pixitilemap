"use strict";

var PIXI=require("pixi.js");
var FunctionUtil=require("./FunctionUtil");
var TileMapUtil=require("./TileMapUtil");

/**
 * Tile map.
 * @class TileMap
 * @constructor
 */
function TileMap(sheet, gridWidth, gridHeight) {
	this.sheet=TileMapUtil.fixTileTexture(sheet,gridWidth,gridHeight);
	this.gridWidth=gridWidth;
	this.gridHeight=gridHeight;

	PIXI.DisplayObjectContainer.call(this);

	this.sprites=[];
	this.tokenMap={};
}

FunctionUtil.extend(TileMap,PIXI.DisplayObjectContainer);

/**
 * Set tile tokens.
 * @method setTileTokens
 */
TileMap.prototype.setTileTokens=function(tokenRows) {
	this.tokenMap={};

	for (var rowIndex=0; rowIndex<tokenRows.length; rowIndex++) {
		var row=tokenRows[rowIndex];

		for (var colIndex=0; colIndex<row.length; colIndex++) {
			var token=row.charAt(colIndex);

			this.tokenMap[token]={
				row: rowIndex,
				col: colIndex
			};
		}
	}
}

/**
 * Create sprite for token.
 * @method createSpriteForToken
 */
TileMap.prototype.createSpriteForToken=function(token) {
	if (!this.tokenMap.hasOwnProperty(token))
		throw new Error("Unknown token: "+token);

	var o=this.tokenMap[token];

	var t=new PIXI.Texture(this.sheet);
	t.setFrame(new PIXI.Rectangle(
		1+o.col*(this.gridWidth+2),
		1+o.row*(this.gridHeight+2),
		this.gridWidth,
		this.gridHeight));

	var s=new PIXI.Sprite(t);

	s.width=this.gridWidth;
	s.height=this.gridHeight;

	return s;
}

/**
 * Set map.
 * @method setMap
 */
TileMap.prototype.setMap=function(map) {
	for (var i=0; i<this.sprites.length; i++)
		this.removeChild(this.sprites[i]);

	this.sprites=[];

	for (var rowIndex=0; rowIndex<map.length; rowIndex++) {
		var row=map[rowIndex];

		for (var colIndex=0; colIndex<row.length; colIndex++) {
			var token=row.charAt(colIndex);
			var s=this.createSpriteForToken(token);

			s.position.x=colIndex*this.gridWidth;
			s.position.y=rowIndex*this.gridHeight;

			this.addChild(s);
		}
	}
}

module.exports=TileMap;