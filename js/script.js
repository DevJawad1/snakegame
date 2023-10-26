let inputDir = {x:0, y:0}
let foodSound=new Audio('food.mp3')
let gameOversound=new Audio('gameOver.mp3')
let moveSound=new Audio('move.mp3')
let musicSound=new Audio('music.mp3')
let speed = 5
let saveSpeed = 5
let score = 0


// setting game Level

const easy=()=>{
    speed=2
    saveSpeed=2
}
const medium=()=>{
    speed=5
    saveSpeed=5
}
const hard=()=>{
    speed=8
    saveSpeed=8
}
const veryHard=()=>{
    speed=10
    saveSpeed=10
}
let lastPaintTime = 0
let snakeArr=[
    {x:13,y:15}
]
let food ={x:6,y:7}
// game function

const pause=()=>{
    if(gameMode.innerHTML=='Pause'){
        speed=0
        gameMode.innerHTML="Play"
    }
    else if(gameMode.innerHTML=="Play"){
        speed=saveSpeed
        gameMode.innerHTML="Pause"
        // let levelBtn=document.querySelectorAll('.levelBtn')

        // for (let index = 0; index < levelBtn.length; index++) {
        //     levelBtn[index].style.display="none"
        //     // console.log(levelBtn[index]);
        // }
    }
}
function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return
    }
    lastPaintTime=ctime
    gameEngine()
}
function isCollide(snake){
    for (let i = 1; i< snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true
        } 
    }
    if(snake[0].x >=18 || snake[0].x <=0 && snake[0].y >=18 || snake[0].y<=0){
        return true
    }
}
function gameEngine(){
    // snake Array
    if(isCollide(snakeArr)){
        // gameOversound.play()
        // musicSound.pause()
        inputDir={x:0, y:0}
        alert('Game over, press any key to begin')
        snakeArr =[{x:13, y:15}]
        // musicSound.play()
        
        score=0
    }

    if(snakeArr[0].y==food.y && snakeArr[0].x===food.x){
        foodSound.play()
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y})
        let a=2
        let b=16
        food={x:Math.round(a + (b-a)* Math.random()) , y:Math.round(a + (b-a)* Math.random())}
    }

    for(let i=snakeArr.length-2; i>=0; i--){
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].x +=inputDir.x
    snakeArr[0].y +=inputDir.y

    board.innerHTML=""
    snakeArr.forEach((e,index)=>{
      snakeElement = document.createElement('div')
      snakeElement.style.gridRowStart= e.y
      snakeElement.style.gridColumnStart=e.x
      if(index===0){
        snakeElement.classList.add('head')
      }
      else{
          snakeElement.classList.add('snake')
      }
      board.appendChild(snakeElement)
    })

    foodElement = document.createElement('div')
    foodElement.style.gridRowStart= food.y
    foodElement.style.gridColumnStart=food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}





window.requestAnimationFrame(main)
window.addEventListener('keydown', e=>{
    inputDir = {x:0, y:1}
    // moveSound.play()
    switch (e.key) {
        case "ArrowUp":
           console.log("ArrowUp"); 
           inputDir.x= 0;
           inputDir.y= -1;
            break;
        case "ArrowDown":
           console.log("ArrowDown"); 
           inputDir.x= 0;
           inputDir.y= 1;
            break;
        case "ArrowLeft":
           console.log("ArrowLeft"); 
           inputDir.x= -1;
           inputDir.y= 0;
            break;
        case "ArrowRight":
           console.log("ArrowRight");
           inputDir.x= 1;
           inputDir.y= 0; 
            break;
        default:
            break;
    }
})
const up=()=>{
    inputDir.x= 0;
    inputDir.y= -1;
}

const down=()=>{
    inputDir.x= 0;
    inputDir.y= 1;
}

const left=()=>{
    inputDir.x= -1;
    inputDir.y= 0;
}

const right=()=>{
    inputDir.x= 1;
    inputDir.y= 0;
}