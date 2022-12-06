'use strict';

module.exports = Object.freeze(new function(){

	const Field = require('./field.js');
	const MAP_SIZE = 9;

	/**
	 * initialize map
	 * @name buildMap
	 * @param {Room} room
	 * @return {Array<Array<Field>>}
	 */
	this.buildMap = function(room){
		return new Array(MAP_SIZE).fill(null).map((_,x)=>{
			return new Array(MAP_SIZE).fill(null).map((_,y)=>{
				return new Field(room, Field.Type.PLAIN);
			});
		});
	}

	/**
	 * @param {Room} room
	 * @param {Unit} unit
	 * @params {number} x, {number} y
	 * @params {Field} field
	 */
	this.occupy = function(room, unit, ...fieldExpr){
		if(fieldExpr[0] instanceof Field){
			return occupyByField(room, unit, fieldExpr[0]);
		}
		if(typeof fieldExpr[0] === 'number' && typeof fieldExpr[1] === 'number'){
			let [x,y] = fieldExpr;
			if(x<0 || MAP_SIZE<=x || y<0 || MAP_SIZE<=y){
				throw new Error(`map.occupy : given coordinates(${x},${y}) are out of Field range.`);
			}
			return occupyByField(room, unit, room.fields[Math.floor(x)][Math.floor(y)]);
		}
		throw new Error(`map.occupy : 3rd~ parameter(${typeof fieldExpr[0]},${typeof fieldExpr[1]},..) cannot be recognized as Field.`);
	}
	function occupyByField(room, unit, field){

	}

	this.release = function(room, target){
		// TODO
		// if(target
	}
	function releaseUnit(room){

	}

});