// Cursor Adventure by Asicosilomu
document.addEventListener('DOMContentLoaded', () => {

// no cheating
window.addEventListener("contextmenu", e => e.preventDefault());

window.previousLevelNo = null;
window.levelNo = "1";
window.nextLevelNo = "2";

window.hasGameStarted = false;
window.gameWon = false;
window.gameLost = false;

window.outOfGridHandler = function() {
	if(window.hasGameStarted == true && window.gameWon != true) {
		lose();
	}
}

function createGrid() {
	var grid = document.createElement("div");
	grid.className="grid center";
	document.querySelector(".grids").appendChild(grid);
	return grid;
}

function lose() {
	if(hasGameStarted == true && window.gameLost == false) {
		window.gameLost = true;
		var wantsToRestart = confirm("You lost! Would you like to try again?");
		if(wantsToRestart == true) {
			window.location.reload();
		} else {
			window.location.assign("./../../index.html");
		}
	}
}

function game() {
	window.hasGameStarted = true;
	document.querySelector(".titledisplay").textContent = "Good job! Now slowly move your cursor to the green pad without touching the black borders!"
}

function win() {
	if(hasGameStarted == true && window.gameLost != true && window.gameWon != true) {
		window.gameWon = true;
		var wantsNext = confirm("You won! Would you like to proceed to the next level?");
		if(wantsNext == true) {
			window.location.assign("./../" + nextLevelNo + "/index.html");
		} else {
			window.location.assign("./../../index.html");
		}
	}
}

function black(loc) {
	const square = document.createElement('div');
    square.style.backgroundColor = "black";
	square.style.width = "15px";
	square.style.height = "15px";
	square.onmouseover = function() { lose() };
    loc.appendChild(square);
}

function empty(loc) {
	const square = document.createElement('div');
    square.style.backgroundColor = "white";
	square.style.width = "15px";
	square.style.height = "15px";
    loc.appendChild(square);
}

function start(loc) {
	const square = document.createElement('div');
    square.style.backgroundColor = "gray";
	square.style.width = "15px";
	square.style.height = "15px";
	square.onmouseover = function() { game() };
    loc.appendChild(square);
}

function finish(loc) {
	const square = document.createElement('div');
    square.style.backgroundColor = "green";
	square.style.width = "15px";
	square.style.height = "15px";
	square.onmouseover = function() { win() };
    loc.appendChild(square);
}

function createBoard() {
  var grid = createGrid();
  black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid);
  grid = createGrid();
  black(grid); start(grid); start(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); finish(grid); finish(grid); black(grid);
  grid = createGrid();
  black(grid); start(grid); start(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); finish(grid); finish(grid); black(grid);
  grid = createGrid();
  black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid);
}

createBoard()

})
