//Yanabhat 6601012620089
let clicked1 = [];
let clicked2 = [];
let board = [];
let paired = [];
let difficulty = 'easy';//easy2 normal4 hard8
let gameMode = 'normal';//normal 1 pair, double 2 pairs
let nimY;
let nimnum;
let timerA = 0;
let timerB = 0;
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
    for(let i = 1; (i<nimY*5/nimnum)+1; i++){
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
    if(clicked1.length!=0){//clicked1 => X, clicked0 => y
        for(let i = 0; i < timerA; i++){
          line(clicked1[1]*blockX+(i+1)*blockX/((i<nimY*5/nimnum)+2), clicked1[0]*blockY-blockY/8, clicked1[1]*blockX+(i+1)*blockX/((i<nimY*5/nimnum)+2),(clicked1[0]+1)*blockY-blockY/8);
        }
    }
    if(clicked2.length!=0){
        let text2 = board[clicked2[0]][clicked2[1]];
        for(let i = 0; i < timerB; i++){
          line(clicked2[1]*blockX+(i+1)*blockX/((i<nimY*5/nimnum)+2), clicked2[0]*blockY-blockY/8, clicked2[1]*blockX+(i+1)*blockX/((i<nimY*5/nimnum)+2),(clicked2[0]+1)*blockY-blockY/8);
        }
        if(text1 == text2){
          paired.push([clicked1[0],clicked1[1],clicked2[0],clicked2[1], text2]);
          board[clicked1[0]][clicked1[1]] = '';
          board[clicked2[0]][clicked2[1]] = '';
        }
    }
    paired.map((axis) => {
        const numshow = axis[4].toString();
        for(let i = 0; i < axis[4]; i++){
          line(axis[1]*blockX+(i+1)*blockX/((i<nimY*5/nimnum)+2), axis[0]*blockY+blockY/8, axis[1]*blockX+(i+1)*blockX/((i<nimY*5/nimnum)+2),(axis[0]+1)*blockY-blockY/8);
          line(axis[3]*blockX+(i+1)*blockX/((i<nimY*5/nimnum)+2), axis[2]*blockY+blockY/8, axis[3]*blockX+(i+1)*blockX/((i<nimY*5/nimnum)+2),(axis[2]+1)*blockY-blockY/8);
        }
    });
}


//setTimer function
function setTimerA(){
   setTimeout(() => {
              timerA = timerA + 1;
              if(timerA < board[clicked1[0]][clicked1[1]]){
                setTimerA();
              }
            }, 200);}
function setTimerB(){
   setTimeout(() => {
              timerB = timerB + 1;
              if(timerB < board[clicked2[0]][clicked2[1]]){
                setTimerB();
              }
              else{setTimeout(() => {
                  clicked1 = [];
                  clicked2 = [];
                  console.log("clicked reset")
                  },1000);} 
            }, 200);}

function mouseClicked(){
    if(clicked2.length == 0){
        const blockX = floor(windowWidth/5);
        const blockY = floor(windowHeight/nimY);
        const arrayX = floor(mouseX/blockX);
        const arrayY = floor(mouseY/blockY);
        if(clicked1.length == 0){
            clicked1.push(arrayY,arrayX);
            timerA = 0;
            setTimerA();
           }
        else{
            if(clicked1[0] !== arrayY || clicked1[1] !== arrayX){
              clicked2.push(arrayY,arrayX);
              timerB = 0;
              setTimerB();
            }
        }
        console.log(clicked1);
        console.log(clicked2);
    }
}
