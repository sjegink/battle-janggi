'use strict';

const Room = module.exports = class Room {
	id;
	constructor(roomId){
		this.id = roomId;
	}
};

// define static members
Object.freeze(function(){

	const Map = require('./map.js');
	const Uuid = require(process.cwd() + '/lib/utils/uuid');
	const roomDirectory = {};

	/**
	 * @name getRoomById
	 * @param {string} roomId
	 * @return {Room}
	 */
	this.getRoomById = function(roomId){
		return roomDirectory[roomId] ?? null;
	}

	this.createRoom = function(){
		let roomId = (()=>{
			let uuid, retryLimit = 16;
			while(uuid=Uuid()){
				let roomId = uuid.replace(/\W/g,"");
				if(!roomDirectory.hasOwnProperty(roomId)) return roomId;
				if(--retryLimit==0) throw new Error("Failed to  genreating roomID with UUID.");
			}
		})();
		const room = roomDirectory[roomId] = new Room(roomId);
		return room;
	}

	this.enterRoom = function(room, user){

	}

}.call(Room));