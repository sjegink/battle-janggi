'use strict';

const fs = require('fs').promises;

/**
 * @abstract
 * @class
 * @name Chip
 */
global.Chip = module.exports = class Chip{

	label;
	side;
	sight;
	isDetector;

	constructor({label, side, sight, isDetector}){
		this.label = label;
		this.side = side;
		this.sight = sight ?? 2;
		this.isDetector = isDetector ?? false;
	}

	/**
	 * Targetable Range Definition
	 * @type {Array<PathInfo>}
	 * @member {string} type - 'vertical'|'horizontal'|'custom'
	 * @member {Array<Coordinate<number,number>>} [route] - define route with relative coordinates from current position (required if type is 'custom')
	 * @member {number} min - the nearest distance targetable (0=current)
	 * @member {number} max - the farthest distance targetable (0=current)
	 * @member {number} [cost] - this path costs gold (default=0)
	 * @member {boolean} [isMove] - after this targeting action, is this move to target or not? (default=true)
	 */
	paths;

	/**
	 * Action without targeting.
	 * @type {Array<ActionInfo>}
	 * @member {string} title - to display on action UI
	 * @member {string<url|ChipLabel>} icon - to display on action UI
	 * @member {number} cost - this action costs gold
	 * @member {function} onAction
	 */
	actions;

	/** this function fired whenever the turn pointer come back. */
	onTurnCome(chip){}
	/** this function includes logics only absolutely related with this chip. */
	onMove(pos,chip){}
	/** this function includes logics only never related with the chip who moved. */
	onTargeted(chip){}

	// == can otherChips do their act ==

	/** @return {boolean} notify the other chip can target this or not before that move. */
	checkTargetable(chip){ return this.side != chip.side; }
	/** @return {boolean} notify the other chip can pass this to beyond or not before that move. */
	checkPassable(chip){ return false; }
}

Chip.TypeDef = class ChipTypeDef{}

Chip._loadingPromise = (async ()=>{
	fs.readdir(__dirname).then(async entryNames=>{
		Promise.forEach(entryNames, async entryName=>{
			const stat = await fs.stat(`${__dirname}/${entryName}`);
		});
	});
})();