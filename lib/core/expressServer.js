'use strict';

module.exports = async port=>{

	const express = require('express');
	const fs = require('fs').promises;

	const expressApp = express();
	const router_dynamic = express.Router();
	const router_static = express.Router().use("/", express.static(`${process.cwd()}/static`));
	
	await (async function loadControllersInDir(router,dirPath){
		await fs.readdir(dirPath).then(async entryNames=>{
			Promise.forEach(entryNames, async entryName=>{
				const entryFullPath = `${dirPath}/${entryName}`;
				if(/^[_.]/.test(entryName)){
					// skip hidden entry
				}else{
					const entryInfo = await fs.stat(entryFullPath);
					if(entryInfo.isDirectory()){
						const childRouter = express.Router();
						await loadControllersInDir(childRouter, entryFullPath);
						router.use("/"+entryName, childRouter);
					}else if(/\.js$/.test(entryName)){
						let controller = require(entryFullPath);
						let pathName = controller.name;
						if(typeof pathName !== 'string') pathName = entryName;
						['get','post','put','patch','delete'].forEach(methodName=>{
							if(typeof controller[methodName] === 'function'){
								router[methodName](pathName.replace(/^($|(?=[^\/]))/,"/"), controller[methodName]);
							}
						});
					}
				};
			});
		});
	})(router_dynamic,`${process.cwd()}/controllers`);

	expressApp.use(router_dynamic);
	expressApp.use(router_static);

	return await expressApp.listen(port, () => {
		console.log(`BattleJanggi AppServer Listening on port ${port}`)
	});
};