let box = document.querySelector('.card'),
    playerScore = document.querySelector('.player_score'),
    compScore = document.querySelector('.comp_score');
let down = 6, move = 42, rotate = 0;

box.style.left = `${move}%`;
box.style.top = `${down}%`;

let more = document.querySelector('.more'),
    open = document.querySelector('.open'),
    arr = [6,7,8,9,10,2,3,4,11],
    
    players = {
        one: 0,
        two: 0,
        playerCards: 0,
        compCards: 0,
        compOpen: true,
        suitId: [1,2,3,4]
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

    card.style.left = `42%`;
    card.style.top = `6%`;

    front.classList.add('front');
    card.appendChild(front);
    },
    cardName = (back, randomCard, randomSuit) =>{
        let suit = document.createElement('img'),
            suitReverse = document.createElement('img'),
            suitCenter = document.createElement('img'),
            nameCard = document.createElement('p'),
            nameCardReverse = document.createElement('p');

            suit.classList.add('suit');
            suitReverse.classList.add('suit_reverse');
            suitCenter.classList.add('suit_center');
            nameCard.classList.add('name_card');
            nameCardReverse.classList.add('name_card_reverse');

        let cardSuit = () => {
            randomSuit = Math.floor( Math.random() * 4 ) + 1;
            suit.src = `${randomSuit}.png`;
            suitReverse.src = `${randomSuit}.png`;
            suitCenter.src = `${randomSuit}.png`;
            back.appendChild(suit);
            back.appendChild(suitReverse);
            back.appendChild(suitCenter);
            back.appendChild(nameCard);
            back.appendChild(nameCardReverse);
        }; 

        if (randomCard === 5) {
            nameCard.innerText = 'J';
            nameCardReverse.innerText = 'J';
            cardSuit();
        } else if (randomCard === 6) {
            nameCard.innerText = 'Q';
            nameCardReverse.innerText = 'Q';
            cardSuit();
        } else if (randomCard === 7) {
            nameCard.innerText = 'K';
            nameCardReverse.innerText = 'K';
            cardSuit();
        } else if (randomCard === 8) {
            nameCard.innerText = 'A';
            nameCardReverse.innerText = 'A';
            cardSuit();
        } else {
            nameCard.innerText = arr[randomCard];
            nameCardReverse.innerText = arr[randomCard];
            cardSuit();
        }

    }

    

//Comp
let CompCard = document.createElement('div');
    CompFront = document.createElement('span'),
    CompBack = document.createElement('span'),
    CompRandomSuit = Math.floor( Math.random() * 4 ) + 1,
    openCompCard = () => {
        CompCard = document.createElement('div');
        CompFront = document.createElement('span');
        CompBack = document.createElement('span');
        newCard(CompCard, CompFront);
        
        CompBack.classList.add('back');
        CompCard.appendChild(CompBack);
        cardName(CompBack,CompRandomCard, CompRandomSuit);
        
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
    playerFront = document.createElement('span'),
    playerBack = document.createElement('span'),
    playerRandomSuit = Math.floor( Math.random() * 4 ) + 1,
    suit = document.createElement('img'),
    openPlayerCard = () => {
        playerCard = document.createElement('div');
        playerFront = document.createElement('span');
        playerBack = document.createElement('span');
        newCard(playerCard, playerFront);
        playerBack.classList.add('back');
        playerCard.appendChild(playerBack);
        cardName(playerBack, playerRandomCard, playerRandomSuit);
        
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


