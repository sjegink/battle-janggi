'use strict';

/**
 * socketServer
 * @since 2022-12-06
 * @author sjeg<sjegink@gmail.com>
 * 
 * @param {HttpServer} httpServer listening server object that socket.io will be attacthed to
 * @param {Array<Object>} models those have member ListenerPacks named 'socket'
 */
module.exports = (httpServer,models)=>{

	const IO = require('socket.io')(httpServer, {path: "/socket.io"});

	// init listenerPacks
	const ListenerPacks = {};
	models.forEach(model=>{
		Object.entries(model.socket??{}).forEach(([packName,pack1])=>{
			const listenerPack = ListenerPack[packName] || (ListenerPack[packName]={});
			Object.entries(pack1).forEach(([eventName,listener])=>{
				const listeners = listenerPack[eventName] || (listenerPack[eventName]=[]);
				/** This mainListener is unique per eventName even if there are duplicate eventNames. */
				putMainListener(listeners);
				listeners.push(listener);
			});
		});
	});
	/** This mainListener is unique per eventName even if there are duplicate eventNames. */
	function putMainListener(listeners){
		return listeners[0] || (listeners[0] = function(userSocket, data){
			listeners.forEach(listener=>{
				if(mainListener != listener){
					listener.call(IO, userSocket, data);
				}
			});
		});
	}
	function getMainListener(packName, eventName){
		const listenerPack = ListenerPacks[packName] ?? {};
		const listeners = listenerPack[eventName] ?? []
		return putMainListener(listeners) || listeners[0];
	}
	IO.loadListeners = function(userSocket,packName){
		Object.keys(ListenerPacks[packName]??{}).map((eventName)=>{
			const mainListener = getMainListener(packName, eventName);
			userSocket.on(eventName, mainListener);
		});
	}
	IO.unloadListeners = function(userSocket,packName){
		Object.keys(ListenerPacks[packName]??{}).map((eventName)=>{
			const mainListener = getMainListener(packName, eventName);
			userSocket.off(eventName, mainListener);
		});
	}

	// listen
	IO.on('connection', onConnect);
	function onConnect(userSocket){

		// ask identity with timeout
		userSocket.emit('who', {});
		let tm = setTimeout(()=>{
			userSocket.emit('close');
			userSocket.removeAllListeners('iam');
		}, 1000);
		userSocket.on('iam', data=>{
			clearTimeout(tm);
			console.log("iam come", data.roomId);
			userSocket.removeAllListeners('iam');
			IO.loadListeners(userSocket, 'common');
			IO.loadListeners(userSocket, 'init');
		});
	}
};