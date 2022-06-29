import Gameboard from './gameboard';

const Player = (name) => {
  const getPlayer = () => name;
  const playerBoard = Gameboard();

  const attack = (enemy, index) => {
    enemy.playerBoard.receiveAttack(index);
  };

  const randomAttack = (enemy) => {
    let randomIndex = Math.floor(Math.random() * (100));
    while (enemy.playerBoard.board[randomIndex] === 'hit' || enemy.playerBoard.board[randomIndex] === 'miss') {
      randomIndex = Math.floor(Math.random() * (100));
    }
    enemy.playerBoard.receiveAttack(randomIndex);
  };

  return {
    playerBoard, getPlayer, attack, randomAttack,
  };
};

export default Player;
