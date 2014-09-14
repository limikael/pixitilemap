"use strict";

var PIXI=require("pixi.js");

/**
 * Utilities for the tile map component.
 * @class TileMapUtil
 */
function TileMapUtil() {
}

/**
 * Fix a tile tixture in order to avoid scaling artifacts.
 * @method fixTileTexture
 * @static
 */
TileMapUtil.fixTileTexture=function(tileAtlas, tileWidth, tileHeight) {
	if (!tileAtlas.baseTexture.hasLoaded)
		throw new Error("texture needs to be loaded");

	var cols=Math.floor(tileAtlas.width/tileWidth);
	var rows=Math.floor(tileAtlas.height/tileHeight);

	var texture=new PIXI.Texture(tileAtlas);
	var d=new PIXI.DisplayObjectContainer();

	for (var y=0; y<rows; y++)
		for (var x=0; x<cols; x++) {
			var s=TileMapUtil.getTileTexturePart(texture,tileWidth,tileHeight,x,y);
			d.addChild(s);
		}

	var texture=new PIXI.RenderTexture(cols*(tileWidth+2),rows*(tileHeight+2));
	texture.render(d);

	return texture;
}

/**
 * Get a texture part and extend it one pixel in all directions. This is done
 * in order to eliminate scaling artifacts.
 * @method getTileTexturePart
 * @static
 */
TileMapUtil.getTileTexturePart=function(baseTexture, tileWidth, tileHeight, col, row) {
	var container=new PIXI.DisplayObjectContainer();

	// Center
	var s=TileMapUtil.getTexturePartSprite(baseTexture,tileWidth*col,tileHeight*row,tileWidth,tileHeight);
	s.position.x=1;
	s.position.y=1;
	container.addChild(s);

	// Edges
	var s=TileMapUtil.getTexturePartSprite(baseTexture,tileWidth*col,tileHeight*row,1,tileHeight);
	s.position.x=0;
	s.position.y=1;
	container.addChild(s);

	var s=TileMapUtil.getTexturePartSprite(baseTexture,tileWidth*col,tileHeight*row,tileWidth,1);
	s.position.x=1;
	s.position.y=0;
	container.addChild(s);

	var s=TileMapUtil.getTexturePartSprite(baseTexture,tileWidth*col+tileWidth-1,tileHeight*row,1,tileHeight);
	s.position.x=tileWidth+1;
	s.position.y=1;
	container.addChild(s);

	var s=TileMapUtil.getTexturePartSprite(baseTexture,tileWidth*col,tileHeight*row+tileHeight-1,tileHeight,1);
	s.position.x=1;
	s.position.y=tileHeight+1;
	container.addChild(s);

	// Corners
	var s=TileMapUtil.getTexturePartSprite(baseTexture,tileWidth*col,tileHeight*row,1,1);
	s.position.x=0;
	s.position.y=0;
	container.addChild(s);

	var s=TileMapUtil.getTexturePartSprite(baseTexture,tileWidth*col+tileWidth-1,tileHeight*row,1,1);
	s.position.x=tileWidth+1;
	s.position.y=0;
	container.addChild(s);

	var s=TileMapUtil.getTexturePartSprite(baseTexture,tileWidth*col,tileHeight*row+tileHeight-1,1,1);
	s.position.x=0;
	s.position.y=tileHeight+1;
	container.addChild(s);

	var s=TileMapUtil.getTexturePartSprite(baseTexture,tileWidth*col+tileWidth-1,tileHeight*row+tileHeight-1,1,1);
	s.position.x=tileWidth+1;
	s.position.y=tileHeight+1;
	container.addChild(s);

	container.position.x=(tileWidth+2)*col;
	container.position.y=(tileHeight+2)*row;

	return container;
}

/**
 * Get a sprite for a texture part
 * @method getTexturePartSprite
 */
TileMapUtil.getTexturePartSprite=function(baseTexture, x, y, w, h) {
	var texture=new PIXI.Texture(baseTexture);
	texture.setFrame(new PIXI.Rectangle(x,y,w,h));

	return new PIXI.Sprite(texture);
}

module.exports=TileMapUtil;