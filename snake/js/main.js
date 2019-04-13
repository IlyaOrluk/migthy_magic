//MAP
let map = document.querySelector('.map');

for(let i = 1; i < 101; i++) {
    let block = document.createElement('div');
        block.classList.add('block');
        map.appendChild(block);
}

let x = 1, y = 10,
    block = document.querySelectorAll('.block');
for(let i = 0; i < block.length; i++) {
    if(x > 10){
        x = 1;
        y--;
    }
    block[i].setAttribute('posX', x),
    block[i].setAttribute('posY', y);
    x++;
}

//Map end*//

//Snake
let randomPos = () => {
    posX = Math.floor(Math.random() * 7 + 1 );
    posY = Math.floor(Math.random() * 10 + 1 );
    return [posX, posY];
},
snakePos = randomPos();
snakeBody = [
    document.querySelector(`[posX = '${snakePos[0]}'][posY = '${snakePos[1]}']`),
    document.querySelector(`[posX = '${snakePos[0]+1}'][posY = '${snakePos[1]}']`),
    document.querySelector(`[posX = '${snakePos[0]+2}'][posY = '${snakePos[1]}']`)
],
fillSnake = () => {
    snakeBody.forEach((item, i) => {
            item.classList.add('snake');
    });    
};
fillSnake();

let foodRandomPos = () => {
   let foodPos = randomPos();
    snakeBody.forEach((item, i) => {
            posX = item.getAttribute('posX'),
            posY = item.getAttribute('posY');
            if([posX,posY] == foodPos){
                foodPos = randomPos();
            }
    });
    return foodPos;
},
foodPos, food,
foodPlace = () => {
    foodPos = foodRandomPos();
    food = document.querySelector(`[posX = '${foodPos[0]}'][posY = '${foodPos[1]}']`);
    food.classList.add('food');
};

setTimeout(foodPlace, 100);




let direction = 'right',
    snakeMove = () => {
    let headPos = [snakeBody[snakeBody.length -1].getAttribute('posX'),snakeBody[snakeBody.length -1].getAttribute('posY')],
        tailPos = [snakeBody[0].getAttribute('posX'),snakeBody[snakeBody.length -1].getAttribute('posY')];
    

       let snakeDirection = (condition, dir, dirCarry, eatDirX, eatDirY) => {
            snakeBody[0].classList.remove('snake');

            if(Number(foodPos[0])+eatDirX == Number(headPos[0]) && Number(foodPos[1])+eatDirY == Number(headPos[1])){
                console.log('eat');
                food.classList.remove('food');
                setTimeout(foodPlace, 500);
            } else {
                snakeBody.shift();
            }

            if (condition){
                snakeBody.push(dir);
            } else {
                snakeBody.push(dirCarry);
            } 

            snakeBody.forEach((item, i) => {
                if(i < snakeBody.length-1){
                    posX = item.getAttribute('posX'),
                    posY = item.getAttribute('posY');
                    if (posX == Number(headPos[0])+eatDirX && posY == Number(headPos[1])+eatDirY){
                        console.log('boom');
                    }
                    console.log([posX, posY], headPos);
                }
        });
        },
    snakeMoveDir = {
        right: [
            headPos[0] < 10,
            document.querySelector(`[posX = '${Number(headPos[0])+1}'][posY = '${Number(headPos[1])}']`),
            document.querySelector(`[posX = '${Number(1)}'][posY = '${Number(headPos[1])}']`)

        ],
        left: [
            headPos[0] > 1,
            document.querySelector(`[posX = '${Number(headPos[0])-1}'][posY = '${Number(headPos[1])}']`),
            document.querySelector(`[posX = '${Number(10)}'][posY = '${Number(headPos[1])}']`)
        ],
        up: [
            headPos[1] < 10,
            document.querySelector(`[posX = '${Number(headPos[0])}'][posY = '${Number(headPos[1])+1}']`),
            document.querySelector(`[posX = '${Number(headPos[0])}'][posY = '${Number(1)}']`)
        ],
        down: [
            headPos[1] > 1,
            document.querySelector(`[posX = '${Number(headPos[0])}'][posY = '${Number(headPos[1]-1)}']`),
            document.querySelector(`[posX = '${Number(headPos[0])}'][posY = '${Number(10)}']`)
        ]
    };   
    
    if(direction == 'right'){
        snakeDirection(snakeMoveDir.right[0],snakeMoveDir.right[1],snakeMoveDir.right[2], -1, null);
    } else if(direction == 'left'){
        snakeDirection(snakeMoveDir.left[0],snakeMoveDir.left[1],snakeMoveDir.left[2], +1, null);
    } else if(direction == 'up'){
        snakeDirection(snakeMoveDir.up[0],snakeMoveDir.up[1],snakeMoveDir.up[2], null, -1);
    } else if(direction == 'down'){
        snakeDirection(snakeMoveDir.down[0],snakeMoveDir.down[1],snakeMoveDir.down[2], null, 1);
    }
    

    fillSnake();
};
setInterval(snakeMove, 100);

window.addEventListener('keydown', (e) =>{
    if(e.keyCode == 37) {
        if(direction != 'right'){
            direction = 'left';
        }
    } else if(e.keyCode == 38) {
        if(direction != 'down'){
            direction = 'up';
        }
    } else if(e.keyCode == 39) {
        if(direction != 'left'){
            direction = 'right';
        }
    } else if(e.keyCode == 40) {
        if(direction != 'up'){
            direction = 'down';
        }
    }
});


