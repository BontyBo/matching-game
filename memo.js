//Yanabhat Sakdee 6601012620089
//Multiplayer Hint Timer
//add difficulty level
//double pair game mode
let clicked1 = [];
let clicked2 = [];
let board = [];
let paired = [];

//Selection Here
let difficulty = "normal"; //easy normal hard
let double_pair = "enable"; //disable and enable
let multiPlayer = true;

let nummY;
let numpair;
let current_player = "player 1"; //other player is player 2
let resolved = false;

let hint_available = false;
let hint;
let shortest;
let show_hint = false;

let timer = 0;
let second;

if(difficulty == "easy"){nummY = 2;}
else if (difficulty == "hard"){nummY = 8;}
else{nummY = 4;}

if(double_pair == "disable"){numpair = 2;}
else{numpair = 4;}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('white');
    frameRate(50);
    let numbers = [];
    let start_num = 1;
    while(numbers.length < nummY*5){
      for(let i = 0; i < numpair; i++){
        numbers.push(start_num);
      }
      start_num = start_num +1;
    }
    for(let i = 0; i<nummY; i++){
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
    fill('white');
    rect(0,0,windowWidth,windowHeight);
    textAlign(CENTER, CENTER);
    textSize(20);
    let text1;
    let text2;
    const blockX = floor(windowWidth/5);
    const blockY = floor((windowHeight*0.9)/nummY);
    fill('black');
    for(let i=1; i<5; i++){
        line(i*windowWidth/5, windowHeight/10, i*windowWidth/5, windowHeight);
    }
    
    line(0, windowHeight/10, windowWidth, windowHeight/10);
    
    if(hint_available){fill('white');}
    else{fill('grey');}
    rect(20,20, windowWidth/20 , windowHeight*0.05);
    
    fill('black');
    text("hint", (20+windowWidth/20)/2, (20+windowHeight*0.05)/2);
    
    second = floor((timer/50)%60);
    minute = floor((second/60)%60);
    text(second.toString(), windowWidth/2+windowWidth/50, windowHeight/20);
    text(minute.toString(), windowWidth/2-windowWidth/50, windowHeight/20);
    text(":", windowWidth/2, windowHeight/20);
    timer = timer+1;
    
    if(multiPlayer){text(`Current Player : ${current_player}`, windowWidth/2+windowWidth/5, windowHeight/20);}
    
    if(show_hint){text(`The closest is within ${shortest} grid(s)`, windowWidth/2-windowWidth/5, windowHeight/20);}
    
    for(let i=1; i<nummY; i++){
        line(0, i*blockY+windowHeight/10, windowWidth, i*blockY+windowHeight/10);
    }
    if(clicked1.length!=0){
        text1 = board[clicked1[0]][clicked1[1]];
        text(text1.toString(), clicked1[1]*blockX+blockX/2, clicked1[0]*blockY+blockY/2+windowHeight/10);
    }
    if(clicked2.length!=0){
        text2 = board[clicked2[0]][clicked2[1]];
        text(text2.toString(), clicked2[1]*blockX+blockX/2, clicked2[0]*blockY+blockY/2+windowHeight/10);
        resolve_click(text1, text2);
    }
    paired.map((axis) => {
        const numshow = board[axis[0]][axis[1]].toString();
        text(numshow, axis[1]*blockX+blockX/2, axis[0]*blockY+blockY/2+windowHeight/10);
    });
}

function resolve_click(text1, text2){
    if(resolved == false){
      if(text1 == text2){
        paired.push([clicked1[0],clicked1[1]]);
        paired.push([clicked2[0],clicked2[1]]);}
      else if(text1 != text2){current_player = (current_player == "player 1") ? "player 2" : "player 1";}
      resolved = true;
      hint_available = false;
    }
}

function mouseClicked(){
    //Handle Click at Hint button (May unfinished/ If something happens, remove this to run properly)
    if((20<mouseY) && (mouseY < windowHeight*0.075) && (20 < mouseX) && (mouseX < windowWidth/15)){
      //Check table with clicked 1 text to find differences and show
      if(hint_available){
        hint_available = false;
        shortest = 20;
        let leftpair = numpair;
        let y = clicked1[0];
        let x = clicked1[1];
        for(let i = 0; i<nummY; i++){
          if(leftpair == 0){break;}
          for(let j = 0; j<5; j++){
            if(leftpair == 0){break;}
            if(y == i && x == j){ //if same spot
              leftpair = leftpair-1;
              continue;}
            else if(board[i][j] == board[y][x]){
              let in_paired = false;
              leftpair = leftpair - 1;
              for(let k = 0; k< paired.length; k++){
                if(paired[k][0] == i && paired[k][1] == j){
                  in_paired = true;
                  break;
                }
              }
              if(!in_paired){
                let temp_min = floor(sqrt((i-y)**2 + (x-j)**2)); //y, x = clicked1   i, j = check
                if(temp_min < shortest){
                shortest = temp_min;
                show_hint = true;
                setTimeout(() => {show_hint = false;}, 3000);}
              }
            }
          }
        }
      }
  }
    
    //Handle Click at Board
    if(mouseY > 0.1*windowHeight){
      if(clicked2.length == 0){
          const blockX = floor(windowWidth/5);
          const blockY = floor((windowHeight*0.9)/nummY);
          const arrayX = floor(mouseX/blockX);
          const arrayY = floor((mouseY-0.1*windowHeight)/blockY);
          let same_spot = false;
          for(let i = 0; i< paired.length; i++){
              if(paired[i][0] == arrayY && paired[i][1] == arrayX){
                same_spot = true;
                break;
              }
            }
          if(!same_spot){
            if(clicked1.length == 0){
            clicked1.push(arrayY,arrayX);
            hint_available = true;}
            else if (clicked1[0] != arrayY || clicked1[1] != arrayX){
              clicked2.push(arrayY,arrayX);
              setTimeout(() => {
                  clicked1 = [];
                  clicked2 = [];
                  resolved = false;
                  console.log("clicked reset")
              },1000);
            }
          }
          console.log(clicked1);
          console.log(clicked2);
      }
    }
}
