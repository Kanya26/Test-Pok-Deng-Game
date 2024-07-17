const readlineSync = require('readline-sync');

const typeOfPic = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0]; 
let deck = [];

// เริ่มเกม
function startGame(initialChips) {
    let playerChips = initialChips;
    let continuePlaying = true;

    while (continuePlaying) {
        createDeck();
        shuffleDeck();

        const [playerCard1, playerCard2] = dealCards();
        const [dealerCard1, dealerCard2] = dealCards();

        const playerHand = [playerCard1, playerCard2];
        const dealerHand = [dealerCard1, dealerCard2];

        console.log(`You got: ${cardToString(playerHand)}`);
        console.log(`The dealer got: ${cardToString(dealerHand)}`);
        
        continuePlaying = readlineSync.keyInYNStrict('Wanna play more (Yes/No)?');
    }

    console.log(`Game ended. You have ${playerChips} chips.`);
}

// สร้างสำรับไพ่
function createDeck() {
    deck = [];
    for (let suit of typeOfPic) {
        for (let value of cardValues) {
            deck.push({ value, suit });
        }
    }
}

// สลับไพ่
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// แจกไพ่
function dealCards() {
    return [deck.pop(), deck.pop()];
}

//แปลงเป็นชื่อ
function cardToString(hand) {
    return hand.map(card => `${card.suit}-${card.value === 0 ? 'K/Q/J/10' : card.value}`).join(', ');
}

startGame(25);
