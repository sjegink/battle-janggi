module.exports.name = "/unit";
module.exports.get = async (req,res)=>{
	res.append('Content-Type', "text/json; charset=utf-8");
	res.send(JSON.stringify(Object.values(Unit.TypeDef).map(unitTypeDef=>{
		return Object.fromEntries(Object.entries(unitTypeDef).map(([k,v])=>[k,
			v,
		]))
	})));
}