'use strict';
/**
 * Unit
 * @since 2022-12-03
 * @author sjeg<sjegink@gmail.com>
 * 
 * Define identify and action by each types of Unit(Minion/Unit)
 */
const Unit = module.exports = require('./unit.js');

const fs = require('fs').promises;

// import typeDefinitions
(subdirName=>{
	fs.readdir(__dirname+"/"+subdirName).then(async entryNames=>{
		entryNames.forEach(name=>{
			name = name.replace(/\W.*/,"");
			Unit.TypeDef[name] = require(__dirname+"/"+subdirName+"/"+name);
		});
	});
})("typeDefs");

// import others
[
	'docs',
].forEach(subdirName=>{
	Unit[subdirName] = {};
	fs.readdir(__dirname+"/"+subdirName).then(async entryNames=>{
		entryNames.forEach(name=>{
			name = name.replace(/\W.*/,"");
			Unit[subdirName][name] = require(__dirname+"/"+subdirName+"/"+name);
		});
	});
});