/*------------------------ Cached Element References ------------------------*/

const mainContainer = document.querySelector(`.main-container`);

const month = document.querySelector(`.month`);
const dates = document.querySelectorAll(`.date`);

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

/*-------------------------------- Constants --------------------------------*/

const keys = {
  39: `right`,
  37: `left`,
  40: `down`,
  38: `up`,
  32: `space`,
  27: `escape`,
};

// const tileSize = programmer.clientWidth;
const tileSize = 48;
const outerWallThickness = {right: 1, left: 1, bottom: 1, top: 2};
// const mapSize = {
//   x: pixelTranslator(screen.clientWidth),
//   y: pixelTranslator(screen.clientHeight),
// };
const mapSize = {
  x: 24,
  y: 13,
};

monthTable = {
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
  Dec: [`December`, 31]
};
let daysInFirstWeekRemaining;
let dateSelector;
let todayMonth = Date().split(` `)[1]
  month.innerHTML = monthTable[`${todayMonth}`][0];
let todayDay = Date().split(` `)[0];
let todayDate = +Date().split(` `)[2];
let monthTableKeys = Object.keys(monthTable);
let nextMonthIndex = monthTableKeys.indexOf(todayMonth) + 1;
if (nextMonthIndex === 12) {
  nextMonth = monthTableKeys[0];
} else {
  nextMonth = monthTableKeys[nextMonthIndex];
};
dates.forEach(date => {
  if (todayDay === `Sun` && date === dates[0]) {
    dates[0].innerHTML = todayDate;
    dates[1].innerHTML = todayDate + 1;
    dates[2].innerHTML = todayDate + 2;
    dates[3].innerHTML = todayDate + 3;
    dates[4].innerHTML = todayDate + 4;
    dates[5].innerHTML = todayDate + 5;
    dates[6].innerHTML = todayDate + 6;
    todayDate += 6;
    daysInFirstWeekRemaining = 7;
    dateSelector = 0;
  } else if (todayDay === `Mon` && date === dates[1]) {
    dates[0].innerHTML = todayDate - 1;
    dates[1].innerHTML = todayDate;
    dates[2].innerHTML = todayDate + 1;
    dates[3].innerHTML = todayDate + 2;
    dates[4].innerHTML = todayDate + 3;
    dates[5].innerHTML = todayDate + 4;
    dates[6].innerHTML = todayDate + 5;
    todayDate += 5;
    daysInFirstWeekRemaining = 6;
    dateSelector = 1;
  } else if (todayDay === `Tue` && date === dates[2]) {
    dates[0].innerHTML = todayDate - 2;
    dates[1].innerHTML = todayDate - 1;
    dates[2].innerHTML = todayDate;
    dates[3].innerHTML = todayDate + 1;
    dates[4].innerHTML = todayDate + 2;
    dates[5].innerHTML = todayDate + 3;
    dates[6].innerHTML = todayDate + 4;
    todayDate += 4;
    daysInFirstWeekRemaining = 5;
    dateSelector = 2;
  } else if (todayDay === `Wed` && date === dates[3]) {
    dates[0].innerHTML = todayDate - 3;
    dates[1].innerHTML = todayDate - 2;
    dates[2].innerHTML = todayDate - 1;
    dates[3].innerHTML = todayDate;
    dates[4].innerHTML = todayDate + 1;
    dates[5].innerHTML = todayDate + 2;
    dates[6].innerHTML = todayDate + 3;
    todayDate += 3;
    daysInFirstWeekRemaining = 4;
    dateSelector = 3;
  } else if (todayDay === `Thu` && date === dates[4]) {
    dates[0].innerHTML = todayDate - 4;
    dates[1].innerHTML = todayDate - 3;
    dates[2].innerHTML = todayDate - 2;
    dates[3].innerHTML = todayDate - 1;
    dates[4].innerHTML = todayDate;
    dates[5].innerHTML = todayDate + 1;
    dates[6].innerHTML = todayDate + 2;
    todayDate += 2;
    daysInFirstWeekRemaining = 3;
    dateSelector = 4;
  } else if (todayDay === `Fri` && date === dates[5]) {
    dates[0].innerHTML = todayDate - 5;
    dates[1].innerHTML = todayDate - 4;
    dates[2].innerHTML = todayDate - 3;
    dates[3].innerHTML = todayDate - 2;
    dates[4].innerHTML = todayDate - 1;
    dates[5].innerHTML = todayDate;
    dates[6].innerHTML = todayDate + 1;
    todayDate += 1;
    daysInFirstWeekRemaining = 2;
    dateSelector = 5;
  } else if (todayDay === `Sat` && date === dates[6]) {
    dates[0].innerHTML = todayDate - 6;
    dates[1].innerHTML = todayDate - 5;
    dates[2].innerHTML = todayDate - 4;
    dates[3].innerHTML = todayDate - 3;
    dates[4].innerHTML = todayDate - 2;
    dates[5].innerHTML = todayDate - 1;
    dates[6].innerHTML = todayDate;
    daysInFirstWeekRemaining = 1;
    dateSelector = 6;
  };
});

