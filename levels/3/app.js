// Cursor Adventure by Asicosilomu
document.addEventListener('DOMContentLoaded', () => {

// no cheating
window.addEventListener("contextmenu", e => e.preventDefault());

window.previousLevelNo = "2";
window.levelNo = "3";
window.nextLevelNo = "4";

window.hasGameStarted = false;
window.gameWon = false;
window.gameLost = false;

window.timedDamageTiles = [];
window.timedDamageActive = true;

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
	document.querySelector(".titledisplay").textContent = "New tile: timed damage. These will alternate colors constantly. If you move your cursor on it while it's red, you lose."
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
	square.className = "tile black";
	square.style.width = "15px";
	square.style.height = "15px";
	square.onmouseover = function() { lose() };
    loc.appendChild(square);
}

function empty(loc) {
	const square = document.createElement('div');
    square.style.backgroundColor = "white";
	square.className = "tile empty";
	square.style.width = "15px";
	square.style.height = "15px";
    loc.appendChild(square);
}

function start(loc) {
	const square = document.createElement('div');
    square.style.backgroundColor = "gray";
	square.className = "tile start";
	square.style.width = "15px";
	square.style.height = "15px";
	square.onmouseover = function() { game() };
    loc.appendChild(square);
}

function finish(loc) {
	const square = document.createElement('div');
    square.style.backgroundColor = "green";
	square.className = "tile finish";
	square.style.width = "15px";
	square.style.height = "15px";
	square.onmouseover = function() { win() };
    loc.appendChild(square);
}

function timedDamage(loc) {
	const square = document.createElement('div');
    square.style.backgroundColor = "red";
	square.className = "tile timedDamage";
	square.style.width = "15px";
	square.style.height = "15px";
	square.onmouseover = function() { if(this.style.backgroundColor == "red") { lose() } else {} };
    loc.appendChild(square);
	window.timedDamageTiles.push(square);
}

function createBoard() {
  var grid = createGrid();
black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid);
grid = createGrid();
black(grid); start(grid); start(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); black(grid); 
grid = createGrid();
black(grid); start(grid); start(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); black(grid); 
grid = createGrid();
black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); timedDamage(grid); timedDamage(grid); black(grid); 
grid = createGrid();
black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); empty(grid); empty(grid); black(grid); 
grid = createGrid();
black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); timedDamage(grid); timedDamage(grid); black(grid); 
grid = createGrid();
black(grid); finish(grid); finish(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); black(grid); 
grid = createGrid();
black(grid); finish(grid); finish(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); black(grid); 
grid = createGrid();
black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); 
}

createBoard();

setInterval(function() {
	for (let i = 0; i < window.timedDamageTiles.length; i++) {
		var ttile = window.timedDamageTiles[i];
		if(window.timedDamageActive == true) {
			ttile.style.backgroundColor = "gray";
			// ttile.onmouseover = function(){};
		} else if(window.timedDamageActive == false) {
			ttile.style.backgroundColor = "red";
			// ttile.onmouseover = function(){ lose() };
		}
	};
	window.timedDamageActive = !window.timedDamageActive;
}, 410)

})