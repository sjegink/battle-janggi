'use strict';

/**
 * Room.socket.init
 * @since 2022-12-06
 * @author sjeg<sjegink@gmail.com>
 * 
 */
const self = module.exports = {

	'iam': function(userSocket,data){
		userSocket.emit('echo', "yes you are");
	}
};