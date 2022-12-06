'use strict';

const fs = require('fs').promises;

/**
 * @abstract
 * @class
 * @name Unit
 */
global.Unit = module.exports = class Unit{

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
	 * @member {string<url|UnitLabel>} icon - to display on action UI
	 * @member {number} cost - this action costs gold
	 * @member {function} onAction
	 */
	actions;

	/** this function fired whenever the turn pointer come back. */
	onTurnCome(unit){}
	/** this function includes logics only absolutely related with this unit. */
	onMove(pos,unit){}
	/** this function includes logics only never related with the unit who moved. */
	onTargeted(unit){}

	// == can otherUnits do their act ==

	/** @return {boolean} notify the other unit can target this or not before that move. */
	checkTargetable(unit){ return this.side != unit.side; }
	/** @return {boolean} notify the other unit can pass this to beyond or not before that move. */
	checkPassable(unit){ return false; }
}

Unit.TypeDef = class UnitTypeDef{}

Unit._loadingPromise = (async ()=>{
	fs.readdir(__dirname).then(async entryNames=>{
		Promise.forEach(entryNames, async entryName=>{
			const stat = await fs.stat(`${__dirname}/${entryName}`);
		});
	});
})();