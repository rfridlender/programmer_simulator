import { assignRandomBug } from "./bugs.js";

/*------------------------ Cached Element References ------------------------*/

const mainContainer = document.querySelector(`.main-container`);

const currentMonth = document.querySelector(`.current-month`);
const currentDate = document.querySelector(`.current-date`);
const deadlineMonth = document.querySelector(`.deadline-month`);
const deadlineDate = document.querySelector(`.deadline-date`);

const messageContainer = document.querySelector(`.message-container`);
const startSettings = document.querySelector(`.start-settings`);

const message = document.querySelector(`.message`);
const playAgain = document.querySelector(`.play-again`);


const startButton = document.querySelector(`.start-button`);
const deadlineRemainingBox = document.querySelector(`.deadline-remaining`);
const bugsRemainingBox = document.querySelector(`.bugs-remaining`);

const currentContainer = document.querySelector(`.current-container`);
const deadlineContainer = document.querySelector(`.deadline-container`);

const programmerAura = document.querySelector(`.sprite`);
const programmer = document.querySelector(`.sprite-image`);
const screen = document.querySelector(`.screen`);
const deskImages = document.querySelectorAll(`.desk`); 

const computer = document.querySelector(`.computer`);
const terminalScreen = document.querySelector(`.code`);
const terminalImages = document.querySelectorAll(`.terminal`);
const testButton = document.querySelector(`.test-button`);
const testStatus = document.querySelector(`.test-status`);

let problem = 
`let sandwich = document.querySelector('.sandwich');

if (sandwich.id = 'tuna') {
  // Do something...
}`;
let solution = 
`let sandwich = document.querySelector('.sandwich');

if (sandwich.id === 'tuna') {
  // Do something...
}`;

console.log(assignRandomBug());

/*-------------------------------- Constants --------------------------------*/

const keys = {
  39: `right`,
  37: `left`,
  40: `down`,
  38: `up`,
  32: `space`,
  27: `escape`,
};

const tileSize = 48;
const outerWallThickness = {right: 1, left: 1, bottom: 1, top: 2};
const mapSize = {
  x: 24,
  y: 13,
};

const monthTable = {
  Jan: [`January`, 31],
  Feb: [`February`, 28],
  Mar: [`March`, 31],
  Apr: [`April`, 30],
  May: [`May`, 31],
  Jun: [`June`, 30],
  Jul: [`July`, 31],
  Aug: [`August`, 31],
  Sep: [`September`, 30],
  Oct: [`October`, 31],
  Nov: [`November`, 30],
  Dec: [`December`, 31],
};
let todayMonth = Date().split(` `)[1];
let todayDate = +Date().split(` `)[2];
let monthTableKeys = Object.keys(monthTable);
let nextMonthIndex = monthTableKeys.indexOf(todayMonth) + 1;
if (nextMonthIndex === 12) {
  let nextMonth = monthTableKeys[0];
} else {
  nextMonth = monthTableKeys[nextMonthIndex];
};

/*---------------------------- Variables (state) ----------------------------*/  

let bugsRemaining, daysRemaining;
let winner = false;
let gameOver = false;

/*---------------------------- Classses / Object ----------------------------*/

const terminals = {};

const desks = [
  [2, 3, 11, 6, 3, 6],
  [12, 3, 21, 6, 3, 6],
  [2, 7, 11, 10, 3, 6],
  [12, 7, 21, 10, 3, 6],
];

const tiles = {};

