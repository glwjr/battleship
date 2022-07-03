import Player from './player';

const playGame = (() => {
  const user = Player('user');
  const computer = Player('computer');
  const carrierIndexes = new Array(5).fill('');
  const battleshipIndexes = new Array(5).fill('');
  const cruiserIndexes = new Array(3).fill('');
  const submarineIndexes = new Array(3).fill('');
  const destroyerIndexes = new Array(2).fill('');
  let gameOver = false;

  const playRound = (attackIndex) => {
    checkWinner();

    if (gameOver === true) {
      return;
    }

    if (gameOver === false) {
      user.attack(computer, attackIndex);
      checkWinner();

      if (gameOver === false) {
        computer.randomAttack(user);
        createUserBoard();
        checkWinner();
      }
    }
  };

  const checkWinner = () => {
    if (user.playerBoard.allSunk() === true) {
      gameOver = true;
      setWinnerMessage(computer);
    }
    if (computer.playerBoard.allSunk() === true) {
      gameOver = true;
      setWinnerMessage(user);
    }
  };

  computer.playerBoard.placeShipRandomly(computer.playerBoard.carrier);
  computer.playerBoard.placeShipRandomly(computer.playerBoard.battleship);
  computer.playerBoard.placeShipRandomly(computer.playerBoard.cruiser);
  computer.playerBoard.placeShipRandomly(computer.playerBoard.submarine);
  computer.playerBoard.placeShipRandomly(computer.playerBoard.destroyer);

  return {
    user,
    computer,
    carrierIndexes,
    battleshipIndexes,
    cruiserIndexes,
    submarineIndexes,
    destroyerIndexes,
    playRound,
    gameOver,
  };
})();

let preGame = true;
const userContainer = document.getElementById('user-container');
const computerContainer = document.getElementById('computer-container');
const message = document.getElementById('message');

function createUserBoard() {
  userContainer.innerHTML = '';
  userContainer.style.gridTemplateColumns = 'repeat(10, 1fr)';
  for (let i = 0; i < 100; i += 1) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    setUserCellClasses(cell, i);
    userContainer.appendChild(cell);
    cell.addEventListener('click', () => handleClick(cell, i));
  }
}

function createComputerBoard() {
  computerContainer.innerHTML = '';
  computerContainer.style.gridTemplateColumns = 'repeat(10, 1fr)';
  for (let i = 0; i < 100; i += 1) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    setComputerCellClasses(cell, i);
    computerContainer.appendChild(cell);
    cell.addEventListener('click', () => handleClick(cell, i));
  }
}

const setUserCellClasses = (cell, i) => {
  if (playGame.user.playerBoard.board[i] === 'carrier') {
    cell.classList.add('carrier');
  } else if (playGame.user.playerBoard.board[i] === 'battleship') {
    cell.classList.add('battleship');
  } else if (playGame.user.playerBoard.board[i] === 'cruiser') {
    cell.classList.add('cruiser');
  } else if (playGame.user.playerBoard.board[i] === 'submarine') {
    cell.classList.add('submarine');
  } else if (playGame.user.playerBoard.board[i] === 'destroyer') {
    cell.classList.add('destroyer');
  } else if (playGame.user.playerBoard.board[i] === 'miss') {
    cell.classList.add('miss');
  } else if (playGame.user.playerBoard.board[i] === 'hit') {
    cell.classList.add('hit');
  }
};

const setComputerCellClasses = (cell, i) => {
  if (playGame.computer.playerBoard.board[i] === 'carrier') {
    cell.classList.add('carrier');
  } else if (playGame.computer.playerBoard.board[i] === 'battleship') {
    cell.classList.add('battleship');
  } else if (playGame.computer.playerBoard.board[i] === 'cruiser') {
    cell.classList.add('cruiser');
  } else if (playGame.computer.playerBoard.board[i] === 'submarine') {
    cell.classList.add('submarine');
  } else if (playGame.computer.playerBoard.board[i] === 'destroyer') {
    cell.classList.add('destroyer');
  } else if (playGame.computer.playerBoard.board[i] === 'miss') {
    cell.classList.add('miss');
  } else if (playGame.computer.playerBoard.board[i] === 'hit') {
    cell.classList.add('hit');
  }
};

