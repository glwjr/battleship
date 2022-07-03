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

  const checkIfLegalPlacement = (shipArray, availableIndex, cellIndex) => {
    let isVertical;

    if (shipArray[0] === '') {
      return true;
    }

    if (shipArray[1] === '') {
      if (cellIndex === shipArray[0] - 1
        || cellIndex === shipArray[0] + 1
        || cellIndex === shipArray[0] - 10
        || cellIndex === shipArray[0] + 10) {
        return true;
      }
    }

    if (availableIndex > 1) {
      const sortedArray = shipArray.sort((a, b) => {
        if (typeof a === 'string') {
          return 1;
        }
        if (typeof b === 'string') {
          return -1;
        }
        return a - b;
      });
      const max = Math.max(...sortedArray);
      const min = sortedArray[0];

      if (shipArray[1] === shipArray[0] - 10 || shipArray[1] === shipArray[0] + 10) {
        isVertical = true;
      } else {
        isVertical = false;
      }

      if (isVertical === true
      && board[cellIndex + 1] === ''
      && (cellIndex === min - 10
      || cellIndex === max + 10)) {
        return true;
      }

      if (isVertical === false
      && (cellIndex === min - 1
      || cellIndex === max + 1)) {
        return true;
      }
    }

    return false;
  };

  const checkIfValidRandom = (ship, index) => {
    let isVertical;

    if (index % 2 === 0) {
      isVertical = false;
    } else {
      isVertical = true;
    }

    if (isVertical === false && validHorizontal(ship, index) === true) {
      return true;
    }

    if (isVertical === true && validVertical(ship, index) === true) {
      return true;
    }
    return false;
  };

  const validVertical = (ship, index) => {
    const verticalArray = new Array(ship.getLength()).fill('');
    for (let i = 0, n = 0; i < ship.getLength(); i += 1, n += 10) {
      verticalArray[i] = index + n;
    }
    if (verticalArray.every((value) => board[value] === ''
      && board[value + 1] === ''
      && board[value - 1] === ''
      && board[value + 10] === ''
      && board[value - 10] === ''
      && value < 99)) {
      return true;
    }
    return false;
  };

  const validHorizontal = (ship, index) => {
    const horizontalArray = new Array(ship.getLength()).fill('');
    for (let i = 0; i < ship.getLength(); i += 1) {
      horizontalArray[i] = index + i;
    }
    if (horizontalArray.every((value) => board[value] === ''
      && board[value + 1] === ''
      && board[value - 1] === ''
      && board[value + 10] === ''
      && board[value - 10] === ''
      && value < 99
      && horizontalArray[0] % 10 < horizontalArray[ship.getLength() - 1] % 10)) {
      return true;
    }
    return false;
  };

  const placeShipRandomly = (ship) => {
    let randomIndex = Math.floor(Math.random() * (100 - ship.getLength()));
    const randomArray = new Array(ship.getLength()).fill('');
    while (!checkIfValidRandom(ship, randomIndex)) {
      randomIndex = Math.floor(Math.random() * (100 - ship.getLength()));
    }

    if (randomIndex % 2 === 0) {
      for (let i = 0; i < ship.getLength(); i += 1) {
        randomArray[i] = randomIndex + i;
        board[randomArray[i]] = ship.getType();
      }
    } else if (randomIndex % 2 !== 0) {
      for (let i = 0, n = 0; i < ship.getLength(); i += 1, n += 10) {
        randomArray[i] = randomIndex + n;
        board[randomArray[i]] = ship.getType();
      }
    }
    ship.setPosition(randomArray);
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

  const allPlaced = () => shipMap.every((ship) => ship.isPlaced() === true);

  const allSunk = () => shipMap.every((ship) => ship.isSunk() === true);

  return {
    board,
    carrier,
    battleship,
    cruiser,
    submarine,
    destroyer,
    placeShip,
    checkIfLegalPlacement,
    placeShipRandomly,
    receiveAttack,
    allPlaced,
    allSunk,
  };
};

export default Gameboard;
