'use strict';

/*
	@since 2022-12-06
	@author sjeg<sjegink@gmail.com>

	DATABASE NOT ATTACHED TO THIS PROJECT YET.
	AT NOW, JUST MEMORY-BASE STORAGE, THAT'S ALL.
 */
module.exports = new function(PlayerClass){

	const indexBySeq = [];
	const indexById = {};

	this.create = function(){
		const now = new Date();
		const player = new PlayerClass();
		indexBySeq.push(player);
		return Object.assign(new PlayerClass(),{
			seq: indexBySeq.length,
			createdAt: now,
			loggedAt: now,
		});
	}

	this.findBySeq = function(seq){
		return indexBySeq[seq];
	}

	this.findById = function(id){
		return indexById[seq];
	}
}