for (let x = 0; x < mapSize.x; x++) {
  for (let y = 0; y < mapSize.y; y++) {
    if (x === outerWallThickness.left && y === outerWallThickness.top) {
      tiles[`${x}-${y}`] = {right: false, left: true, bottom: false, top: true, terminal: false};
    } else if (x === mapSize.x - outerWallThickness.right - 1 && y === outerWallThickness.top) {
      tiles[`${x}-${y}`] = {right: true, left: false, bottom: false, top: true, terminal: false};
    } else if (x === outerWallThickness.left && y === mapSize.y - outerWallThickness.bottom - 1) {
      tiles[`${x}-${y}`] = {right: false, left: true, bottom: true, top: false, terminal: false};
    } else if (x === mapSize.x - outerWallThickness.right - 1 && y === mapSize.y - outerWallThickness.bottom - 1) {
      tiles[`${x}-${y}`] = {right: true, left: false, bottom: true, top: false, terminal: false};
    } else if (x === outerWallThickness.left) {
      tiles[`${x}-${y}`] = {right: false, left: true, bottom: false, top: false, terminal: false};
    } else if (x === mapSize.x - outerWallThickness.right - 1) {
      tiles[`${x}-${y}`] = {right: true, left: false, bottom: false, top: false, terminal: false};
    } else if (y === outerWallThickness.top) {
      tiles[`${x}-${y}`] = {right: false, left: false, bottom: false, top: true, terminal: false};
    } else if (y === mapSize.y - outerWallThickness.bottom - 1) {
      tiles[`${x}-${y}`] = {right: false, left: false, bottom: true, top: false, terminal: false};
    } else {
      desks.forEach(desk => {
        assignDeskBoundaries(desk);
      });
    };
  };
};

const sprite = {
  spriteDim: {x: 48, y: 96},
  posX: 2,
  posY: 2,
  speedTilesPerPress: 1,
  runAnimationDuration: 200,
  step: 1,
  facing: `down`,
  changeLayer() {
    if (tiles[`${this.posX}-${this.posY}`].top) {
      programmerAura.style.zIndex = `1`;
    } else {
      programmerAura.style.zIndex = `-1`;
    };
  },
  turn(key) {
    if (key === `right` || key === `left` || key === `down` || key === `up`) {
      programmer.src = `./assets/sprite_idle_${key}.gif`;
      this.facing = key;
    };
  },
  moveRight() {
    programmerAura.style.left = `${pixelTranslator(this.posX) + (this.spriteDim.x * this.speedTilesPerPress)}px`;
    programmer.src = `./assets/sprite_run_right_${this.step}.gif`
    setTimeout(() => {
      programmer.src = `./assets/sprite_idle_right.gif`;
    }, this.runAnimationDuration);
    this.step *= -1;
    this.posX += this.speedTilesPerPress;
  },
  moveLeft() {
    programmerAura.style.left = `${pixelTranslator(this.posX) - (this.spriteDim.x * this.speedTilesPerPress)}px`;
    programmer.src = `./assets/sprite_run_left_${this.step}.gif`
    setTimeout(() => {
      programmer.src = `./assets/sprite_idle_left.gif`;
    }, this.runAnimationDuration);
    this.step *= -1;
    this.posX -= this.speedTilesPerPress;
  },
  moveDown() {
    programmerAura.style.top = `${(pixelTranslator(this.posY)) * this.speedTilesPerPress}px`;
    programmer.src = `./assets/sprite_run_down_${this.step}.gif`
    setTimeout(() => {
      programmer.src = `./assets/sprite_idle_down.gif`;
    }, this.runAnimationDuration);
    this.step *= -1;
    this.posY += this.speedTilesPerPress;
  },
  moveUp() {
    programmerAura.style.top = `${pixelTranslator(this.posY) - (this.spriteDim.y  * this.speedTilesPerPress)}px`;
    programmer.src = `./assets/sprite_run_up_${this.step}.gif`
    setTimeout(() => {
      programmer.src = `./assets/sprite_idle_up.gif`;
    }, this.runAnimationDuration);
    this.step *= -1;
    this.posY -= this.speedTilesPerPress;
  },
};

/*----------------------------- Event Listeners ----------------------------*/

document.addEventListener(`keydown`, handleKey);
testButton.addEventListener(`click`, handleClick);
startButton.addEventListener(`click`, startGame);
playAgain.addEventListener(`click`, startMenu);

/*-------------------------------- Functions --------------------------------*/

