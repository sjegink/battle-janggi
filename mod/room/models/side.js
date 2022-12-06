'use strict';

const Player = require(process.cwd()+'/mod/player');

const Side = module.exports = class Side {
	id;
	constructor(player){
		this.id = roomId;
		this._createdAt = new Date().getTime();
		this.touch();
	}
	touch(){
		this._touchedAt = new Date().getTime();
	}
};

// define static members
Object.freeze(function(){
}.call(Side));