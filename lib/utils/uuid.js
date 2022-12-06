'use strict';

/**
 * @author sjeg
 */

module.exports = function genUUID(t){

	const VER = 4;

	/*
		time_low	4 / 8	시간의 low 32비트를 부여하는 정수
		time_mid	2 / 4	시간의 middle 16비트를 부여하는 정수
		time_hi_and_version	2 / 4	최상위 비트에서 4비트 "version", 그리고 시간의 high 12비트
		clock_seq_hi_and_res clock_seq_low	2 / 4	최상위 비트에서 1-3비트는 UUID의 레이아웃형식, 그리고 13-15비트 클럭 시퀀스
		node	6 / 12	48비트 노드 id
	*/

	// custom parameter
	if(t == null || isNaN(t)){
		t = new Date().getTime();
	}else if(typeof t === 'number'){
		if(t < 0) t = -t;
		if(/\.\d{0,2}[1-9]/.test(t)) t *= 1000;
		if(/\./.test(t)) t = Math.floor(t);
	}else{
		t = parseInt(Buffer.from(String(t)).toString('binary'));
	}

	// guess microtime
	if(t < 10000000000000){
		t += Math.random();
		t = Math.floor(t * 1000);
	}

	// per byte
	let tx = t.toString(16).padStart(15,'0');
	let [txHi,txMid,txLow] = tx.match(/^.{3}|.{8}$|.{4}/g);

	let rs = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2);
	let r4 = rs.substring(rs.length-4);
	rs = rs.substring(0, rs.length-4);
	let r12 = rs.substring(rs.length-12);

	return `${txLow}-${txMid}-${VER}${txHi}-${r4}-${r12}`;
}