let box = document.querySelector('.card'),
    playerScore = document.querySelector('.player_score'),
    compScore = document.querySelector('.comp_score');
let down = 6, move = 50, rotate = 0;
console.log(playerScore);
console.log(compScore);

box.style.left = `${move}%`;
box.style.top = `${down}%`;


    


let more = document.querySelector('.more'),
    open = document.querySelector('.open');
let arr = [6,7,8,9,10,2,3,4,11],
    
    players = {
        one: 0,
        two: 0,
        playerCards: 0,
        compCards: 0,
        compOpen: true
    },

    restart = () => {
    let cards = document.querySelectorAll('.card');
            cards.forEach(function(item) {
                document.body.removeChild(item);
            });
            playerScore.innerText = `Your score: 0`;
            players.one = 0;
            players.two = 0;
            players.compCards = 0;
            players.playerCards = 0;

    },
    
    newCard = (card, front) => {
    card.classList.add('card');
    document.body.appendChild(card);

    card.style.left = `50%`;
    card.style.top = `6%`;

    front.classList.add('front');
    card.appendChild(front);

    2
};

//Comp
let CompCard = document.createElement('div');
let CompFront = document.createElement('span');
let CompBack = document.createElement('span');
let openCompCard = () => {
    CompCard = document.createElement('div');
    CompFront = document.createElement('span');
    CompBack = document.createElement('span');
    newCard(CompCard, CompFront);
    
    CompBack.classList.add('back');
    CompCard.appendChild(CompBack);
    CompBack.innerText = arr[CompRandomCard];

    if (CompRandomCard === 5) {
        CompBack.innerText = 'J';
    } else if (CompRandomCard === 6) {
        CompBack.innerText = 'Q';
    } else if (CompRandomCard === 7) {
        CompBack.innerText = 'K';
    } else if (CompRandomCard === 8) {
        CompBack.innerText = 'A';
    } else {
        CompBack.innerText = arr[CompRandomCard];
    }
    
    
    
    
    
    let rotateCard = () =>{

        move = 60;
        down = 50;
    
        players.compCards += 1;
        for(let i = 1; i < players.compCards; i++){
            move += 1.5;
        }
       if (players.compOpen == true){
            CompFront.style.transform = `rotateX(180deg)`;
            CompBack.style.transform = `rotateX(360deg)`;
            // players.compOpen = false;
       }
        CompCard.style.left = `${move}%`;
        CompCard.style.top = `${down}%`;
        CompCard.style.transform = `rotateZ(360deg)`;


    };
    setTimeout(rotateCard, 300);
};
    

//Player
let playerCard = document.createElement('div');
let playerFront = document.createElement('span');
let playerBack = document.createElement('span');
let openPlayerCard = () => {
    playerCard = document.createElement('div');
    playerFront = document.createElement('span');
    playerBack = document.createElement('span');
    newCard(playerCard, playerFront);
    playerBack.classList.add('back');
    playerCard.appendChild(playerBack);

    if (playerRandomCard == 5) {
        playerBack.innerText = 'J';
    } else if (playerRandomCard == 6) {
        playerBack.innerText = 'Q';
    } else if (playerRandomCard == 7) {
        playerBack.innerText = 'K';
    } else if (playerRandomCard == 8) {
        playerBack.innerText = 'A';
    } else {
        playerBack.innerText = arr[playerRandomCard];
    }

    let rotateCard = () =>{
        
        move = 20;
        down = 50;
    
        players.playerCards += 1;
        for(let i = 1; i < players.playerCards; i++){
            move += 1.5;
        }
        playerCard.style.left = `${move}%`;
        playerCard.style.top = `${down}%`;
        playerFront.style.transform = `rotateX(180deg)`;
        playerBack.style.transform = `rotateX(360deg)`;
        playerCard.style.transform = `rotateZ(360deg)`;

    };
    setTimeout(rotateCard, 300);
};


let CompRandomCard = Math.floor( Math.random() * 9 );
let playerRandomCard = Math.floor( Math.random() * 9 );

//MORE
more.addEventListener('click', () => {
    CompRandomCard = Math.floor( Math.random() * 9 );
    playerRandomCard = Math.floor( Math.random() * 9 );
    players.one += arr[playerRandomCard];
    console.log('P1score: ' + players.one);
    playerScore.innerText = `Your score: ${players.one}`;

    setTimeout(openPlayerCard, 100);
    
    
    if (players.two <= 17) {
        players.two += arr[CompRandomCard];
        setTimeout(openCompCard, 300);
        console.log('P2score: ' + players.two);
    } else {
        return '';
    }
});


//Open
let getWinner = () => {
    if(players.two > 21 && players.one > 21){
        setTimeout(alert('DRAW!=)'), 1000);
        setTimeout(restart, 1000);
    } else if(players.two == 21 && players.one == 21){
        setTimeout(alert('DRAW!=)'), 1000);
        setTimeout(restart, 1000);
    } else if(players.one > 21){
        setTimeout(alert('You lose, Comp score: ' + players.two), 1000);
        setTimeout(restart, 1000);
    } else if(players.two > 21){
        setTimeout(alert('You WIN!, Comp score: ' + players.two), 1000);
        setTimeout(restart, 1000);
    } else if(players.one == 21) {
        setTimeout(alert('21! You WIN!, Comp score: ' + players.two), 1000);
        setTimeout(restart, 1000);
    } else if(players.two == 21) {
        setTimeout(alert('Comp WIN!, Comp score: ' + players.two + '!'), 1000);
        setTimeout(restart, 1000);
    } else if(players.two > players.one){
        setTimeout(alert('Comp WIN!, Comp score: ' + players.two), 1000);
        setTimeout(restart, 1000);
    } else if(players.two < players.one){
        setTimeout(alert('You WIN!, Comp score: ' + players.two), 1000);
        setTimeout(restart, 1000);
    }  else if(players.two == players.one){
        setTimeout(alert('DRAW! :)'), 1000);
        setTimeout(restart, 1000);
    }
};

let openComp = () => {
            players.compOpen = true;
            CompRandomCard = Math.floor( Math.random() * 9 );
            openCompCard();
            players.two += arr[CompRandomCard];
            console.log('P2score: ' + players.two);
            if (players.two > 18) {
                clearInterval(autoOpen);
                setTimeout(getWinner, 1000);
            }
},
    autoOpen = null;
open.addEventListener('click', () => { 
    if (players.two < 18){
    autoOpen = setInterval(openComp, 1000);
    } else {
        setTimeout(getWinner, 1000);
    }
        
});


