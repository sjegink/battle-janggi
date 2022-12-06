'use strict';

module.exports = {
	'circumstances': function({token}){
		const room = Room.getRoomByToken(token);
		if(!room){
			this.emit('warn', {
				token
			});
			this.emit('warn', {
				token
			});
			return;
		}
	},
};