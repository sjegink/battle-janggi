'use strict';

module.exports = Object.freeze(new function(){

	const Field = require('../field.js');

	/**
	 * initialize map
	 * @name buildMap
	 * @param {Room} room
	 * @return {Array<Array<Field>>}
	 */
	this.buildMap = function(room){
		return new Array(9).fill(null).map((_,x)=>{
			return new Array(9).fill(null).map((_,y)=>{
				return new Field(room, Field.Type.PLAIN);
			});
		});
	}

	/**
	 * @param {Room} room
	 * @param {Chip} chip
	 * @params {number} x, {number} y
	 * @params {Field} field
	 */
	this.occupy = function(room, chip, ...fieldExpr){
		if(fieldExpr[0] instanceof Field){
			return occupyByField(room, chip, fieldExpr[0]);
		}
		if(typeof fieldExpr[0] === 'number' && typeof fieldExpr[1] === 'number'){
			let [x,y] = fieldExpr;
			if(x<0 || ROOM.size<=x || y<0 || ROOM.size<=y){
				throw new Error(`map.occupy : given coordinates(${x},${y}) are out of Field range.`);
			}
			return occupyByField(room, chip, room.fields[Math.floor(x)][Math.floor(y)]);
		}
		throw new Error(`map.occupy : 3rd~ parameter(${typeof fieldExpr[0]},${typeof fieldExpr[1]},..) cannot be recognized as Field.`);
	}
	function occupyByField(room, chip, field){

	}

	this.release = function(room, target){
		// TODO
		// if(target
	}
	function releaseChip(room){

	}

});