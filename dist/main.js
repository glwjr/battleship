/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nconst Gameboard = () => {\n  const board = new Array(100).fill('');\n  const carrier = (0,_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('carrier', 5);\n  const battleship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('battleship', 5);\n  const cruiser = (0,_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('cruiser', 3);\n  const submarine = (0,_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('submarine', 3);\n  const destroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('destroyer', 2);\n  const shipMap = [carrier, battleship, cruiser, submarine, destroyer];\n\n  const placeShip = (ship, positionArray) => {\n    for (let i = 0; i < ship.getLength(); i += 1) {\n      board[positionArray[i]] = ship.getType();\n    }\n    ship.setPosition(positionArray);\n  };\n\n  const checkIfLegalPlacement = (shipArray, availableIndex, cellIndex) => {\n    let isVertical;\n\n    if (shipArray[0] === '') {\n      return true;\n    }\n\n    if (shipArray[1] === '') {\n      if (cellIndex === shipArray[0] - 1\n        || cellIndex === shipArray[0] + 1\n        || cellIndex === shipArray[0] - 10\n        || cellIndex === shipArray[0] + 10) {\n        return true;\n      }\n    }\n\n    if (availableIndex > 1) {\n      const sortedArray = shipArray.sort((a, b) => {\n        if (typeof a === 'string') {\n          return 1;\n        }\n        if (typeof b === 'string') {\n          return -1;\n        }\n        return a - b;\n      });\n      const max = Math.max(...sortedArray);\n      const min = sortedArray[0];\n\n      if (shipArray[1] === shipArray[0] - 10 || shipArray[1] === shipArray[0] + 10) {\n        isVertical = true;\n      } else {\n        isVertical = false;\n      }\n\n      if (isVertical === true\n      && board[cellIndex + 1] === ''\n      && (cellIndex === min - 10\n      || cellIndex === max + 10)) {\n        return true;\n      }\n\n      if (isVertical === false\n      && (cellIndex === min - 1\n      || cellIndex === max + 1)) {\n        return true;\n      }\n    }\n\n    return false;\n  };\n\n  const checkIfValidRandom = (ship, index) => {\n    let isVertical;\n\n    if (index % 2 === 0) {\n      isVertical = false;\n    } else {\n      isVertical = true;\n    }\n\n    if (isVertical === false && validHorizontal(ship, index) === true) {\n      return true;\n    }\n\n    if (isVertical === true && validVertical(ship, index) === true) {\n      return true;\n    }\n    return false;\n  };\n\n  const validVertical = (ship, index) => {\n    const verticalArray = new Array(ship.getLength()).fill('');\n    for (let i = 0, n = 0; i < ship.getLength(); i += 1, n += 10) {\n      verticalArray[i] = index + n;\n    }\n    if (verticalArray.every((value) => board[value] === ''\n      && board[value + 1] === ''\n      && board[value - 1] === ''\n      && board[value + 10] === ''\n      && board[value - 10] === ''\n      && value < 99)) {\n      return true;\n    }\n    return false;\n  };\n\n  const validHorizontal = (ship, index) => {\n    const horizontalArray = new Array(ship.getLength()).fill('');\n    for (let i = 0; i < ship.getLength(); i += 1) {\n      horizontalArray[i] = index + i;\n    }\n    if (horizontalArray.every((value) => board[value] === ''\n      && board[value + 1] === ''\n      && board[value - 1] === ''\n      && board[value + 10] === ''\n      && board[value - 10] === ''\n      && value < 99\n      && horizontalArray[0] % 10 < horizontalArray[ship.getLength() - 1] % 10)) {\n      return true;\n    }\n    return false;\n  };\n\n  const placeShipRandomly = (ship) => {\n    let randomIndex = Math.floor(Math.random() * (100 - ship.getLength()));\n    const randomArray = new Array(ship.getLength()).fill('');\n    while (!checkIfValidRandom(ship, randomIndex)) {\n      randomIndex = Math.floor(Math.random() * (100 - ship.getLength()));\n    }\n\n    if (randomIndex % 2 === 0) {\n      for (let i = 0; i < ship.getLength(); i += 1) {\n        randomArray[i] = randomIndex + i;\n        board[randomArray[i]] = ship.getType();\n      }\n    } else if (randomIndex % 2 !== 0) {\n      for (let i = 0, n = 0; i < ship.getLength(); i += 1, n += 10) {\n        randomArray[i] = randomIndex + n;\n        board[randomArray[i]] = ship.getType();\n      }\n    }\n    ship.setPosition(randomArray);\n  };\n\n  const receiveAttack = (index) => {\n    if (board[index] !== '') {\n      if (board[index] === carrier.getType()) {\n        carrier.hit(index);\n      } else if (board[index] === battleship.getType()) {\n        battleship.hit(index);\n      } else if (board[index] === cruiser.getType()) {\n        cruiser.hit(index);\n      } else if (board[index] === submarine.getType()) {\n        submarine.hit(index);\n      } else if (board[index] === destroyer.getType()) {\n        destroyer.hit(index);\n      }\n      board[index] = 'hit';\n    } else if (board[index] === '') {\n      board[index] = 'miss';\n    }\n  };\n\n  const allPlaced = () => shipMap.every((ship) => ship.isPlaced() === true);\n\n  const allSunk = () => shipMap.every((ship) => ship.isSunk() === true);\n\n  return {\n    board,\n    carrier,\n    battleship,\n    cruiser,\n    submarine,\n    destroyer,\n    placeShip,\n    checkIfLegalPlacement,\n    placeShipRandomly,\n    receiveAttack,\n    allPlaced,\n    allSunk,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\nconst playGame = (() => {\n  const user = (0,_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('user');\n  const computer = (0,_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('computer');\n  const carrierIndexes = new Array(5).fill('');\n  const battleshipIndexes = new Array(5).fill('');\n  const cruiserIndexes = new Array(3).fill('');\n  const submarineIndexes = new Array(3).fill('');\n  const destroyerIndexes = new Array(2).fill('');\n  let gameOver = false;\n\n  const playRound = (attackIndex) => {\n    checkWinner();\n\n    if (gameOver === true) {\n      return;\n    }\n\n    if (gameOver === false) {\n      user.attack(computer, attackIndex);\n      checkWinner();\n\n      if (gameOver === false) {\n        computer.randomAttack(user);\n        createUserBoard();\n        checkWinner();\n      }\n    }\n  };\n\n  const checkWinner = () => {\n    if (user.playerBoard.allSunk() === true) {\n      gameOver = true;\n      setWinnerMessage(computer);\n    }\n    if (computer.playerBoard.allSunk() === true) {\n      gameOver = true;\n      setWinnerMessage(user);\n    }\n  };\n\n  computer.playerBoard.placeShipRandomly(computer.playerBoard.carrier);\n  computer.playerBoard.placeShipRandomly(computer.playerBoard.battleship);\n  computer.playerBoard.placeShipRandomly(computer.playerBoard.cruiser);\n  computer.playerBoard.placeShipRandomly(computer.playerBoard.submarine);\n  computer.playerBoard.placeShipRandomly(computer.playerBoard.destroyer);\n\n  return {\n    user,\n    computer,\n    carrierIndexes,\n    battleshipIndexes,\n    cruiserIndexes,\n    submarineIndexes,\n    destroyerIndexes,\n    playRound,\n    gameOver,\n  };\n})();\n\nlet preGame = true;\nconst userContainer = document.getElementById('user-container');\nconst computerContainer = document.getElementById('computer-container');\nconst message = document.getElementById('message');\n\nfunction createUserBoard() {\n  userContainer.innerHTML = '';\n  userContainer.style.gridTemplateColumns = 'repeat(10, 1fr)';\n  for (let i = 0; i < 100; i += 1) {\n    const cell = document.createElement('div');\n    cell.classList.add('cell');\n    setUserCellClasses(cell, i);\n    userContainer.appendChild(cell);\n    cell.addEventListener('click', () => handleClick(cell, i));\n  }\n}\n\nfunction createComputerBoard() {\n  computerContainer.innerHTML = '';\n  computerContainer.style.gridTemplateColumns = 'repeat(10, 1fr)';\n  for (let i = 0; i < 100; i += 1) {\n    const cell = document.createElement('div');\n    cell.classList.add('cell');\n    setComputerCellClasses(cell, i);\n    computerContainer.appendChild(cell);\n    cell.addEventListener('click', () => handleClick(cell, i));\n  }\n}\n\nconst setUserCellClasses = (cell, i) => {\n  if (playGame.user.playerBoard.board[i] === 'carrier') {\n    cell.classList.add('carrier');\n  } else if (playGame.user.playerBoard.board[i] === 'battleship') {\n    cell.classList.add('battleship');\n  } else if (playGame.user.playerBoard.board[i] === 'cruiser') {\n    cell.classList.add('cruiser');\n  } else if (playGame.user.playerBoard.board[i] === 'submarine') {\n    cell.classList.add('submarine');\n  } else if (playGame.user.playerBoard.board[i] === 'destroyer') {\n    cell.classList.add('destroyer');\n  } else if (playGame.user.playerBoard.board[i] === 'miss') {\n    cell.classList.add('miss');\n  } else if (playGame.user.playerBoard.board[i] === 'hit') {\n    cell.classList.add('hit');\n  }\n};\n\nconst setComputerCellClasses = (cell, i) => {\n  if (playGame.computer.playerBoard.board[i] === 'carrier') {\n    cell.classList.add('carrier');\n  } else if (playGame.computer.playerBoard.board[i] === 'battleship') {\n    cell.classList.add('battleship');\n  } else if (playGame.computer.playerBoard.board[i] === 'cruiser') {\n    cell.classList.add('cruiser');\n  } else if (playGame.computer.playerBoard.board[i] === 'submarine') {\n    cell.classList.add('submarine');\n  } else if (playGame.computer.playerBoard.board[i] === 'destroyer') {\n    cell.classList.add('destroyer');\n  } else if (playGame.computer.playerBoard.board[i] === 'miss') {\n    cell.classList.add('miss');\n  } else if (playGame.computer.playerBoard.board[i] === 'hit') {\n    cell.classList.add('hit');\n  }\n};\n\nconst handlePlacement = (cell, i) => {\n  if (playGame.user.playerBoard.board[i] !== '') {\n    return;\n  }\n\n  if (playGame.user.playerBoard.board[i] === '') {\n    if (playGame.carrierIndexes.includes('')) {\n      const index = playGame.carrierIndexes.indexOf('');\n      if (playGame.user.playerBoard\n        .checkIfLegalPlacement(playGame.carrierIndexes, index, i)) {\n        playGame.carrierIndexes[index] = i;\n        cell.className = 'cell carrier';\n      }\n\n      if (!playGame.carrierIndexes.includes('')) {\n        playGame.user.playerBoard\n          .placeShip(playGame.user.playerBoard.carrier, playGame.carrierIndexes);\n        message.innerText = 'Carrier placed! Place your Battleship.';\n      }\n      return;\n    }\n\n    if (playGame.battleshipIndexes.includes('')) {\n      const index = playGame.battleshipIndexes.indexOf('');\n      if (playGame.user.playerBoard\n        .checkIfLegalPlacement(playGame.battleshipIndexes, index, i)) {\n        playGame.battleshipIndexes[index] = i;\n        cell.className = 'cell battleship';\n      }\n\n      if (!playGame.battleshipIndexes.includes('')) {\n        playGame.user.playerBoard\n          .placeShip(playGame.user.playerBoard.battleship, playGame.battleshipIndexes);\n        message.innerText = 'Battleship placed! Place your Cruiser.';\n      }\n      return;\n    }\n\n    if (playGame.cruiserIndexes.includes('')) {\n      const index = playGame.cruiserIndexes.indexOf('');\n      if (playGame.user.playerBoard\n        .checkIfLegalPlacement(playGame.cruiserIndexes, index, i)) {\n        playGame.cruiserIndexes[index] = i;\n        cell.className = 'cell cruiser';\n      }\n\n      if (!playGame.cruiserIndexes.includes('')) {\n        playGame.user.playerBoard\n          .placeShip(playGame.user.playerBoard.cruiser, playGame.cruiserIndexes);\n        message.innerText = 'Cruiser placed! Place your Submarine.';\n      }\n      return;\n    }\n\n    if (playGame.submarineIndexes.includes('')) {\n      const index = playGame.submarineIndexes.indexOf('');\n      if (playGame.user.playerBoard\n        .checkIfLegalPlacement(playGame.submarineIndexes, index, i)) {\n        playGame.submarineIndexes[index] = i;\n        cell.className = 'cell submarine';\n      }\n\n      if (!playGame.submarineIndexes.includes('')) {\n        playGame.user.playerBoard\n          .placeShip(playGame.user.playerBoard.submarine, playGame.submarineIndexes);\n        message.innerText = 'Submarine placed! Place your Destroyer.';\n      }\n      return;\n    }\n\n    if (playGame.destroyerIndexes.includes('')) {\n      const index = playGame.destroyerIndexes.indexOf('');\n      if (playGame.user.playerBoard\n        .checkIfLegalPlacement(playGame.destroyerIndexes, index, i)) {\n        playGame.destroyerIndexes[index] = i;\n        cell.className = 'cell destroyer';\n      }\n\n      if (!playGame.destroyerIndexes.includes('')) {\n        playGame.user.playerBoard\n          .placeShip(playGame.user.playerBoard.destroyer, playGame.destroyerIndexes);\n        message.innerText = 'Destroyer placed! Click the enemy\\'s board to attack and begin the game.';\n      }\n    }\n\n    if (playGame.user.playerBoard.allPlaced() === true) {\n      preGame = false;\n    }\n  }\n};\n\nconst handleClick = (cell, i) => {\n  if (preGame === true && cell.className === 'cell' && cell.parentNode === userContainer) {\n    handlePlacement(cell, i);\n    return;\n  }\n\n  if ((playGame.gameOver === true\n    || playGame.computer.playerBoard.board[i] === 'miss'\n    || playGame.computer.playerBoard.board[i] === 'hit')) {\n    return;\n  }\n\n  if (preGame === false && playGame.gameOver === false && cell.parentNode !== userContainer) {\n    playGame.playRound(i);\n\n    if (playGame.computer.playerBoard.board[i] === 'miss') {\n      handleMiss(cell);\n    } else if (playGame.computer.playerBoard.board[i] !== '') {\n      handleHit(cell);\n    }\n  }\n};\n\nfunction handleMiss(cell) {\n  cell.className = 'cell miss';\n  message.innerText = 'Missed!';\n};\n\nfunction handleHit(cell) {\n  cell.className = 'cell hit';\n  message.innerText = 'Direct hit!';\n};\n\nconst setWinnerMessage = (winner) => {\n  if (winner === playGame.computer) {\n    message.innerText = 'You lose! Game over.';\n  }\n\n  if (winner === playGame.user) {\n    message.innerText = 'You win!';\n  }\n};\n\ncreateComputerBoard();\ncreateUserBoard();\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\n\nconst Player = (name) => {\n  const getPlayer = () => name;\n  const playerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n  const attack = (enemy, index) => {\n    enemy.playerBoard.receiveAttack(index);\n  };\n\n  const randomAttack = (enemy) => {\n    let randomIndex = Math.floor(Math.random() * (100));\n    while (enemy.playerBoard.board[randomIndex] === 'hit' || enemy.playerBoard.board[randomIndex] === 'miss') {\n      randomIndex = Math.floor(Math.random() * (100));\n    }\n    enemy.playerBoard.receiveAttack(randomIndex);\n  };\n\n  return {\n    playerBoard, getPlayer, attack, randomAttack,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Ship = (type, length) => {\n  const position = new Array(length).fill('');\n\n  const getType = () => type;\n  const getLength = () => length;\n\n  const setPosition = (array) => {\n    for (let i = 0; i < position.length; i += 1) {\n      if (position[i] === '') {\n        position[i] = array[i];\n      }\n    }\n  };\n\n  const hit = (hitIndex) => {\n    const index = position.indexOf(hitIndex);\n    if (index > -1) {\n      position[index] = 'hit';\n    }\n  };\n\n  const isPlaced = () => position.every((value) => value !== '');\n\n  const isSunk = () => position.every((value) => value === 'hit');\n\n  return {\n    position, getType, getLength, setPosition, hit, isSunk, isPlaced,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;