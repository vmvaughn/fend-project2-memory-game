//Get the ul for the deck in order to set 1 event listener instead of 16
const cardDeck = document.querySelector('.deck');


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    console.log("Entered shuffle function");
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
//        console.log("randomIndex = " + randomIndex + array[randomIndex].innerHTML, "currentIndex = " + currentIndex + array[currentIndex].innerHTML);
    }

    return array;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 *
 *  Note that shuffling the HTML is really setting the initial class to card only...
 *  ...and moving in the innerHTML in the shuffled array's index position to the same index position in cardList
 */
 function resetCards() {
     //build current Nodelist of card class to shuffle.
     const cardList = document.getElementsByClassName('card');
     const cardArray = shuffle(Array.from(cardList));
     cardArray.forEach(function(cardData, i) {
       console.log('from cardData', i, cardData.innerHTML);
       cardList[i].className = "card open show";
      }); //end of anonymous function
    } //end of resetCards 


function displaySymbol(event) {
    console.log('card clicked');
    console.log(event.path[0].outerHTML);
}

 resetCards();

 cardDeck.addEventListener('click', displaySymbol);
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
