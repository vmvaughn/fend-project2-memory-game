//Get the ul for the deck in order to set 1 event listener instead of 16
const cardDeck = document.querySelector('.deck');
const numMoves = document.querySelector('.moves');
const restartSymbol = document.querySelector('.restart');
const scoreArray = Array.from(document.getElementsByClassName('fa-star'));
const openList = [];
let countMoves = 0;
let numMatches = 0;


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method above
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 *
 *  Note that shuffling the HTML is really setting the initial class to card only...
 *  ...and moving in the innerHTML in the shuffled array's index position to the same index position in cardList
 */
 function resetCounters() {
     numMoves.textContent = 0;
     countMoves = 0;
     numMatches = 0;
 }

function resetScore() {
    scoreArray[0].classList.remove('hide-star');
    scoreArray[1].classList.remove('hide-star');
}

 function resetCards() {
     resetCounters();
     resetScore();
     const cardArray = shuffle(Array.from(document.getElementsByClassName('card')));
     cardArray.forEach(function(cardData, i) {
     cardArray[i].remove();
     cardDeck.appendChild(cardArray[i]);
     cardArray[i].className = 'card';
      }); 
    } 

function handleOpenListMatch() {
    numMatches++;
    console.log("matches = " + numMatches);
    for (let i = openList.length-1; i >= 0; i--) {
        openList[i].className = 'card match';
        openList.pop();
    }
}

function handleOpenListMismatch() {
    for (let i = openList.length-1; i >= 0; i--) {
        openList[i].className = 'card';
        openList.pop();
    }
}

function runningScore () {
    if (countMoves === 8) {
        console.log("countMoves = " + countMoves);
        scoreArray[0].classList.add('hide-star');
    } 
    else if (countMoves ===11) {
        console.log("countMoves = " + countMoves);
        scoreArray[1].classList.add('hide-star');
    }
}

function incrementMoves() {
  numMoves.textContent = ++countMoves;
  console.log(numMoves.textContent);
  runningScore();
}

function addToOpenList(openCard) {
    openList.push(openCard);
    if (openList.length === 2) {
      incrementMoves();
      if (openList[0].firstElementChild.outerHTML == openList[1].firstElementChild.outerHTML) {
         handleOpenListMatch();  
      } else {
        handleOpenListMismatch();
        }
    }
}

function displaySymbol(event) {
    if ((event.target.nodeName == "LI") && (event.target.className !== 'card match')) {
      event.target.className = 'card open show';
      addToOpenList(event.target);
    }
}

 resetCards();

 cardDeck.addEventListener('click', displaySymbol);
 restartSymbol.addEventListener('click', resetCards);
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