function handleKey(evt) {
  const key = keys[`${evt.keyCode}`];
  if (computer.classList[1] === `computer-hidden`) {
    sprite.turn(key);
    if (key === `right` && !tiles[`${sprite.posX}-${sprite.posY}`].right) {
      sprite.moveRight();
      sprite.changeLayer();
    } else if (key === `left` && !tiles[`${sprite.posX}-${sprite.posY}`].left) {
      sprite.moveLeft();
      sprite.changeLayer();
    } else if (key === `down` && !tiles[`${sprite.posX}-${sprite.posY}`].bottom) {
      sprite.moveDown();
      sprite.changeLayer();
    } else if (key === `up` && !tiles[`${sprite.posX}-${sprite.posY}`].top) {
      sprite.moveUp();
      sprite.changeLayer();
    } else if (key === `space` && tiles[`${sprite.posX}-${sprite.posY}`].terminal && terminals[`${sprite.posX}-${sprite.posY}`].bug && sprite.facing === `up`) {
      renderTerminalScreen();
      computer.classList.remove(`computer-hidden`);
    };
  };
  if (key === `escape`) {
    computer.classList.add(`computer-hidden`);
  };
};

function handleClick() {
  if (testButton.innerHTML === `TEST`) {
    runTests();
  } else if (testButton.innerHTML === `MERGE`) {
    runMerge();
  } else if (testButton.innerHTML === `MERGE COMPLETE`) {
    computer.classList.add(`computer-hidden`);
  };
};

function pixelTranslator(num) {
  return !(num % tileSize) ? num / tileSize : num * tileSize;
};

function assignDeskBoundaries(desk) {
  for (let x = desk[0]; x <= desk[2]; x++) {
    for (let y = desk[1]; y <= desk[3]; y++) {
      if (x === desk[0] + desk[4] && y === desk[3] || x === desk[0] + desk[5] && y === desk[3]) {
        tiles[`${x}-${y}`] = {right: false, left: false, bottom: false, top: true, terminal: true};
        terminals[`${x}-${y}`] = {bug: false, problem: assignRandomBug()[0], solution: assignRandomBug()[1]};
      } else if (x === desk[0] && y !== desk[1] && y !== desk[3]) {
        tiles[`${x}-${y}`] = {right: true, left: false, bottom: false, top: false, terminal: false};
      } else if (x === desk[2] && y !== desk[1] && y !== desk[3]) {
        tiles[`${x}-${y}`] = {right: false, left: true, bottom: false, top: false, terminal: false};
      } else if (y === desk[1] && x !== desk[0] && x !== desk[2]) {
        tiles[`${x}-${y}`] = {right: false, left: false, bottom: true, top: false, terminal: false};
      } else if (y === desk[3] && x !== desk[0] && x !== desk[2]) {
        tiles[`${x}-${y}`] = {right: false, left: false, bottom: false, top: true, terminal: false};
      } else {
        tiles[`${x}-${y}`] = {right: false, left: false, bottom: false, top: false, terminal: false};
      };
    };
  };
};

function deadlineTimer() {
  currentMonth.innerHTML = monthTable[todayMonth][0];
  currentDate.innerHTML = todayDate;
  let nextSimMonth;
  let nextSimMonthIndex = monthTableKeys.indexOf(todayMonth) + 1;
  if (nextSimMonthIndex === 12) {
    nextSimMonth = monthTableKeys[0];
  } else {
    nextSimMonth = monthTableKeys[nextMonthIndex];
  };
  const dayByDay = setInterval(() => {
    if (`${todayMonth} ${todayDate}` !== calculateDeadline() && winner === false) {
      if (checkAvailableTerminals().length === 8) {
        bugRandomTerminal();
      };
      if (todayDate < monthTable[todayMonth][1]) {
        todayDate++;
        currentDate.innerHTML = todayDate;
      } else {
        todayDate = 1;
        currentDate.innerHTML = todayDate;
        currentMonth.innerHTML = monthTable[nextSimMonth][0];
        todayMonth = nextSimMonth;
        nextSimMonthIndex = monthTableKeys.indexOf(todayMonth) + 1;
        nextSimMonth = monthTableKeys[nextSimMonthIndex];
      };
    } else {
      clearInterval(dayByDay);
      displayMessage();
    };
  }, 1000);
};

