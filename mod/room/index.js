'use strict';

/**
 * Room
 * @since 2022-12-04
 * @author sjeg<sjegink@gmail.com>
 * 
 * Manage logical process of gameplay in each room.
 */
const Room = module.exports = httpServer=>{
	require('./socket')(httpServer);
};

Room.SIZE = 9;

const fs = require('fs').promises;
const Field = require('./field');

// import subdir
[
	'modules',
].forEach(subdirName=>{
	Room[subdirName] = {};
	fs.readdir(__dirname+"/"+subdirName).then(async entryNames=>{
		entryNames.forEach(name=>{
			name = name.replace(/\W.*/,"");
			Room[subdirName][name] = require(__dirname+"/"+subdirName+"/"+name);
		});
	});
});