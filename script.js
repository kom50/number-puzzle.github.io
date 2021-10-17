window.addEventListener('load', () => {
	let blankX = 200,
		blankY = 200;
	let x = 0,
		y = 0;
	let move = 0;
	let level = 1;
	let isWin = false;

	// For x coordinate 
	let locX = [0, 100, 200, 0, 100, 200, 0, 100, 200];
	// For y coordinate 
	let locY = [0, 0, 0, 100, 100, 100, 200, 200, 200];
	// random indexes (shuffle)
	let indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8]

	// Dom element
	let boxCon = document.querySelector('.box_container');
	let gameLabel = document.querySelector('.game_level');
	let moveLabel = document.querySelector('.move');
	let winnerLabel = document.querySelector('.winner_text');
	let boxes = boxCon.querySelectorAll('.box')

	updateLoc(); // initial position

	setTimeout(() => {
		shuffle()
		updateLoc();
	}, 1000)

	function updateLoc() {
		blankX = locX[indexes[8]]
		blankY = locY[indexes[8]]

		for (let i = 0; i < boxes.length; i++) {
			boxes[i].style.cssText = `left : ${locX[indexes[i]]}px; top : ${locY[indexes[i]]}px;`;
		}
	}

	boxCon.addEventListener('click', (event) => {
		let target = event.target;
		[x, y] = [target.offsetLeft, target.offsetTop]
		if (!isWin) {
			[tempX, tempY] = [blankX - x, blankY - y]
			if (((tempX == -100 || tempX == 100) && tempY == 0) || ((tempY == -100 || tempY == 100) && tempX == 0)) {
				target.style.cssText = `left : ${blankX}px; top : ${blankY}px;`;
				[blankX, blankY] = [x, y];
				move++;
				moveLabel.textContent = 'Move : ' + move;
			}
			// winner function call
			setTimeout(() => {
				win();
				console.log('timer ')
			}, 150) // win() function is called after 150ms because slide duration of box is 100ms
			// and then we don`t use setTimeout() (150ms) function then it doesn`t work perfectly 
		}
	}) // box click event listener end

	function shuffle() {
		for (let i = 0; i < indexes.length; i++) {
			let rand = Math.floor(Math.random() * 9);
			let randIndex = Math.floor(Math.random() * 9);
			// swap
			let temp = indexes[randIndex];
			indexes[randIndex] = indexes[rand];
			indexes[rand] = temp;
		}
	} // shuffle code function end

	// win code start
	function win() {
		let full = 0;
		for (let i = 0; i < boxes.length; i++) {
			if (boxes[i].offsetLeft == locX[i] && boxes[i].offsetTop == locY[i]) {
				full += 1;
			}
		}
		if (full == 8) {
			isWin = true;
			winnerLabel.textContent = 'Congratulations! You won.';
		}
		console.log('full ', full, boxes[1].textContent)
	}	// win code end

	document.querySelector('.refresh_btn').addEventListener('click', (event) => {
		winnerLabel.textContent = ''
		move = 0;
		moveLabel.textContent = 'Move : ' + move;
		updateLoc();
	}) // Refresh button click listener end

	function init(isNextBtn = false) {
		move = 0;
		moveLabel.textContent = 'Move : ' + move;

		isWin = false;
		winnerLabel.textContent = ''
		// level increments

		level = isNextBtn ? ++level : 1;
		gameLabel.textContent = `Game Level : ${level}`
	} // init function end

	document.querySelector('.restart').addEventListener('click', (event) => {
		init();

		indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		updateLoc(); // initial 
		// update after 1 second 
		setTimeout(() => {
			shuffle()
			updateLoc();
		}, 1000)

	})  // Restart click listener end

	document.querySelector('.next').addEventListener('click', (event) => {
		if (isWin) {
			init(true);
			// update location
			shuffle();
			updateLoc();
		}

	})  // next function end
}) // window on listener end