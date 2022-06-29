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

  //const checkIfLegalPlacement = (ship, index) => {
  //  let isVertical;

  //  if (index % 2 === 0) {
  //    isVertical = false;
  //  } else {
  //    isVertical = true;
  //  }

  //  if (isVertical === false
  //    && board[index] === ''
  //    && board[index + ship.getLength()] === ''
  //    && index + ship.getLength() < 99
  //    && (index % 10) < ((index + ship.getLength()) % 10)) {
  //    return true;
  //  }

  //  if (isVertical === true
  //    && board[index] === ''
  //    && board[index + (ship.getLength() * 10)] === ''
  //    && ((index % 10) === (index + ship.getLength()) % 10)
  //    && (index + (ship.getLength() * 10)) < 99) {
  //    return true;
  //  }

  //  return false;
  //};

  //const placeShipRandomly = (ship) => {
  //  let randomIndex = Math.floor(Math.random() * (100 - ship.getLength()));
  //  const randomArray = new Array(ship.getLength()).fill('');
  //  while (!checkIfLegalPlacement(ship, randomIndex)) {
  //    randomIndex = Math.floor(Math.random() * (100 - ship.getLength()));
  //  }

  //  if (randomIndex % 2 === 0) {
  //    for (let i = 0; i < ship.getLength(); i += 1) {
  //      randomArray[i] = randomIndex + i;
  //      board[randomArray[i]] = ship.getType();
  //    }
  //  } else {
  //    for (let i = 0, n = 0; i < ship.getLength(); i += 1, n += 10) {
  //      randomArray[i] = randomIndex + n;
  //      board[randomArray[i]] = ship.getType();
  //    }
  //  }
  //  ship.setPosition(randomArray);
  //};

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
    //placeShipRandomly,
    receiveAttack,
    allSunk,
  };
};

export default Gameboard;
