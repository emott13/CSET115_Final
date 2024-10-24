// Notes for review Friday/Weekend: Review Video, find out index so you can use it, finish functionality,
// rewrite it to make sure you understand it make it better, add player selector (Player 1 can choose X or O)
// collab on html and css




// Saved variables that are needed
window.addEventListener('DOMContentLoaded', () => {
const data = Array.from(document.querySelectorAll('.celldata'))

let score1 = 0
let score2 = 0 
let tie = 0
const winningConditions = [ [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6] ]

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';
const endmessage = document.getElementById("endtext");

// allows system to check if the cell has been clicked or not
const isValidAction = (data) => {
    if (data.innerText === 'X' || data.innerText === 'O'){
        return false;
    }   
    else return true;
}


// allows system to automatically change user input 
const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`)
    currentPlayer = currentPlayer === 'X' ? 'O': 'X' 
        //  Look up how ^ this line ^ works becasue you dont understand it yet
    playerDisplay.innerText = currentPlayer
    playerDisplay.classList.add(`player${currentPlayer}`)
}


// allows system to print final message to user on the result of the game: Review switch functions
const printmessage = (type) => {
    switch(type){
        case 'PLAYERO_WON':
            endmessage.innerHTML = 'Player O Won!'
            score2++
        break;

        case 'PLAYERX_WON':
            endmessage.innerHTML = 'Player X won!'
            score1++
        break;

        case 'TIE':
            endtext.innerText = 'It was a Tie!'
        }
        endmessage.classList.remove('hide')
    }


// function that lets you grab values froM the different cells, and prints message accordingly: See 8:31 in the video to understand this
    function resultCalc() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
          const winCondition = winningConditions[i];
          const a = board[winCondition[0]];
          const b = board[winCondition[1]];
          const c = board[winCondition[2]];
          if (a === "" || b === "" || c === "") {
            continue;
          }
          if (a === b && b === c) {
            roundWon = true;
            break;
          }
        }
      
        if (roundWon) {
          printmessage(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
          isGameActive = false;
          return;
        }
      
        if (!board.includes("")) printmessage(TIE);
      }
      
      const userAction = (data, index) => {
        if (isValidAction(data) && isGameActive) {
            data.innerText = currentPlayer;
            data.classList.add(`player${currentPlayer}`)
            updateBoard(index)
            resultCalc()
            changePlayer()
        }
      }
    

    data.forEach( (data, index) => {
    data.addEventListener('click', () => userAction(data, index))
    })



});



