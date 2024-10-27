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

//--- Loads options ----
function startGame() {
  let askP1 = playerOption[currentIndex];
  string = askP1.question;
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
  let timePerChar = 60;
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
  main(string);
};

//---- Player submits choice ----

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
  document.getElementById('playerChoice').innerHTML = '';                             //removes choice so player cannot change during game
  document.getElementsByClassName('turn')[0].classList = 'turn true'
  buildBoard();
};

//---- Building the board ----

function buildBoard(){
  let gameContainer = document.getElementById('theGame')
  let boardContainer = document.createElement('div');
  boardContainer.classList = 'cellContainer';

  gameContainer.appendChild(boardContainer);

  for (let i = 0; i < 9; i++) {
      let square = document.createElement('div');
      square.className = 'cell';
      boardContainer.appendChild(square);

      square.addEventListener('click', (event) => {
          let currentCell = event.target;

          if (!isGameActive || currentCell.innerHTML !== ''){return;}

          turn = (turn === currentPlayer[0]) ? currentPlayer[1] : currentPlayer[0];

          let player = document.getElementsByClassName('turn');
          if (turn === currentPlayer[0]) {
              player[1].classList = 'turn true';
              player[0].classList = 'turn';
          } else {
              player[1].classList = 'turn'
              player[0].classList = 'turn true';
          }

          let item = document.createElement('p');
          item.classList = ('celldata');
          currentCell.appendChild(item);

          item.innerText = turn;

          board[i] = turn;
          resultCalc()
      })
  }
}


//----------------
//CALCULATE WINNER
//----------------


//---- Variables ----

let score1 = 0
let score2 = 0 
let tie = 0
const winningConditions =                                                             //adjusted for readability
  [ 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6] 
  ]
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
const P1 = 'P1';
const P2 = 'P2';
const TIE = 'TIE';
const endmessage = document.getElementById("endMessage");

const printmessage = (type) => {
  const endmessage = document.getElementById("endMessage");
  const tiescore = document.getElementById("tieScore")
  const p1score = document.getElementById("P1Score")
  const p2score = document.getElementById('P2Score')
  switch(type){
    case 'P1':
      endmessage.innerText = 'Player 1 Won!'
      score1++;
      p1score.innerHTML = score1;
      isGameActive = false
      break;

    case 'P2':
      endmessage.innerText = 'Player 2 Won!'
      score2++;
      p2score.innerText = score2;
      isGameActive = false
      break;

    case 'TIE':
      endmessage.innerText = 'It was a Tie!'
      tie++;
      tiescore.innerText = tie;
      isGameActive = false;
  }
};


function resultCalc() {
  
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];

      if (a === '' || b === '' || c === '') {
          continue;
      };
      if (a && a === b && b === c) {
        roundWon = true;
        break;
    };
};

  if (roundWon) {
      printmessage(turn == currentPlayer[0] ? P1 : P2);
      isGameActive = false;
      return;
  };

  if (!board.includes('')) {
    printmessage(TIE);
    isGameActive = false;
  };
};

document.getElementById('newGame').addEventListener('click', resetBoard);

function resetBoard() {
  if(currentPlayer.length === 0){
    return;
  }
  const endmessage = document.getElementById("endMessage");
  endmessage.innerText= "";
  board = ['', '', '', '', '', '', '', '', ''];
  document.querySelectorAll('.cell').forEach(cell => {
      cell.innerHTML = '';
      cell.classList.remove('playerX', 'playerO');
  })
  turnReset();
  isGameActive = true;
};

function turnReset(){
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
};