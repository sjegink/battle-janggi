'use strict';

/**
 * socketServer
 * @since 2022-12-04
 * @author sjeg<sjegink@gmail.com>
 */
module.exports = (httpServer,models)=>{

	const socketServer = IO = require('socket.io')(httpServer, {path: "/socket.io"});

	// init listenerPacks
	const ListenerPack = IO.ListenerPack = {};
	models.forEach(([model])=>{
		Object.entries(model.socket??{}).forEach(([name,packPart])=>{
			const listenerPack = IO.ListenerPack[packName] || (ListenerPack[name]={});
			Object.assign(ListenerPack[name], packPart);
		});
	});
	IO.loadListeners = function(userSocket,packName){
		listenerPack = IO.ListenerPack[packName] ?? {};
		Object.entries(listenerPack).map(([eventName,listener])=>{
			userSocket.on(eventName, listener);
		});
	}
	IO.unloadListeners = function(userSocket,packName){
		listenerPack = IO.ListenerPack[packName] ?? {};
		Object.entries(listenerPack).map(([eventName,listener])=>{
			userSocket.off(eventName, listener);
		});
	}

	// listen
	IO.on('connection', onConnect);
	function onConnect(userSocket){
		IO.loadListeners(userSocket, 'common');
		IO.loadListeners(userSocket, 'lobby');
	}
};