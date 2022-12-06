module.exports.name = "/unit/:name";
module.exports.get = async (req,res)=>{
	const unitTypeDef = Unit.TypeDef[req.params.name];
	if(unitTypeDef==null){
		return res.status(404);
	}
	res.append('Content-Type', "text/json; charset=utf-8");
	res.send(JSON.stringify(Object.fromEntries(Object.entries(unitTypeDef).map(([k,v])=>[k,
		v,
	]))));
}