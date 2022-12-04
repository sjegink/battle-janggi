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
		Object.assign(canvas.parentNode.style,{
			width: `${canvasSize}px`,
			height: `${canvasSize}px`,
			fontSize: `${Math.floor(canvasSize/2)}px`,
		})
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
	const {canvas,ctx} = getCanvasAndContext();
	const {0:cx,1:cy} = coord(chipInfo.x, chipInfo.y);

	// draw octagon
	canvas.parentNode.appendChild((el_chip=>{
		Object.assign(el_chip.style,{
			top: `${cy}px`,
			left: `${cx}px`,
		});
		el_chip.className = "div_chip";
		el_chip.appendChild((el_octagon=>{
			el_octagon.className = "div_chip__octagon";
			return el_octagon;
		})(document.createElement('div')));
		el_chip.appendChild((el_label=>{
			let label = chipInfo.label;
			if(typeof label!='string' || label.length!=1){
				console.warn(`Invalid Chip Label '${label}', it will be replaced.`);
				label = "無";
			}
			el_label.innerHTML = label;
			el_label.className = "div_chip__label";
			Object.assign(el_label.style, {
				color: chipInfo.isMine ? COLOR_CHIP_FG_FRIENDLY : COLOR_CHIP_FG_ENEMY,
			});
			return el_label;
		})(document.createElement('div')));
		return el_chip;
	})(document.createElement('div')));
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