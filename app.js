// Cursor Adventure by Asicosilomu
document.addEventListener('DOMContentLoaded', () => {

// no cheating
window.addEventListener("contextmenu", e => e.preventDefault());

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
		var wantsToRestart = confirm(locale.msglose);
		if(wantsToRestart == true) {
			window.location.reload();
		} else {
			document.body.innerHTML = locale.refreq;
			window.location.assign("index.html");
		}
	}
}

function game() {
	window.hasGameStarted = true;
	document.querySelector(".titledisplay").textContent = locale[level.tip];
}

function win() {
	if(hasGameStarted == true && window.gameLost != true && window.gameWon != true) {
		window.gameWon = true;
		var wantsNext = confirm(locale.msgwin);
		if(wantsNext == true) {
			document.body.innerHTML = locale.refreq;
			window.location.assign(window.location.protocol + "//" + window.location.hostname + window.location.pathname + "?level=" + (Number(params.level) + 1).toString() + "&lang=" + params.lang);
		} else {
			document.body.innerHTML = locale.refreq;
			window.location.assign("index.html");
		}
	}
}

function startWinTimer() {
	if(hasGameStarted == true && window.gameLost != true && window.gameWon != true) {
		window.winTimer[0] = document.querySelector(".titledisplay").textContent;
		document.querySelector(".titledisplay").textContent = locale.waitw2;
		window.winTimer[1] = setTimeout(function() {
			document.querySelector(".titledisplay").textContent = locale.waitw1;
			window.winTimer[2] = setTimeout(function() {
				document.querySelector(".titledisplay").textContent = locale.waitw0;
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

function timedDamage(state, loc) {
	const square = document.createElement('div');
    if(state == true) { square.style.backgroundColor = "red" } else if (state == false) { square.style.backgroundColor = "gray" } else { throw new Error("Invalid state argument! Expected boolean.") };
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
    loc.appendChild(square);
}

function createBoard() {
	level.levelData.forEach(function(data) {
		var grid = createGrid();
		data.forEach(function(tile) {
			if (tile.type == "black") {
				black(grid);
			} else if (tile.type == "empty") {
				empty(grid);
			} else if (tile.type == "start") {
				start(grid);
			} else if (tile.type == "finish") {
				finish(grid);
			} else if (tile.type == "timedDamage") {
				timedDamage(tile.state, grid);
			} else if (tile.type == "lockedDoor") {
				lockedDoor(tile.id, grid);
			} else if (tile.type == "doorKey") {
				doorKey(tile.id, grid);
			} else { console.warn("Invalid tile type \"" + tile.type + "\" found. Ignoring."); };
		});
	});
};

// Parse GET parameters
var urlParams = window.location.search;
var getQuery = urlParams.split('?')[1];
if (getQuery == undefined) {
	var params = {};
} else {
	var paramstr = getQuery.split('&');
	var params = {};
	paramstr.forEach(function(e) { var s = e.split("="); params[s[0]] = s[1]; });
};

// Prepare locale object
if (params.lang != undefined && window.locale[params.lang.toLowerCase()] != undefined) { var locale = window.locale[params.lang.toLowerCase()]; } else { var locale = window.locale.en; };

// Block unsupported devices
if (/Android|Mobile|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
	document.body.innerHTML = "";
	alert(locale.deviceerror);
	window.location.assign("index.html");
}

// Check for level param
if (params.level == undefined) { document.body.innerHTML = locale.badParams; var e = new Error(locale.badParams); e.name = locale.error; throw e; };

// Reg level
var level = window.levels[Number(params.level)];
if (level == undefined) { document.body.innerHTML = locale.nolevel; var e = new Error(locale.nolevel); e.name = locale.error; throw e; };

// Other stuff
document.title = locale.level + " " + params.level + " | Cursor Adventure";
document.body.querySelector(".ln").innerText = locale.level + " " + params.level;
document.body.querySelector(".titledisplay").innerText = locale.globalTip;
document.body.querySelector(".credits").innerText = locale.credits;

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
}, level.timedDamageDelay)

})
