'use strict';

/**
 * Descript about unit
 * @param {string} [unitTypeName]
 * @return {string<markdown>}
 */
module.exports = buildMarkdown;

function buildMarkdown(unitTypeName){
	if(unitTypeName==null){
		return Object.keys(Unit.TypeDef).map((unitTypeName)=>{
			return buildMarkdown(unitTypeName).replace(/^#/mg, "##");
		});
	}else{
		const unitTypeDef = Unit.TypeDef[unitTypeName];
		if(!unitTypeDef) return null;

		return `# ${unitTypeDef.label} : ${unitTypeName}`;
	}
}