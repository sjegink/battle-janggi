'use strict';

const BOARD_SIZE = 9;
const COLOR_BOARD_BG = "#DCA";
const COLOR_CHIP_BG = "#f7f7f7";
const COLOR_CHIP_FG_FRIENDLY = "#090";
const COLOR_CHIP_FG_ENEMY = "#B00";
let canvasSize = 100;

function redrawBoard(newCanvasSize){
	const {canvas,ctx} = getCanvasAndContext();

	// check size
	if(0 < newCanvasSize && canvasSize != newCanvasSize){
		canvasSize = newCanvasSize;
		canvas.setAttribute('width', canvasSize);
		canvas.setAttribute('height', canvasSize);
	}

	// fill background
	ctx.fillStyle = COLOR_BOARD_BG;
	ctx.fillRect(0,0, canvasSize,canvasSize);

	// draw grid
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#000";
	ctx.beginPath();
	for(let i=0; i<BOARD_SIZE; i++){
		ctx.moveTo(...coord(0,i));
		ctx.lineTo(...coord(BOARD_SIZE-1,i));
		ctx.moveTo(...coord(i,0));
		ctx.lineTo(...coord(i, BOARD_SIZE-1));
	}
	ctx.stroke();
	ctx.closePath();
}


function drawChip(chipInfo){
	const {ctx} = getCanvasAndContext();
	const {0:cx,1:cy} = coord(chipInfo.x, chipInfo.y);
	let wFull = (coord(1) - coord(0)) * 7/8;
	let wSide = wFull / (1 + 2/Math.sqrt(2));

	// draw octagon
	ctx.fillStyle = COLOR_CHIP_BG;
	ctx.beginPath();
	ctx.moveTo(cx-wSide/2, cy-wFull/2);
	ctx.lineTo(cx+wSide/2, cy-wFull/2);
	ctx.lineTo(cx+wFull/2, cy-wSide/2);
	ctx.lineTo(cx+wFull/2, cy+wSide/2);
	ctx.lineTo(cx+wSide/2, cy+wFull/2);
	ctx.lineTo(cx-wSide/2, cy+wFull/2);
	ctx.lineTo(cx-wFull/2, cy+wSide/2);
	ctx.lineTo(cx-wFull/2, cy-wSide/2);
	ctx.closePath();
	ctx.fill();

	// draw identity
	let label = chipInfo.label;
	if(typeof label!='string' || label.length!=1){
		console.warn(`Invalid Chip Label '${label}', it will be replaced.`);
		label = "無";
	}
	ctx.fillStyle = chipInfo.isMine ? COLOR_CHIP_FG_FRIENDLY : COLOR_CHIP_FG_ENEMY;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = `${Math.floor((wSide+wFull)/2)}px serif`;
	ctx.fillText(label, cx,cy);
}

function getCanvasAndContext(){
	const canvas = document.querySelector(".board");
	return {
		canvas,
		ctx:canvas.getContext('2d'),
	};
}

const coord = function(lineIndex,lineIndex2){
	if(lineIndex2===undefined){
		return canvasSize * (lineIndex+.5) / BOARD_SIZE;
	}else{
		return [coord(lineIndex),coord(lineIndex2)];
	}
}