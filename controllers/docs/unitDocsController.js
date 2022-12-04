module.exports.name = "/unit";
module.exports.get = async (req,res)=>{
	let text = Unit.docs.getMD().join("\n\n");
	if(text==null){
		res.send(404);
	}
	res.append('Content-Type', "text/markdown; charset=utf-8");
	res.send(text);
}