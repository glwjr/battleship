/* eslint-disable no-undef */
import Player from '../player';

test('testing player factory', () => {
  // Given user and computer as two new Players
  const user = Player('user');
  const computer = Player('computer');

  // When ships are given arrays for their position
  computer.playerBoard.placeShip(computer.playerBoard.carrier, [0, 1, 2, 3, 4]);
  computer.playerBoard.placeShip(computer.playerBoard.battleship, [10, 11, 12, 13, 14]);
  computer.playerBoard.placeShip(computer.playerBoard.cruiser, [20, 21, 22]);
  computer.playerBoard.placeShip(computer.playerBoard.submarine, [30, 31, 32]);
  computer.playerBoard.placeShip(computer.playerBoard.destroyer, [40, 41]);

  // Then the positon should be updated
  expect(computer.playerBoard.carrier.position).toEqual([0, 1, 2, 3, 4]);

  // When the user attacks the computer
  user.attack(computer, 41);
  user.attack(computer, 42);

  // Then the board array must be updated to either a 'hit' or a 'miss'
  expect(computer.playerBoard.board[41]).toBe('hit');
  expect(computer.playerBoard.board[42]).toBe('miss');

  // When all of the computer's board is attacked
  for (let i = 0; i < computer.playerBoard.board.length; i += 1) {
    user.attack(computer, i);
  }

  // Then all ships should register as sunk
  expect(computer.playerBoard.allSunk()).toBe(true);
});
