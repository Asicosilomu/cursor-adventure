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

window.winTimer = [];

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
	if(hasGameStarted == true && window.gameLost != true) {
		document.querySelector(".grids").remove();
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

function startWinTimer() {
	if(hasGameStarted == true && window.gameLost != true && window.gameWon != true) {
		window.winTimer[0] = document.querySelector(".titledisplay").textContent;
		document.querySelector(".titledisplay").textContent = "Keep your cursor on the green pad for 2 more seconds to proceed."
		window.winTimer[1] = setTimeout(function() {
			document.querySelector(".titledisplay").textContent = "Keep your cursor on the green pad for 1 more second to proceed.";
			window.winTimer[2] = setTimeout(function() {
				document.querySelector(".titledisplay").textContent = "Keep your cursor on the green pad for 0 more seconds to proceed.";
				win();
			}, 1000)
		}, 1000)
	}
}

function stopWinTimer() {
	if(hasGameStarted == true && window.gameLost != true && window.gameWon != true) {
		try {
			clearTimeout(window.winTimer[1]);
		} catch {};
		try {
			clearTimeout(window.winTimer[2]);
		} catch {};
		document.querySelector(".titledisplay").textContent = window.winTimer[0];
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
	square.onmouseenter = function() { startWinTimer() };
	square.onmouseleave = function() { stopWinTimer() };
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