function calculateDeadline() {
  let startingDate = +Date().split(` `)[2];
  let startingMonth = Date().split(` `)[1]; 
  let nextSimMonthIndex = monthTableKeys.indexOf(startingMonth) + 1;
  for (let i = 0; i <= daysRemaining; i++) {
    if (startingDate <= monthTable[startingMonth][1]) {
      startingDate++;
    } else {
      if (nextSimMonthIndex === 12) {
        nextSimMonthIndex = 0;
      } else {
        nextSimMonthIndex += 1;
      };
      startingMonth = monthTableKeys[nextSimMonthIndex];
      startingDate = 1;
    };
  };
  deadlineMonth.innerHTML = monthTable[startingMonth][0];
  deadlineDate.innerHTML = startingDate;
  return `${startingMonth} ${startingDate}`;
};

function displayMessage() {
  playAgain.classList.remove(`hidden`);
  if (winner === false && gameOver === false) {
    message.innerHTML = `you missed the deadline.`
  } else {
    debugAllTerminals();
    message.innerHTML = `looks like you are ready for your next project.`
  };
  gameOver = true;
};

let terminalKeys = Object.keys(terminals);

function bugRandomTerminal() {
  let availableTerminalKeys = terminalKeys.filter(terminalKey => {
    if (terminals[terminalKey].bug === false) {
      return terminalKey;
    };
  });
  if (availableTerminalKeys.length) {
    let randomIdx = Math.floor(Math.random() * availableTerminalKeys.length);
    let buggyCode = assignRandomBug()
    terminals[availableTerminalKeys[randomIdx]].nodeSrc.src = `./assets/desk-1-true.gif`;
    terminals[availableTerminalKeys[randomIdx]].bug = true;
    terminals[availableTerminalKeys[randomIdx]].problem = buggyCode[0];
    terminals[availableTerminalKeys[randomIdx]].solution = buggyCode[1];
  };
};

function checkAvailableTerminals() {
  return terminalKeys.filter(terminalKey => {
    if (terminals[terminalKey].bug === false) {
      return terminalKey;
    };
  });
};

function debugTerminal() {
  bugsRemaining--;
  terminals[`${sprite.posX}-${sprite.posY}`].bug = false;
  terminals[`${sprite.posX}-${sprite.posY}`].nodeSrc.src = `./assets/desk-1-false.gif`;
  if (bugsRemaining === 0 && gameOver === false) {
    winner = true;
    displayMessage();
  };
};

function debugAllTerminals() {
  let terminalKeys = Object.keys(terminals);
  terminalKeys.forEach(terminalKey => {
    terminals[terminalKey].bug = false;
    terminals[terminalKey].nodeSrc.src = `./assets/desk-1-false.gif`;
  });
};

function renderTerminalScreen() {
  testButton.innerHTML = `TEST`;
  testStatus.classList.remove(`passed`);
  testStatus.classList.remove(`failed`);
  terminalScreen.value = terminals[`${sprite.posX}-${sprite.posY}`].problem;
};

terminalImages.forEach((terminalImg, idx) => {
  terminals[terminalKeys[idx]].nodeSrc = terminalImg;
});

