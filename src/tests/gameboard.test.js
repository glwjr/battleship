/* eslint-disable no-undef */
import Gameboard from '../gameboard';

test('testing gameboard factory', () => {
  // Given a new Gameboard and mock indexes
  const playerboard = Gameboard();
  const carrierIndexes = [9, 10, 11, 12, 13];
  const battleshipIndexes = [29, 39, 49, 59, 69];
  const cruiserIndexes = [19, 20, 21];
  const submarineIndexes = [0, 1, 2];
  const destroyerIndexes = [50, 51];

  // When the index arrays are used to place the ship
  playerboard.placeShip(playerboard.carrier, carrierIndexes);
  playerboard.placeShip(playerboard.battleship, battleshipIndexes);
  playerboard.placeShip(playerboard.cruiser, cruiserIndexes);
  playerboard.placeShip(playerboard.submarine, submarineIndexes);
  playerboard.placeShip(playerboard.destroyer, destroyerIndexes);

  // Then the position array should equal the original array
  expect(playerboard.carrier.position).toEqual([9, 10, 11, 12, 13]);
  expect(playerboard.cruiser.position).toEqual([19, 20, 21]);

  // The board should recognize what type of ship was placed
  expect(playerboard.board[19]).toEqual('cruiser');
  expect(playerboard.board[20]).toEqual('cruiser');
  expect(playerboard.board[21]).toEqual('cruiser');

  // When a Player attacks the enemy at indexes 19-22
  for (let i = 19; i < 23; i += 1) {
    playerboard.receiveAttack(i);
  }

  // Then the board cruiser should recognize all of the hits
  expect(playerboard.board[19]).toEqual('hit');
  expect(playerboard.board[20]).toEqual('hit');
  expect(playerboard.board[21]).toEqual('hit');
  expect(playerboard.cruiser.position).toEqual(['hit', 'hit', 'hit']);

  // Then the board should also recognize the miss
  expect(playerboard.board[22]).toEqual('miss');

  // Not all of the ships have been sunk yet
  expect(playerboard.allSunk()).toBe(false);

  // When the entire board is attacked
  for (let i = 0; i < playerboard.board.length; i += 1) {
    playerboard.receiveAttack(i);
  }

  // Then the carrier should recognize the hits
  // And all ships should have been sunk
  expect(playerboard.carrier.position).toEqual(['hit', 'hit', 'hit', 'hit', 'hit']);
  expect(playerboard.allSunk()).toBe(true);
});
