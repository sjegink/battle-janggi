'use strinct';

new Promise(async ()=>{
	// import global modules
	;

	// import local modules
	require(process.cwd() + '/lib/utils/promiseUtils')();
	const httpServer = await require(process.cwd() + '/lib/core/expressServer')(80);

	// import modules
	global.Unit = require(process.cwd() + '/mod/unit');
	global.Player = require(process.cwd() + '/mod/player');
	global.Room = require(process.cwd() + '/mod/room');
	const socketServer = await require(process.cwd() + '/lib/core/socketServer')(httpServer, [
		Player, Room
	]);

	// End of Script
});