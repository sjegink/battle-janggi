'use strinct';

new Promise(async ()=>{
	// import global modules
	;

	// import local modules
	require(process.cwd() + '/lib/utils/promiseUtils')();
	const httpServer = await require(process.cwd() + '/lib/core/expressServer')(80);

	// import modules
	// require(process.cwd() + '/mod/chip');
	require(process.cwd() + '/mod/room')(httpServer);
	// require(process.cwd() + '/mod/lobby');

	// WOW
});