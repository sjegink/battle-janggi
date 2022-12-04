module.exports.name = "/chip";
module.exports.get = async (req,res)=>{
	res.append('Content-Type', "text/json; charset=utf-8");
	res.send(JSON.stringify(Object.values(Chip.TypeDef).map(chipTypeDef=>{
		return Object.fromEntries(Object.entries(chipTypeDef).map(([k,v])=>[k,
			v,
		]))
	})));
}