/*---------------------------- Variables (state) ----------------------------*/  

let terminalsRemaining = 20;
let daysRemaining = 30;

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
  // spriteDim: {x: programmer.clientWidth, y: programmer.clientHeight},
  spriteDim: {x: 48, y: 96},
  posX: 2,
  posY: 2,
  speedTilesPerPress: 1,
  // runAnimationDuration: +getComputedStyle(programmerAura).transitionDuration.replace(`s`, ``) * 1000,
  runAnimationDuration: 200,
  step: 1,
  changeLayer() {
    if (tiles[`${this.posX}-${this.posY}`].top) {
      programmerAura.style.zIndex = `1`;
    } else {
      programmerAura.style.zIndex = `-1`;
    };
  },
  turn(key) {
    if (key === `right` || key === `left` || key === `down` || key === `up`)
      programmer.src = `./assets/sprite_idle_${key}.gif`;
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

/*-------------------------------- Functions --------------------------------*/
console.log(computer.classList[1]);
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
    } else if (key === `space` && tiles[`${sprite.posX}-${sprite.posY}`].terminal && terminals[`${sprite.posX}-${sprite.posY}`].bug && programmer.src === `http://127.0.0.1:5500/assets/sprite_idle_up.gif`) {
      computer.classList.remove(`computer-hidden`);
      terminalsRemaining--;
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
        terminals[`${x}-${y}`] = {bug: false, problem: problem, solution: solution};
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
  setTimeout(() => {
    dates.forEach(date => {
      if (todayDate < monthTable[`${todayMonth}`][1]) {
        date.innerHTML = `${todayDate += 1}`;
      } else {
        month.innerHTML = monthTable[`${nextMonth}`][0];
        todayMonth = nextMonth;
        nextMonthIndex = monthTableKeys.indexOf(todayMonth) + 1;
        if (nextMonthIndex === 12) {
          nextMonth = monthTableKeys[0];
        } else {
          nextMonth = monthTableKeys[nextMonthIndex];
        };
        todayDate = 0;
        date.innerHTML = `${todayDate += 1}`;
      };
    });
    setInterval(() => {
      dates.forEach(date => {
        if (todayDate < monthTable[`${todayMonth}`][1]) {
          date.innerHTML = `${todayDate += 1}`;
        } else {
          month.innerHTML = monthTable[`${nextMonth}`][0];
          todayMonth = nextMonth;
          nextMonthIndex = monthTableKeys.indexOf(todayMonth) + 1;
          if (nextMonthIndex === 12) {
            nextMonth = monthTableKeys[0];
          } else {
            nextMonth = monthTableKeys[nextMonthIndex];
          };
          todayDate = 0;
          date.innerHTML = `${todayDate += 1}`;
        };
      });
    }, 7000);
  }, daysInFirstWeekRemaining * 1000);
  dates[dateSelector].classList.add(`highlight-date`);
  dateSelector++;
  setInterval(() => {
    daysRemaining--;
    if (dateSelector < 7 && dateSelector > 0) {
      dates[dateSelector].classList.add(`highlight-date`);
      dates[dateSelector - 1].classList.remove(`highlight-date`);
      dateSelector++;
    } else {
      dateSelector = 0;
      dates[dateSelector].classList.add(`highlight-date`);
      dates[6].classList.remove(`highlight-date`);
      dateSelector++;
    };
  }, 1000);
};

let terminalKeys = Object.keys(terminals);

function bugRandomTerminal() {
  let randomIdx = Math.floor(Math.random() * terminalImages.length);
  terminals[terminalKeys[randomIdx]].nodeSrc.src = `./assets/desk-1-true.gif`;
  terminals[terminalKeys[randomIdx]].bug = true;
  terminalScreen.value = terminals[terminalKeys[randomIdx]].problem;
};

terminalImages.forEach((terminalImg, idx) => {
  terminals[terminalKeys[idx]].nodeSrc = terminalImg;
});

function runTests() {
  testButton.removeEventListener(`click`, handleClick);
  testStatus.classList.remove(`failed`);
  let solutionText = terminalScreen.value;
  console.log("🚀 ~ file: app.js:392 ~ runTests ~ solutionText", solutionText)
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

bugRandomTerminal();
// deadlineTimer();