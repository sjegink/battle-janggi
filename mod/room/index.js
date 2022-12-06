'use strict';

/**
 * Room
 * @since 2022-12-06
 * @author sjeg<sjegink@gmail.com>
 * 
 * Room and related Objects.
 */
const Room = module.exports = require('./room');
Room.Side = require('./side');
Room.Field = require('./field');

// load socket listenerPack
[
	'socket'
].forEach(subdirName=>{
	Room[subdirName] = {};
	fs.readdir(__dirname+"/"+subdirName).then(async entryNames=>{
		entryNames.forEach(name=>{
			name = name.replace(/\W.*/,"");
			Room[subdirName][name] = require(__dirname+"/"+subdirName+"/"+name);
		});
	});
});