
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let currentPlayer;
let winner = null;
let available = [];
let players = ["X", "O"];

function setup() {
  createCanvas(400, 400);
  currentPlayerIndex = floor(random() * 10) % 2; //to select a random player to start
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
  let index = floor(random(available.length));
  let spot = available.splice(index, 1)[0];
  let i = spot[0];
  let j = spot[1];

  board[i][j] = players[currentPlayerIndex];
  currentPlayerIndex = (currentPlayerIndex + 1) % 2; //to switch between players
}

function checkWinner() {
  for (var i = 0; i < 3; i++) {
    //For horizontal check
    if (board[i][0] !== "") {
      if (board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
        if (board[i][0] == "X") {
          winner = "Player1";
        } else winner = "Player2";
      }
    }
  }
  //for vertical check
  for (var j = 0; j < 3; j++) {
    if (board[0][j] !== "") {
      if (board[0][j] == board[1][j] && board[1][j] == board[2][j]) {
        if (board[0][j] == "X") {
          winner = "Player1";
        } else winner = "Player2";
      }
    }
  }
  //for diagonal check
  if (
    board[0][0] != "" &&
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2]
  ) {
    if (board[0][0] == "X") winner = "Player1";
    else winner = "Player2";
  }
  //right diagonal check
  if (
    board[2][0] != "" &&
    board[2][0] == board[1][1] &&
    board[1][1] == board[0][2]
  ) {
    if (board[2][0] == "X") winner = "Player1";
    else winner = "Player2";
  }
  else if(winner == null && available.length==0){
    return 'tie';
  }
  return winner;
}

function mousePressed() {
  nextTurn();
}

function draw() {
  let w = width / 3;
  let h = height / 3;
  background(255);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (var j = 0; j < 3; j++) {
    for (var i = 0; i < 3; i++) {
      var x = w * i + w / 3;
      var y = h * j + h / 2;
      textSize(32);
      strokeWeight(4);
      let spot = board[i][j];
      if (spot == players[1]) {
        noFill();
        ellipse(x, y, w / 2);
      } else if (spot == players[0]) {
        let xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }
    }
  }
}
