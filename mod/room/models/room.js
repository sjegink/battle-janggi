'use strict';

const Room = module.exports = class Room {
	id;
	constructor(roomId){
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

	const Map = require('./map.js');
	const Uuid = require(process.cwd() + '/lib/utils/uuid');
	const roomDirectory = {};
	const roomByToken = {};

	/**
	 * @name listRoomId
	 * @return {Array<string>}
	 */
	this.listRoomId = function(){
		return Object.keys(roomDirectory);
	}

	/**
	 * @name getRoomById
	 * @param {string} roomId
	 * @return {Room}
	 */
	this.getRoomById = function(roomId){
		return roomDirectory[roomId] ?? null;
	}

	/**
	 * @name createRoom
	 * @return {Room}
	 */
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

	/**
	 * @name destroyRoom
	 * @param {Room} room
	 */
	this.destroyRoom = function(room){
		if(!(room instanceof Room)){
			room = Room.getRoomById(String(room));
		}
		if(room instanceof Room){
			delete roomDirectory[room.id];
			
		}
	}

	/**
	 * @name enterRoom
	 * @param {Room} room
	 * @param {Player} user
	 */
	this.enterRoom = function(room, user){
		let oldRoom = roomByToken[user.socketId];
		if(oldRoom){
			delete roomByToken[user.socketId];
			if(oldRoom.playerIds.includes(user.socketId)){
				Room.leaveRoom(oldRoom, user);
			}
		}
		// TODO: after enter?
	}

	/**
	 * @name leaveRoom
	 * @param {Room} room
	 * @param {Player} user
	 */
	this.leaveRoom = function(room, user){
		if(roomByToken[user.socketId] === room.id){
			delete roomByToken[user.socketId];
		}
		let seatIndex = room.playerIds.includes[user.id];
		if(1 < seatIndex){
			room.playerIds.splice(user.id,1);
			if(room.playerIds.length){

			}else{
				Room.destroyRoom(room);
			}
		}
	}

}.call(Room));