function runTests() {
  testButton.removeEventListener(`click`, handleClick);
  testStatus.classList.remove(`failed`);
  let solutionText = terminalScreen.value;
  let testText = terminalScreen.value.split(``);
  let binaryText = testText.map(char => {
    return char = createRandomByte();
  });
  for (let i = 0; i < testText.length; ) {
    testText[0] = binaryText[0];
    setTimeout(() => {
      testText[i] = binaryText[i];
      terminalScreen.value = testText.join(` `);
    }, 25 * i++);
  };
  let interpreting = `INTERPRETING`;
  let loopNumber = 0;
  let testing = `TESTING`
  testButton.innerHTML = interpreting;
  const interpretAndTest = setInterval(() => {
    loopNumber++;
    if (loopNumber < 8) {
      if (interpreting.length < 15) {
        testButton.innerHTML = interpreting += `.`;
      } else {
        interpreting = `INTERPRETING`;
        testButton.innerHTML = interpreting;
      };
    } else {
      if (testButton.innerHTML === `INTERPRETING...`) {
        testButton.innerHTML = testing;
      } else {
        if (testing.length < 10) {
          testButton.innerHTML = testing += `.`;
        } else {
          testing = `TESTING`;
          testButton.innerHTML = testing;
        };
      };
    };
    if (loopNumber === 15) {
      terminalScreen.value = solutionText;
      displayResults();
      testButton.addEventListener(`click`, handleClick);
      clearInterval(interpretAndTest);
    };
  }, 300);
};

function displayResults() {
  if (terminalScreen.value === terminals[`${sprite.posX}-${sprite.posY}`].solution) {
    testStatus.innerHTML = `TEST PASSED`;
    testButton.innerHTML = `MERGE`;
    testStatus.classList.add(`passed`);
  } else {
    testStatus.innerHTML = `TEST FAILED`;
    testButton.innerHTML = `TEST`;
    testStatus.classList.add(`failed`);
  };
};

function runMerge() {
  testStatus.classList.remove(`passed`);
  let merging = `MERGING`;
  let loopNumber = 0;
  testButton.innerHTML = merging;
  const mergingProgress = setInterval(() => {
    loopNumber++;
    if (loopNumber < 8) {
      if (merging.length < 10) {
        testButton.innerHTML = merging += `.`;
      } else {
        merging = `MERGING`;
        testButton.innerHTML = merging;
      };
    } else {
      testButton.innerHTML = `MERGE COMPLETE`;
      debugTerminal();
      clearInterval(mergingProgress);
    };
  }, 300);
};

function createRandomByte() {
  let randomByte = ``
  for (let i = 0; i < 8; i++) {
    let randomBit;
    Math.random() < .5 ? randomBit = 0 : randomBit = 1;
    randomByte += randomBit;
  };
  return randomByte;
};

function startGame() {
  playAgain.classList.add(`hidden`);
  daysRemaining = +deadlineRemainingBox.value;
  bugsRemaining = +bugsRemainingBox.value;
  winner = false;
  gameOver = false;
  sprite.posX = 2;
  sprite.posY = 2;
  programmerAura.style.left = `96px`;
  programmerAura.style.top = `48px`;
  programmer.src = `./assets/sprite_idle_down.gif`;
  message.innerHTML = `looks like you got some bugs.<br>press arrow keys to move.<br>press spacebar to enter terminal.<br>press escape to escape terminal.`;
  todayMonth = Date().split(` `)[1];
  todayDate = +Date().split(` `)[2];
  nextMonthIndex = monthTableKeys.indexOf(todayMonth) + 1;
  if (nextMonthIndex === 12) {
    let nextMonth = monthTableKeys[0];
  } else {
    nextMonth = monthTableKeys[nextMonthIndex];
  };
  debugAllTerminals();
  const bugger = setInterval(() => {
    if (winner === false && gameOver === false) {
      bugRandomTerminal();
    } else {
      clearInterval(bugger);
    }
  }, 30000);
  deadlineTimer();
  calculateDeadline();
  startSettings.classList.toggle(`hidden`);
  messageContainer.classList.toggle(`hidden`);
  currentContainer.classList.toggle(`hidden`);
  deadlineContainer.classList.toggle(`hidden`);
  screen.classList.toggle(`hidden`);
  computer.classList.remove(`hidden`);
};

function startMenu() {
  startSettings.classList.toggle(`hidden`);
  messageContainer.classList.toggle(`hidden`);
  currentContainer.classList.toggle(`hidden`);
  deadlineContainer.classList.toggle(`hidden`);
  screen.classList.toggle(`hidden`);
  computer.classList.toggle(`hidden`);
};