var lost = true;
var colors = [document.getElementById('green'),document.getElementById('red'),document.getElementById('yellow'),document.getElementById('blue')]
var sounds = [new Audio('sounds/green.mp3'),new Audio('sounds/red.mp3'),new Audio('sounds/yellow.mp3'),new Audio('sounds/blue.mp3')]
var wrongSound = new Audio('sounds/wrong.mp3')

var playerCanPlay = false;
var gameLength = 0;
var playerTurn = 0;
0

var order = [];



colors[0].addEventListener('click',()=>{
    clickEvent(0)
})
colors[1].addEventListener('click',()=>{
    clickEvent(1)
})
colors[2].addEventListener('click',()=>{
    clickEvent(2)
})
colors[3].addEventListener('click',()=>{
    clickEvent(3)
})

function clickEvent(ind){

    colors[ind].classList.add('pressAnimation');
    setTimeout(()=>{
        colors[ind].classList.remove('pressAnimation');
    },400)



    if (lost==false && playerCanPlay){
        if (playerTurn<gameLength){
            console.log(playerTurn,gameLength)
            


            if (ind == order[playerTurn]){
                sounds[ind].play();
                playerTurn+=1
                if (playerTurn == gameLength){
                    setTimeout(nextLevel, 500);
                    
                }
            }
            else{
                wrongSound.play();
                lost = true;
                lostScreen();
            }

        }
    }

}

function nextLevel(){
    playerCanPlay = false;
    let a = colorPicker();
    order.push(a);
    colors[a].style.opacity = '0';
    setTimeout(()=>{
        colors[a].style.opacity = '1';
    },300);
    sounds[a].play();
    gameLength+=1;
    playerTurn = 0;
    playerCanPlay = true;
    document.getElementById('level-title').innerHTML = 'level:' + gameLength.toString();
}


/*

for (var i = 0;i<4;i++){
    let a = i;
    colors[i].addEventListener('click',function(e){
        alert(i)
        if (playerTurn<gameLength){
            if (i == order[playerTurn]){
                playerTurn+=1
            }
            else{
                lost = true;
                lostScreen();
            }

        }
    })
}*/

function lostScreen(){
    lost = true;
    document.getElementById('level-title').innerHTML = 'Game over press any key to restart';
    document.querySelector('body').classList.add('game-over');
    setTimeout(() => {
        document.querySelector('body').classList.remove('game-over');

    }, 500);

}

function colorPicker(){
    return Math.floor(Math.random()*4)
}



function gameLoop(){
    
    lost = false;
    gameLength = 0;
    order = [];
    nextLevel();


}

document.querySelector('html').addEventListener("keypress",function() {
    if(lost){
        gameLoop();
    }

})

