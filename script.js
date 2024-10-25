// Notes for review Friday/Weekend: Review Video, find out index so you can use it, finish functionality,
// rewrite it to make sure you understand it make it better, add player selector (Player 1 can choose X or O)
// collab on html and css

//FRIDAY: integrate our functions together to finish game functionality, start with changing const data
//on line 136 from .celldata to .cell like we talked about, because of removing <a> tags


const playerOption = [                                                            //defines question and options for later radio buttons
  {
      question: 'Player 1, choose your character:',
      option:['X', 'O']
  }
]

let currentIndex = 0;
let currentPlayer = [];
let turn = currentPlayer[0]

if(document.readyState === 'loading'){                                            //calls startGame function when page loads
  document.addEventListener('DOMContentLoaded', startGame)
}
else{
  startGame()
}

//--------------
//START THE GAME
//--------------

function startGame() {
  let askP1 = playerOption[currentIndex];
  console.log(askP1.question);
  string = askP1.question
  print(string);

  let optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  askP1.option.forEach((option, index) => {                                       //creates radio buttons
      optionsContainer.innerHTML += `
          <div>
              <input type="radio" name="option" id="option${index}" value="${option}">
              <label for="option${index}" id="text">${option}</label>
          </div>
      `;
  });
  optionsContainer.innerHTML += `
      <button id="submit">Submit</button>                                         
      `;                                                                          //creates submit button
  document.getElementById('submit').addEventListener('click', submit)
}

//---- Print player instructions ----

function print(string){
  let timePerChar = 80;
  let textContainer = document.getElementById('choice');
  textContainer.textContent = '';
  let i = 0;
  const main = () => {
    if (i < string.length){
    let char = string[i];
    textContainer.textContent += char
    i++
    setTimeout(main, timePerChar);
    }
  };
  main();
};

//---- Player X or O choice ----

function submit(){
  let choice = document.querySelector('input[name="option"]:checked');
  let answer = choice.value
  if(!answer){
      return;
  }
  switch (answer) {
      case "X":
          player1 = answer
          player2 = 'O'
          break;


      case "O":
          player1 = answer
          player2 = 'X'    
  }
  currentPlayer.push(player1);
  currentPlayer.push(player2);
  document.getElementById('playerChoice').innerHTML = '';                           //removes choice so player cannot change during game
  document.getElementsByClassName('turn')[0].classList = 'turn true'
  buildBoard();
};

//Building the board
function buildBoard(){
  let gameContainer = document.getElementById('theGame')
  let boardContainer = document.createElement('div');
  boardContainer.classList = 'cellContainer'

  gameContainer.appendChild(boardContainer);


  for(let i = 0; i < 9; i++){                                                       //creates cells for the board
      let square = document.createElement('div');
      square.className = 'cell';
      boardContainer.appendChild(square);

      // let cell = document.getElementsByClassName('cell')[i];
     
      square.addEventListener('click', (event) => {                                   //adds eventListener when cell is created
          let currentCell = event.target
          // console.log(cell)
          
          if(currentCell.innerHTML !== ''){
              return;
          }
          turn = (turn === currentPlayer[0]) ? currentPlayer[1] : currentPlayer[0];

          let player = document.getElementsByClassName('turn');
          if(turn === currentPlayer[0]){
            player[1].classList = 'turn true';
            player[0].classList = 'turn';
          }
          else{
            player[1].classList = 'turn';
            player[0].classList = 'turn true';
          }

          let item = document.createElement('p');
          item.classList = ('celldata');
          currentCell.appendChild(item);
          item.innerText = turn;                                                    //sets innerText to X or O when 

          board[i] = turn;
          resultCalc();

      });                                                                           //clicked depending on player turn
  };      
};

// Saved variables that are needed



let score1 = 0
let score2 = 0 
let tie = 0
const winningConditions = [ [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6] ]

let board = ['', '', '', '', '', '', '', '', ''];
// let currentPlayer = 'X';
// let currentPlayer = 'X';
let isGameActive = true;

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';
const endmessage = document.getElementById("endMessage");

// allows system to check if the cell has been clicked or not
const isValidAction = (data) => {
    if (data.innerText === 'X' || data.innerText === 'O'){
        return false;
    }   
    else return true;
}

const printmessage = (type) => {
  const endmessage = document.getElementById("endMessage");
  const tiescore = document.getElementById("TieScore")
  const p1score = document.getElementById("P1Score")
  let score1 = 0
  let score2 = 0
  let tie = 0
  switch(type){
    
      case 'PLAYERO_WON':
          endmessage.innerText = 'Player O Won!'
          score2++;
          document.getElementById("P2Score").innerHTML = score2
          break;


      case 'PLAYERX_WON':
          endmessage.innerText = 'Player X Won!'
          score1++;
          document.getElementById('P1Score').innerText = score1
          break;

      case 'TIE':
          endmessage.innerText = 'It was a Tie!'
          tie++;
          document.getElementById('tieScore').innerText = tie
          break;
  }
  endmessage.classList.remove('hide')
  isGameActive = false
}

// function that lets you grab values froM the different cells, and prints message accordingly: See 8:31 in the video to understand this
function resultCalc() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];

      if (a === '' || b === '' || c === '') {
          continue;
      }
      if (a === b && b === c) {
          roundWon = true;
          break;

      }
  }

  if (roundWon) {
      printmessage(turn === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
  }

  if (!board.includes('')) {
      printmessage(TIE);
      isGameActive = false;
  }
}

