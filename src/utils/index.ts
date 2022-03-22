import type { iBingoTile } from 'src/types';

export function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}

export function checkHorizontralBingo(board: iBingoTile[], row: number) {
	for (let i = 0; i < 5; i++) {
		if (board[row * 5 + i].selected === false) {
			return false;
		}
	}

	return true;
}

export function checkVerticalBingo(board: iBingoTile[], col: number) {
	for (let i = 0; i < 5; i++) {
		if (board[i * 5 + col].selected === false) {
			return false;
		}
	}

	return true;
}

// Check for diagonal bingo
export function checkDiagonalBingo(bingoBoard: iBingoTile[], row: number, col: number) {
	if (row === col) {
		for (let i = 0; i < 5; i++) {
			if (bingoBoard[i * 5 + i].selected === false) {
				return false;
			}
		}

		return true;
	}

	if (row + col === 4) {
		for (let i = 0; i < 5; i++) {
			if (bingoBoard[i * 5 + (4 - i)].selected === false) {
				return false;
			}
		}

		return true;
	}

	return false;
}
