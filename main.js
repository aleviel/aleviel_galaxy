const blocks = document.querySelectorAll('.game div'),
	indexEnemy = [
		23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
		43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
		63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76
	],
	countRow = Math.sqrt(blocks.length);

let playerIndex = Math.round(blocks.length - countRow / 2),
	step = 1,
	killed = [];

blocks[playerIndex].classList.add('player');

const movePlayer = (e) => {
	blocks[playerIndex].classList.remove('player');
	if (e.code === 'ArrowLeft' && playerIndex > blocks.length - countRow) {
		playerIndex--;
	}
	if (e.code === 'ArrowRight' && playerIndex < blocks.length - 1) {
		playerIndex++;
	}
	blocks[playerIndex].classList.add('player');
};
document.addEventListener('keydown', movePlayer);

const moveEnemies = () => {
	const leftBlockEnemies = indexEnemy[0] % countRow === 0;
	const rightBlockEnemies = indexEnemy[indexEnemy.length - 1] % countRow === countRow - 1;

	if (leftBlockEnemies && step === -1 || rightBlockEnemies && step === 1) {
		step = countRow;
	} else if (step === countRow) {
		step = leftBlockEnemies ? 1 : -1;
	}
	indexEnemy.forEach((item) => {
		blocks[item].classList.remove('enemy');
	});

	for (let i = 0; i < indexEnemy.length; i++) {
		indexEnemy[i] += step;
	}

	indexEnemy.forEach((item, i) => {
		if (!killed.includes(i)) {
			blocks[item].classList.add('enemy');
		}
	});

	if (blocks[playerIndex].classList.contains('enemy')) {
		alert('game over');
		endGame();
		return
	}

	for (let i = 0; i <= indexEnemy.length; i++) {
		if (indexEnemy[i] > blocks.length - countRow) {
			alert('game over');
			endGame();
			return
		}
	}

	if (killed.length === indexEnemy.length) {
		alert('WINNER');
		endGame();
		return
	}

	setTimeout(moveEnemies, 200);

};
moveEnemies();

for (const item of indexEnemy) {
	blocks[item].classList.add('enemy');
};

const fire = e => {
	if (e.code === 'Space') {
		let bulletIndex = playerIndex;

		const fireBullet = () => {
			blocks[bulletIndex].classList.remove('bullet');
			bulletIndex -= countRow;
			blocks[bulletIndex].classList.add('bullet');

			if (bulletIndex < countRow) {
				setTimeout(() => {
					blocks[bulletIndex].classList.remove('bullet');
				}, 50)
				return
			}

			if (blocks[bulletIndex].classList.contains('enemy')) {
				blocks[bulletIndex].classList.remove('bullet');
				blocks[bulletIndex].classList.remove('enemy');
				const indexKilledEnemy = indexEnemy.indexOf(bulletIndex);
				killed.push(indexKilledEnemy);
				return
			}

			setTimeout(fireBullet, 50);
		}
		fireBullet();
	}

};

document.addEventListener('keydown', fire);

const endGame = () => {
	document.removeEventListener('keydown', movePlayer);
	document.removeEventListener('keydown', fire);
}