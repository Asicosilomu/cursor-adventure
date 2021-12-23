// Cursor Adventure by Asicosilomu
document.addEventListener('DOMContentLoaded', () => {

// no cheating
window.addEventListener("contextmenu", e => e.preventDefault());

window.previousLevelNo = "4";
window.levelNo = "5";
window.nextLevelNo = "6";

window.hasGameStarted = false;
window.gameWon = false;
window.gameLost = false;

window.winTimer = [];

window.timedDamageTiles = [];
// window.timedDamageActive = true;

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
	document.querySelector(".titledisplay").textContent = "New tile: Locked Doors. They are like black tiles but with letters written on them. In order to move through said doors, you must find the key (yellow tile) that corresponds with the letter written on the door tile. Good luck!"
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
	square.onmouseenter = function() { startWinTimer() };
	square.onmouseleave = function() { stopWinTimer() };
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

function lockedDoor(id, loc) {
	const square = document.createElement('div');
    square.style.backgroundColor = "black";
	square.style.color = "white";
	square.style.fontSize = "11px";
	square.innerText = id;
	square.className = "tile lockedDoor " + id;
	square.style.width = "15px";
	square.style.height = "15px";
	square.onmouseover = function() { if(this.style.backgroundColor == "black") { lose() } else {} };
    loc.appendChild(square);
}

function doorKey(id, loc) {
	const square = document.createElement('div');
    square.style.backgroundColor = "yellow";
	square.style.color = "black";
	square.style.fontSize = "11px";
	square.innerText = id;
	square.className = "tile doorKey " + id;
	square.style.width = "15px";
	square.style.height = "15px";
	square.onclick = function() { if(window.hasGameStarted == true) { var doors = document.querySelectorAll(".tile.lockedDoor." + this.innerText); for (var i = 0; i < doors.length; i++) { doors[i].style.backgroundColor = "gray"; }; this.style.backgroundColor = "white"; this.className = "tile empty"; this.innerText = ""; this.onmouseover = null; this.onclick = null; }; };
	// exclusively for the introduction level
	square.onmouseover = function() { if(window.hasGameStarted == true) { document.querySelector(".titledisplay").textContent = "Good job! Now you need to click the key tile with your left mouse button. The corresponding door(s) should turn gray and allow you to go through them." } };
    loc.appendChild(square);
}

function createBoard() {
  var grid = createGrid();
black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); 
grid = createGrid();
black(grid); start(grid); start(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); lockedDoor("A", grid); empty(grid); empty(grid); finish(grid); finish(grid); black(grid); 
grid = createGrid();
black(grid); start(grid); start(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); lockedDoor("A", grid); empty(grid); empty(grid); finish(grid); finish(grid); black(grid); 
grid = createGrid();
black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); empty(grid); empty(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); 
grid = createGrid();
black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); empty(grid); empty(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); 
grid = createGrid();
black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); empty(grid); doorKey("A", grid); black(grid); 
grid = createGrid();
black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); black(grid); 
}

createBoard();

setInterval(function() {
	for (let i = 0; i < window.timedDamageTiles.length; i++) {
		var ttile = window.timedDamageTiles[i];
		if(ttile.style.backgroundColor == "red") {
			ttile.style.backgroundColor = "gray";
			// ttile.onmouseover = function(){};
		} else if(ttile.style.backgroundColor == "gray") {
			ttile.style.backgroundColor = "red";
			// ttile.onmouseover = function(){ lose() };
		}
	};
	// window.timedDamageActive = !window.timedDamageActive;
}, 555)

})