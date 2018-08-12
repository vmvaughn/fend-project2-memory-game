//Global constants and variables
const cardDeck = document.querySelector('.deck');
const numMoves = document.querySelector('.moves');
const restartSymbol = document.querySelector('.restart');
const scoreArray = Array.from(document.getElementsByClassName('star-panel'));
const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const container = document.querySelector('.container');
const openList = [];
const modal = document.querySelector('#overlay');
const modalDisplayArea = document.querySelector('#overlay div');
const gameMinutes = document.querySelector('.duration-minutes');
const gameSeconds = document.querySelector('.duration-seconds');
const gameScore = Array.from(document.getElementsByClassName('star-modal'));
let countMoves = 0;
let numMatches = 0;
let totalSeconds = 0;
let priorEvent = "";
let intervalId = 0;
let timeoutID = 0;

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

function stopClock() {
  clearInterval(intervalId);
}

/*Thank you to John Henshaw who provided the idea and code samples to build a modal overlay in his blog post, 
 https://raventools.com/blog/create-a-modal-dialog-using-css-and-javascript/ */
function showModal() {
  modal.style.visibility = 'visible';
}

function hideModal() {
  modal.style.visibility = 'hidden';
}

/*stop the game clock and move game time and score into modal; show modal */
function stopGame() {
  stopClock();
  gameMinutes.textContent = minutesLabel.textContent;
  gameSeconds.textContent = secondsLabel.textContent;
  for (let i = scoreArray.length-1; i >= 0; i--) {
    if (scoreArray[i].classList.contains('hide-star')) {
      gameScore[(gameScore.length-1)-i].classList.add('hide-star');
    } 
  }
  showModal(); 
}

/*Display a running clock 

Note - the setTime and pad functions below are from https://stackoverflow.com/a/5517836, 
  answered by chandu, profile at https://stackoverflow.com/users/527185/chandu */
function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function resetClock() {
    clearInterval(intervalId);
    totalSeconds = 0;
    secondsLabel.innerHTML = pad(0);
    minutesLabel.innerHTML = pad(0);
    intervalId = setInterval(setTime, 1000);
}

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
     const cardArray = shuffle(Array.from(document.getElementsByClassName('card')));
     cardArray.forEach(function(cardData, i) {
     cardArray[i].remove();
     cardDeck.appendChild(cardArray[i]);
     cardArray[i].className = 'card';
      }); 
    } 

function handleOpenListMatch() {
    numMatches++;
    for (let i = openList.length-1; i >= 0; i--) {
        openList[i].className = 'card match';
        openList.pop();
    }
    if (numMatches === 8) {
      stopGame();
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
        scoreArray[0].classList.add('hide-star');
    } 
    else if (countMoves === 11) {
        scoreArray[1].classList.add('hide-star');
    }
}

function incrementMoves() {
  numMoves.textContent = ++countMoves;
  runningScore();
}

function addToOpenList(openCard) {
    openList.push(openCard);
    if (openList.length === 2) {
      incrementMoves();
      if (openList[0].firstElementChild.outerHTML == openList[1].firstElementChild.outerHTML) {
        /* add if condition here to call function to handle all matched */
        handleOpenListMatch();  
      } else {
         openList[0].className = 'card open show mismatch';
         openList[1].className = "card open show mismatch";
         timeoutID = setTimeout(handleOpenListMismatch, 500);
        }
    }
}

function displaySymbol(event) {
  if ((priorEvent !== event.target) || (openList.length === 0)) {
    if ((event.target.nodeName == "LI") && (event.target.className !== 'card match')) {
      event.target.className = 'card open show';
      priorEvent = event.target;
      addToOpenList(event.target);
    }
  }
}

function resetGame() {
  resetCounters();
  resetScore();
  resetCards();
  resetClock();
  hideModal();
  handleOpenListMismatch();

}

 resetGame();

 cardDeck.addEventListener('click', displaySymbol);
 restartSymbol.addEventListener('click', resetGame);
 modalDisplayArea.addEventListener('click', resetGame);
