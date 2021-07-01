// main.js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width - 100;
const height = canvas.height;

class Character {
  constructor(col, row, direction = 'down') {
    this.col = col;
    this.row = row;
    this.direction = direction;
    this.score = 0;
  }
  moveUp() {
    if (this.row > 0) this.row--;
    this.direction = 'up';
  }
  moveRight() {
    if (this.col < 9) this.col++;
    this.direction = 'right';
  }
  moveDown() {
    if (this.row < 9) this.row++;
    this.direction = 'down';
  }
  moveLeft() {
    if (this.col > 0) this.col--;
    this.direction = 'left';
  }
  scoreUp() {
    this.score++;
  }
}

// Iteration 1
function drawGrid() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let column = 0; column < width + 1; column += width / 10) {
    context.beginPath();
    context.moveTo(column, 0);
    context.lineTo(column, width);
    context.stroke();
    context.closePath();
  }
  for (let row = 0; row < height; row += height / 10) {
    context.beginPath();
    context.moveTo(0, row);
    context.lineTo(height, row);
    context.stroke();
    context.closePath();
  }
}

function drawPlayer(player) {
  let imgUp = '/images/character-up.png';
  let imgRight = '/images/character-right.png';
  let imgDown = '/images/character-down.png';
  let imgLeft = '/images/character-left.png';
  let currentDirection;
  switch (player.direction) {
    case 'up':
      currentDirection = imgUp;
      break;
    case 'right':
      currentDirection = imgRight;
      break;
    case 'down':
      currentDirection = imgDown;
      break;
    case 'left':
      currentDirection = imgLeft;
      break;
  }
  let charImg = new Image();
  charImg.src = currentDirection;
  charImg.addEventListener('load', () => {
    context.drawImage(charImg, player.col * 50, player.row * 50);
  });
}

class Treasure {
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }
  setRandomPosition() {
    this.col = Math.floor(Math.random() * 9);
    this.row = Math.floor(Math.random() * 9);
  }
}
const treasure = new Treasure(
  Math.floor(Math.random() * 9),
  Math.floor(Math.random() * 9)
);
function drawTreasure() {
  let treasureSrc = '/images/treasure.png';
  let treasureImg = new Image();
  treasureImg.src = treasureSrc;
  treasureImg.addEventListener('load', () => {
    context.drawImage(
      treasureImg,
      treasure.col * 50,
      treasure.row * 50,
      50,
      50
    );
  });
}

function drawScores(players) {
  context.font = '24px sans-serif';
  context.fillText('Scores', 510, 50, 80);
  context.fillText(`P1: ${players[0].score}`, 510, 100, 80);
  context.fillText(`P2: ${players[1].score}`, 510, 150, 80);
}

let playerOne = new Character(0, 0);
let playerTwo = new Character(9, 0);
const players = [playerOne, playerTwo];

function drawEverything() {
  drawGrid();
  drawPlayer(playerOne);
  drawPlayer(playerTwo);
  drawTreasure();
  drawScores(players);
}
function checkSpot(player, treasure) {
  if (player.row === treasure.row && player.col === treasure.col) {
    player.scoreUp();
    treasure.setRandomPosition();
  }
}

drawEverything();

window.addEventListener('keydown', (event) => {
  // Stop the default behavior (moving the screen to the left/up/right/down)
  event.preventDefault();

  // React based on the key pressed
  switch (event.keyCode) {
    case 37:
      playerOne.moveLeft();
      break;
    case 38:
      playerOne.moveUp();
      break;
    case 39:
      playerOne.moveRight();
      break;
    case 40:
      playerOne.moveDown();
      break;
    case 65:
      playerTwo.moveLeft();
      break;
    case 87:
      playerTwo.moveUp();
      break;
    case 68:
      playerTwo.moveRight();
      break;
    case 83:
      playerTwo.moveDown();
      break;
  }
  checkSpot(playerOne, treasure);
  checkSpot(playerTwo, treasure);
  drawEverything();
});
