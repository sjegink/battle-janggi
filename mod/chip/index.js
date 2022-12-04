'use strict';
/**
 * Chip
 * @since 2022-12-03
 * @author sjeg<sjegink@gmail.com>
 * 
 * Define identify and action by each types of Chip(Minion/Unit)
 */
const Chip = module.exports = require('./chip.js');

const fs = require('fs').promises;

// import typeDefinitions
(subdirName=>{
	fs.readdir(__dirname+"/"+subdirName).then(async entryNames=>{
		entryNames.forEach(name=>{
			name = name.replace(/\W.*/,"");
			Chip.TypeDef[name] = require(__dirname+"/"+subdirName+"/"+name);
		});
	});
})("typeDefs");

// import others
[
	'docs',
].forEach(subdirName=>{
	Chip[subdirName] = {};
	fs.readdir(__dirname+"/"+subdirName).then(async entryNames=>{
		entryNames.forEach(name=>{
			name = name.replace(/\W.*/,"");
			Chip[subdirName][name] = require(__dirname+"/"+subdirName+"/"+name);
		});
	});
});