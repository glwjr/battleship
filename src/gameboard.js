import Ship from './ship';

const Gameboard = () => {
  const board = new Array(100).fill('');
  const carrier = Ship('carrier', 5);
  const battleship = Ship('battleship', 5);
  const cruiser = Ship('cruiser', 3);
  const submarine = Ship('submarine', 3);
  const destroyer = Ship('destroyer', 2);
  const shipMap = [carrier, battleship, cruiser, submarine, destroyer];

  const placeShip = (ship, positionArray) => {
    for (let i = 0; i < ship.getLength(); i += 1) {
      board[positionArray[i]] = ship.getType();
    }
    ship.setPosition(positionArray);
  };

  const receiveAttack = (index) => {
    if (board[index] !== '') {
      if (board[index] === carrier.getType()) {
        carrier.hit(index);
      } else if (board[index] === battleship.getType()) {
        battleship.hit(index);
      } else if (board[index] === cruiser.getType()) {
        cruiser.hit(index);
      } else if (board[index] === submarine.getType()) {
        submarine.hit(index);
      } else if (board[index] === destroyer.getType()) {
        destroyer.hit(index);
      }
      board[index] = 'hit';
    } else if (board[index] === '') {
      board[index] = 'miss';
    }
  };

  const allSunk = () => shipMap.every((ship) => ship.isSunk() === true);

  return {
    board,
    carrier,
    battleship,
    cruiser,
    submarine,
    destroyer,
    placeShip,
    receiveAttack,
    allSunk,
  };
};

export default Gameboard;
