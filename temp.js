let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let w = 400 / 3;
let h = 400 / 3;
let available = [];
const human = "X";
const ai = "O";
let currentPlayer;
let winner = null;
// let available = [];
let players = [human, ai];

function setup() {
  createCanvas(400, 400);
  //   currentPlayerIndex = floor(random() * 10) % 2; //to select a random player's index to start
  //   currentPlayer = players[currentPlayerIndex]; //to select a random player
  //hard coding for first player to be ai, fix it by uncommenting upside
  currentPlayer = human;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      available.push([i, j]);
    }
  }
}

function nextTurn() {
  if (checkWinner() != null) {
    alert(checkWinner() + "Wins");
    return 0;
  }
  if (currentPlayer == ai) {
    let move = floor((random() * 100) % available.length);

    let i = available[move][0];
    let j = available[move][1];
    board[i][j] = ai;
    available.splice(move, 1);
    currentPlayer = human;
    console.log("availabale after", available);
  }
}

function mousePressed() {
  if (currentPlayer == human) {
    let j = floor(mouseX / w);
    let i = floor(mouseY / h);
    //if valid turn i.e. spot is empty
    if (board[i][j] == "") {
      board[i][j] = human;
      console.log(isItemInArray(available, [i, j]));
      // console.log(available);
      available.splice(isItemInArray(available, [i, j]), 1);
      console.table("by hooman", available);
      currentPlayer = ai;
      nextTurn();
    }
  } else nextTurn();

  // let i = spot[0];
  // let j = spot[1];

  // board[i][j] = currentPlayer;
  // console.log((currentPlayerIndex+1) % 2);
  // currentPlayerIndex = (currentPlayerIndex + 1) % 2; //to switch between players
  // currentPlayer = players[currentPlayerIndex];
}
function checkWinner() {
  // console.log("called");
  for (var i = 0; i < 3; i++) {
    //For horizontal check
    if (board[i][0] !== "") {
      if (board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
        if (board[i][0] == "X") {
          winner = "human";
        } else winner = "AI";
      }
    }
  }
  //for vertical check
  for (var j = 0; j < 3; j++) {
    if (board[0][j] !== "") {
      if (board[0][j] == board[1][j] && board[1][j] == board[2][j]) {
        if (board[0][j] == "X") {
          winner = "human";
        } else winner = "AI";
      }
    }
  }
  //for diagonal check
  if (
    board[0][0] != "" &&
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2]
  ) {
    if (board[0][0] == "X") winner = "human";
    else winner = "AI";
  }
  //right diagonal check
  if (
    board[2][0] != "" &&
    board[2][0] == board[1][1] &&
    board[1][1] == board[0][2]
  ) {
    if (board[2][0] == "X") winner = "human";
    else winner = "AI";
  } else if (winner == null && available.length == 0) {
    return "tie";
  }
  return winner;
}

function draw() {
  background(255);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var x = w * j + w / 3;
      var y = h * i + h / 2;
      textSize(32);
      strokeWeight(4);
      let spot = board[i][j];
      if (spot == ai) {
        noFill();
        ellipse(x, y, w / 2);
      } else if (spot == human) {
        let xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }
    }
  }
}

function isItemInArray(array, item) {
  //since indexof doesnot works in 2d array, this is used to fin d index for splice function
  for (var i = 0; i < array.length; i++) {
    // This if statement depends on the format of your array
    if (array[i][0] == item[0] && array[i][1] == item[1]) {
      return i; // Found it
    }
  }
  return -1; // Not found
}
