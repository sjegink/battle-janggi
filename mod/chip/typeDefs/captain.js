'use strict';

const Chip = require(`../chip.js`);

module.exports = Object.freeze(Object.assign(new Chip.TypeDef(),{
	label: "將",
	desc: "",

	sight: 2,

	paths: [
		{
			type: "vertical",
			min: 1, max: 1,
			cost: 1,
			isMove: true,
		},{
			type: "horizontal",
			min: 1, max: 1,
			cost: 1,
			isMove: true,
		},{
			type: "custom",
			route: [
				[1,1],
			],
			min: 1, max: 1,
			cost: 2,
			isMove: true,
		},{
			type: "vertical",
			min: 2, max: 2,
			cost: 2,
			isMove: true,
		},{
			type: "horizontal",
			min: 2, max: 2,
			cost: 2,
			isMove: true,
		},
	],

	actions: [
		{
			title: "SHUFFLE_DECK",
			desc: "",
			method: "SHUFFLE_DECK",
		},
	],

	onTurnCome: (chip)=>{
		chip.side.earn();
	},
}));