const handlePlacement = (cell, i) => {
  if (playGame.user.playerBoard.board[i] !== '') {
    return;
  }

  if (playGame.user.playerBoard.board[i] === '') {
    if (playGame.carrierIndexes.includes('')) {
      const index = playGame.carrierIndexes.indexOf('');
      if (playGame.user.playerBoard
        .checkIfLegalPlacement(playGame.carrierIndexes, index, i)) {
        playGame.carrierIndexes[index] = i;
        cell.className = 'cell carrier';
      }

      if (!playGame.carrierIndexes.includes('')) {
        playGame.user.playerBoard
          .placeShip(playGame.user.playerBoard.carrier, playGame.carrierIndexes);
        message.innerText = 'Carrier placed! Place your Battleship.';
      }
      return;
    }

    if (playGame.battleshipIndexes.includes('')) {
      const index = playGame.battleshipIndexes.indexOf('');
      if (playGame.user.playerBoard
        .checkIfLegalPlacement(playGame.battleshipIndexes, index, i)) {
        playGame.battleshipIndexes[index] = i;
        cell.className = 'cell battleship';
      }

      if (!playGame.battleshipIndexes.includes('')) {
        playGame.user.playerBoard
          .placeShip(playGame.user.playerBoard.battleship, playGame.battleshipIndexes);
        message.innerText = 'Battleship placed! Place your Cruiser.';
      }
      return;
    }

    if (playGame.cruiserIndexes.includes('')) {
      const index = playGame.cruiserIndexes.indexOf('');
      if (playGame.user.playerBoard
        .checkIfLegalPlacement(playGame.cruiserIndexes, index, i)) {
        playGame.cruiserIndexes[index] = i;
        cell.className = 'cell cruiser';
      }

      if (!playGame.cruiserIndexes.includes('')) {
        playGame.user.playerBoard
          .placeShip(playGame.user.playerBoard.cruiser, playGame.cruiserIndexes);
        message.innerText = 'Cruiser placed! Place your Submarine.';
      }
      return;
    }

    if (playGame.submarineIndexes.includes('')) {
      const index = playGame.submarineIndexes.indexOf('');
      if (playGame.user.playerBoard
        .checkIfLegalPlacement(playGame.submarineIndexes, index, i)) {
        playGame.submarineIndexes[index] = i;
        cell.className = 'cell submarine';
      }

      if (!playGame.submarineIndexes.includes('')) {
        playGame.user.playerBoard
          .placeShip(playGame.user.playerBoard.submarine, playGame.submarineIndexes);
        message.innerText = 'Submarine placed! Place your Destroyer.';
      }
      return;
    }

    if (playGame.destroyerIndexes.includes('')) {
      const index = playGame.destroyerIndexes.indexOf('');
      if (playGame.user.playerBoard
        .checkIfLegalPlacement(playGame.destroyerIndexes, index, i)) {
        playGame.destroyerIndexes[index] = i;
        cell.className = 'cell destroyer';
      }

      if (!playGame.destroyerIndexes.includes('')) {
        playGame.user.playerBoard
          .placeShip(playGame.user.playerBoard.destroyer, playGame.destroyerIndexes);
        message.innerText = 'Destroyer placed! Click the enemy\'s board to attack and begin the game.';
      }
    }

    if (playGame.user.playerBoard.allPlaced() === true) {
      preGame = false;
    }
  }
};

const handleClick = (cell, i) => {
  if (preGame === true && cell.className === 'cell' && cell.parentNode === userContainer) {
    handlePlacement(cell, i);
    return;
  }

  if ((playGame.gameOver === true
    || playGame.computer.playerBoard.board[i] === 'miss'
    || playGame.computer.playerBoard.board[i] === 'hit')) {
    return;
  }

  if (preGame === false && playGame.gameOver === false && cell.parentNode !== userContainer) {
    playGame.playRound(i);

    if (playGame.computer.playerBoard.board[i] === 'miss') {
      handleMiss(cell);
    } else if (playGame.computer.playerBoard.board[i] !== '') {
      handleHit(cell);
    }
  }
};

function handleMiss(cell) {
  cell.className = 'cell miss';
  message.innerText = 'Missed!';
};

function handleHit(cell) {
  cell.className = 'cell hit';
  message.innerText = 'Direct hit!';
};

const setWinnerMessage = (winner) => {
  if (winner === playGame.computer) {
    message.innerText = 'You lose! Game over.';
  }

  if (winner === playGame.user) {
    message.innerText = 'You win!';
  }
};

createComputerBoard();
createUserBoard();
