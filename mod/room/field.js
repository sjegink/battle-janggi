'use strict';

const Field = module.exports = class Field{
	/** @type {Chip} */
	occupier = null;
	/** @type {Field.Type} */
	type;

	constructor(room, fieldType){
		this._room = room;
		this.type = fieldType;
	}

	getRoom(){
		return this._room;
	}
}

const FieldType = Field.Type = class FieldType{ constructor(name, isStayable, isPassable, isSeeable, isSeethroughable){
	Object.assign(this, { name, isStayable, isPassable, isSeeable, isSeethroughable });
} };
[
	new FieldType('plain', true,true,true,true),
].forEach(fieldType=>{
	const TYPE_NAME = fieldType.name.replace(/\B[A-Z]/g,c=>`_${c}`).toUpperCase();
	FieldType[TYPE_NAME] = fieldType;
});