'use strict';

/**
 * Descript about chip
 * @param {string} [chipTypeName]
 * @return {string<markdown>}
 */
module.exports = buildMarkdown;

function buildMarkdown(chipTypeName){
	if(chipTypeName==null){
		return Object.keys(Chip.TypeDef).map((chipTypeName)=>{
			return buildMarkdown(chipTypeName).replace(/^#/mg, "##");
		});
	}else{
		const chipTypeDef = Chip.TypeDef[chipTypeName];
		if(!chipTypeDef) return null;

		return `# ${chipTypeDef.label} : ${chipTypeName}`;
	}
}