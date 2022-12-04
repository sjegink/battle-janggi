module.exports.name = "/chip/:name";
module.exports.get = async (req,res)=>{
	const chipTypeDef = Chip.TypeDef[req.params.name];
	if(chipTypeDef==null){
		return res.status(404);
	}
	res.append('Content-Type', "text/json; charset=utf-8");
	res.send(JSON.stringify(Object.fromEntries(Object.entries(chipTypeDef).map(([k,v])=>[k,
		v,
	]))));
}