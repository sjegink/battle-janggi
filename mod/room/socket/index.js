'use strict';

/**
 * Room.socket
 * @since 2022-12-04
 * @author sjeg<sjegink@gmail.com>
 * 
 */
const self = module.exports = init;
const ListenerPack = Object.fromEntries([
	lobby,
].map(name=>[name,require(`./${name}`)]));

function init(httpServer){
	const io = self.socketIO = require('socket.io')(httpServer, {path: "/socket.io"});
	io.on('connection', onConnect);
};

function onConnect(userSocket){

	// demand his identity.
	console.log('누꼬');
	userSocket.emit('echo', "who");
	userSocket.emit("who", {});

	let tm = setTimeout(()=>{
		userSocket.emit('close');
	}, 1000);
	userSocket.on('iam', data=>{
		if(data.userToken){
			userSocket.emit('warn', "You are not ready to accept your userToken");
		}
		clearTimeout(tm);
		console.log("iam come", data.roomId);
		userSocket.removeAllListeners('who');
	});

	userSocket.on('hello', data=>{
		userSocket.emit('echo', "hello"+JSON.stringify(data));
	});

	userSocket.on('', ()=>{
		console.log('머라카노');
	});
};