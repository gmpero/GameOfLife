const HEX = '0123456789ABCDEF';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var mas=[];
var count=0;
var timer;
let size = 100

const getRandomColor = () =>{
    let color = '#';
    for (let index = 0; index < 6; index++) {
        color = color + HEX[Math.floor(Math.random() * 16)];    
    }
    return color;
}
ctx.fillStyle = getRandomColor();

canvas.onclick = function(event){
	var x = event.offsetX;
	var y = event.offsetY;
	console.log(x);
	console.log(y);
	x = Math.floor(x/5); //300 /5 = 30
	y = Math.floor(y/5); //300 /5 = 
	mas[y][x]=1;
	console.log(mas);
	drawField();
}

function goLife(){
	
	for (var i=0; i<size; i++){
		mas[i]=[];
		for (var j=0; j<size; j++){
			mas[i][j]=0;
		}
	}
}
goLife();

function drawField(){
	ctx.clearRect(0, 0, 500, 500);
	for (var i=0; i<size; i++){
		for (var j=0; j<size; j++){
			if (mas[i][j]==1){
				ctx.fillRect(j*5, i*5, 5, 5);
                //ctx.fillStyle = getRandomColor();
			}
		}
	}
}

function startLife(){
	//моделирование жизни
	var mas2 = [];
	for (var i=0; i<size; i++){
		mas2[i]=[];
		for (var j=0; j<size; j++){
			var neighbors = 0;
			if (mas[fpm(i)-1][j]==1) neighbors++;//up
			if (mas[i][fpp(j)+1]==1) neighbors++;//right
			if (mas[fpp(i)+1][j]==1) neighbors++;//bottom
			if (mas[i][fpm(j)-1]==1) neighbors++;//left
			if (mas[fpm(i)-1][fpp(j)+1]==1) neighbors++;
			if (mas[fpp(i)+1][fpp(j)+1]==1) neighbors++;
			if (mas[fpp(i)+1][fpm(j)-1]==1) neighbors++;
			if (mas[fpm(i)-1][fpm(j)-1]==1) neighbors++;
			(neighbors==2 || neighbors==3) ? mas2[i][j]=1 : mas2[i][j]==0;

            if(mas[i][j] ===0 && neighbors === 3){
                mas2[i][j] = 1;
            }else if(mas[i][j] === 1 && neighbors > 3 || neighbors < 2){
                mas2[i][j] = 0
            }else{
                mas2[i][j] = mas[i][j];
            }
		}
	}
	mas = mas2;

	drawField();
	count++;
	document.getElementById('count').innerHTML = count;
	timer = setTimeout(startLife, 40);
}

function fpm(i){
	if(i==0) return 100;
	else return i;
}
function fpp(i){
	if(i==99) return -1;
	else return i;
}

document.getElementById('start').onclick = startLife;
document.getElementById('random').onclick = generationField;

function generationField(){
    for (let i = 0; i < 100; i++) {
        mas[i] = [];
        for (let j = 0; j < 100; j++) {
            mas[i][j] = (Math.random() * 100) > 40 ? 1:0;
            if(!mas[i][j]) ctx.fillRect(i*5, j*5, 5, 5)
        }    
    }
}



console.log(getRandomColor());