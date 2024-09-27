//Yanabhat 6601012620089
let clicked1 = [];
let clicked2 = [];
let board = [];
let paired = [];
let difficulty = 'normal';//easy2 normal4 hard8
let gameMode = 'double';//normal 1 pair, double 2 pairs
let nimY;
let nimnum;
if(difficulty == 'easy'){nimY = 2;}
else if(difficulty == 'normal'){nimY = 4;}
else{nimY = 8;}
if(gameMode == 'double'){nimnum = 4;}
else{nimnum = 2;}

//2/4/8
function setup() {
    createCanvas(windowWidth, windowHeight);
    background('white');
    let numbers = [];
    for(let i = 0; i<nimY*5/nimnum; i++){
        for(let j = 0; j<nimnum; j++){
          if(numbers.length>=nimY*5){break;}
          numbers.push(i);
        }
    }
    for(let i = 0; i<nimY; i++){
        board.push([]);
        for(let j = 0; j<5; j++){
            const randomNum = random(numbers);
            index = numbers.indexOf(randomNum);
            numbers.splice(index, 1);
            board[i].push(randomNum);
        }
    }
    console.log(board);
}

function draw() {
    rect(0,0,windowWidth,windowHeight);
    textAlign(CENTER, CENTER);
    textSize(20);
    let text1;
    let text2;
    const blockX = floor(windowWidth/5);
    const blockY = floor(windowHeight/nimY);
    for(let i=1; i<5; i++){
        line(i*windowWidth/5, 0, i*windowWidth/5, windowHeight);
    }
    for(let i=1; i<nimY; i++){
        line(0, i*windowHeight/nimY, windowWidth, i*windowHeight/nimY);
    }
    if(clicked1.length!=0){
        text1 = board[clicked1[0]][clicked1[1]];
        text(text1.toString(), clicked1[1]*blockX+blockX/2, clicked1[0]*blockY+blockY/2);
    }
    if(clicked2.length!=0){
        text2 = board[clicked2[0]][clicked2[1]];
        text(text2.toString(), clicked2[1]*blockX+blockX/2, clicked2[0]*blockY+blockY/2);
        if(text1 == text2){
          paired.push([clicked1[0],clicked1[1],clicked2[0],clicked2[1], text2]);
          board[clicked1[0]][clicked1[1]] = '';
          board[clicked2[0]][clicked2[1]] = '';
        }
    }
    paired.map((axis) => {
        const numshow = axis[4].toString();
        text(numshow, axis[1]*blockX+blockX/2, axis[0]*blockY+blockY/2);
        text(numshow, axis[3]*blockX+blockX/2, axis[2]*blockY+blockY/2);
    });
}

function mouseClicked(){
    if(clicked2.length == 0){
        const blockX = floor(windowWidth/5);
        const blockY = floor(windowHeight/nimY);
        const arrayX = floor(mouseX/blockX);
        const arrayY = floor(mouseY/blockY);
        if(clicked1.length == 0){clicked1.push(arrayY,arrayX);}
        else{
            if(clicked1[0] !== arrayY || clicked1[1] !== arrayX){
              clicked2.push(arrayY,arrayX);
              setTimeout(() => {
                  clicked1 = [];
                  clicked2 = [];
                  console.log("clicked reset")
              },1000);
            }
        }
        console.log(clicked1);
        console.log(clicked2);
    }
}
