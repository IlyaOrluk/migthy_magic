let playerScore = document.querySelector('.player_score'),
    compScore = document.querySelector('.comp_score'),
    down = 6, move = 42, rotate = 0,
    more = document.querySelector('.more'),
    open = document.querySelector('.open'),
    data = {
        cardList: [],
        one: 0,
        two: 0,
        playerCards: 0,
        compCards: 0,
        compOpen: true
    },
    playerRandomCard = Math.floor( Math.random() * data.cardList.length ),
    CompRandomCard = Math.floor( Math.random() * data.cardList.length ),
    cardsList = () => {
        data.cardList = [
            [6,1],[7,1],[8,1],[9,1],[10,1],[2,1],[3,1],[4,1],[11,1], //hearts <3
            [6,2],[7,2],[8,2],[9,2],[10,2],[2,2],[3,2],[4,2],[11,2], //peaks <3<
            [6,3],[7,3],[8,3],[9,3],[10,3],[2,3],[3,3],[4,3],[11,3], //baptize +
            [6,4],[7,4],[8,4],[9,4],[10,4],[2,4],[3,4],[4,4],[11,4] //diamonds <>
        ];
    };
    cardsList();

    restart = () => {
    let cards = document.querySelectorAll('.card');
            cards.forEach(function(item) {
                document.body.removeChild(item);
            });
            playerScore.innerText = `Your score: 0`;
            compScore.innerText = `Comp score: 0`;
            data.one = 0;
            data.two = 0;
            data.compCards = 0;
            data.playerCards = 0;
            cardsList();

    },
    
    newCard = (card, front) => {
    card.classList.add('card');
    document.body.appendChild(card);

    card.style.left = `42%`;
    card.style.top = `6%`;

    front.classList.add('front');
    card.appendChild(front);
    },
    playerPlusScore = (randomCard) => {
        data.one += data.cardList[randomCard][0];
        playerScore.innerText = `Your score: ${data.one}`;
    },
    CompPlusScore = (randomCard) => {
        data.two += data.cardList[randomCard][0];
        compScore.innerText = `Comp score: ${data.two}`;
    },
    cardName = (back, randomCard) =>{
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
            suit.src = `${data.cardList[randomCard][1]}.png`;
            suitReverse.src = `${data.cardList[randomCard][1]}.png`;
            suitCenter.src = `${data.cardList[randomCard][1]}.png`;
            back.appendChild(suit);
            back.appendChild(suitReverse);
            back.appendChild(suitCenter);
            back.appendChild(nameCard);
            back.appendChild(nameCardReverse);
        }; 

        if (data.cardList[randomCard][0] == 2) {
            nameCard.innerText = 'J';
            nameCardReverse.innerText = 'J';
            cardSuit();
        } else if (data.cardList[randomCard][0] == 3) {
            nameCard.innerText = 'Q';
            nameCardReverse.innerText = 'Q';
            cardSuit();
        } else if (data.cardList[randomCard][0] == 4) {
            nameCard.innerText = 'K';
            nameCardReverse.innerText = 'K';
            cardSuit();
        } else if (data.cardList[randomCard][0] == 11) {
            nameCard.innerText = 'A';
            nameCardReverse.innerText = 'A';
            cardSuit();
        } else {
            nameCard.innerText = data.cardList[randomCard][0];
            nameCardReverse.innerText = data.cardList[randomCard][0];
            cardSuit();
        }
        data.cardList.splice(randomCard, 1);
        console.log(data.cardList);
        console.log(data.one);
        console.log(data.two);
    },
    getWinner = () => {
        if(data.two > 21 && data.one > 21){
            setTimeout(alert('DRAW!=)'), 1000);
            setTimeout(restart, 1000);
        } else if(data.two == 21 && data.one == 21){
            setTimeout(alert('DRAW!=)'), 1000);
            setTimeout(restart, 1000);
        } else if(data.one > 21){
            setTimeout(alert('You lose, Comp score: ' + data.two), 1000);
            setTimeout(restart, 1000);
        } else if(data.two > 21){
            setTimeout(alert('You WIN!, Comp score: ' + data.two), 1000);
            setTimeout(restart, 1000);
        } else if(data.one == 21) {
            setTimeout(alert('21! You WIN!, Comp score: ' + data.two), 1000);
            setTimeout(restart, 1000);
        } else if(data.two == 21) {
            setTimeout(alert('Comp WIN!, Comp score: ' + data.two + '!'), 1000);
            setTimeout(restart, 1000);
        } else if(data.two > data.one){
            setTimeout(alert('Comp WIN!, Comp score: ' + data.two), 1000);
            setTimeout(restart, 1000);
        } else if(data.two < data.one){
            setTimeout(alert('You WIN!, Comp score: ' + data.two), 1000);
            setTimeout(restart, 1000);
        }  else if(data.two == data.one){
            setTimeout(alert('DRAW! :)'), 1000);
            setTimeout(restart, 1000);
        }
    },
    openComp = () => {
            data.compOpen = true;
            openCompCard();
                if (data.two > 18) {
                    clearInterval(autoOpen);
                    setTimeout(getWinner, 1000);
                }
    };

//Comp
    openCompCard = () => {
    let CompCard = document.createElement('div');
        CompFront = document.createElement('span');
        CompBack = document.createElement('span');
        newCard(CompCard, CompFront);
        
        CompBack.classList.add('back');
        CompCard.appendChild(CompBack);
        CompRandomCard = Math.floor( Math.random() * data.cardList.length );
        cardName(CompBack ,CompRandomCard, CompPlusScore(CompRandomCard));
        
        let rotateCard = () =>{
            move = 60;
            down = 50;
        
            data.compCards += 1;
            for(let i = 1; i < data.compCards; i++){
                move += 1.5;
            }
        if (data.compOpen == true){
                CompFront.style.transform = `rotateX(180deg)`;
                CompBack.style.transform = `rotateX(360deg)`;
                // data.compOpen = false;
        }
        CompCard.style.left = `${move}%`;
        CompCard.style.top = `${down}%`;
        CompCard.style.transform = `rotateZ(360deg)`;


    };
    setTimeout(rotateCard, 300);
};
    
//Player
    openPlayerCard = () => {
    let playerCard = document.createElement('div');
        playerFront = document.createElement('span');
        playerBack = document.createElement('span');
        newCard(playerCard, playerFront);

        playerBack.classList.add('back');
        playerCard.appendChild(playerBack);
        playerRandomCard = Math.floor( Math.random() * data.cardList.length );
        cardName(playerBack, playerRandomCard, playerPlusScore(playerRandomCard));
        
        let rotateCard = () =>{
            move = 20;
            down = 50;
        
            data.playerCards += 1;
            for(let i = 1; i < data.playerCards; i++){
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

//MORE
more.addEventListener('click', () => {
    

    setTimeout(openPlayerCard, 100);
    
    if (data.two <= 17) {
        setTimeout(openCompCard, 300);
    } else {
        return '';
    }
});
//OPEN
let autoOpen = null;
open.addEventListener('click', () => { 
    if (data.two < 18){
    autoOpen = setInterval(openComp, 1000);
    } else {
        setTimeout(getWinner, 1000);
    }   
});

