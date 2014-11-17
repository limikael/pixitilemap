"use strict";

var PIXI = require("pixi.js");
var inherits = require("inherits");

/**
 * Tile map.
 * @class TileMap
 * @constructor
 */
function TileMap(sheet, gridWidth, gridHeight) {
	PIXI.DisplayObjectContainer.call(this);

	this.sheet = sheet;
	this.gridWidth = gridWidth;
	this.gridHeight = gridHeight;

	this.sprites = [];
	this.tokenMap = {};
}

inherits(TileMap, PIXI.DisplayObjectContainer);

/**
 * Set tile tokens.
 * @method setTileTokens
 */
TileMap.prototype.setTileTokens = function(tokenRows) {
	this.tokenMap = {};

	for (var rowIndex = 0; rowIndex < tokenRows.length; rowIndex++) {
		var row = tokenRows[rowIndex];

		for (var colIndex = 0; colIndex < row.length; colIndex++) {
			var token = row.charAt(colIndex);

			this.tokenMap[token] = {
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
TileMap.prototype.createSpriteForToken = function(token) {
	if (!this.tokenMap.hasOwnProperty(token))
		throw new Error("Unknown token: " + token);

	var o = this.tokenMap[token];

	var frame = new PIXI.Rectangle(
		o.col * this.gridWidth + .5,
		o.row * this.gridHeight + .5,
		this.gridWidth - 1,
		this.gridHeight - 1);

	var t = new PIXI.Texture(this.sheet, frame);
	var s = new PIXI.Sprite(t);

	s.width = this.gridWidth;
	s.height = this.gridHeight;

	return s;
}

/**
 * Set map.
 * @method setMap
 */
TileMap.prototype.setMap = function(map) {
	for (var i = 0; i < this.sprites.length; i++)
		this.removeChild(this.sprites[i]);

	this.sprites = [];

	for (var rowIndex = 0; rowIndex < map.length; rowIndex++) {
		var row = map[rowIndex];

		for (var colIndex = 0; colIndex < row.length; colIndex++) {
			var token = row.charAt(colIndex);

			var s = this.createSpriteForToken(token);

			s.position.x = colIndex * this.gridWidth;
			s.position.y = rowIndex * this.gridHeight;

			this.addChild(s);
		}
	}
}

module.exports = TileMap;