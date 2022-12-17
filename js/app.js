/*------------------------ Cached Element References ------------------------*/

const mainContainer = document.querySelector(`.main-container`);
const programmerAura = document.querySelector(`.sprite`);
const programmer = document.querySelector(`.sprite-image`);
const screen = document.querySelector(`.screen`);
const deskImages = document.querySelectorAll(`.desk`); 

const computer = document.createElement(`div`);
  computer.classList.add(`computer`, `terminal-open`);
const terminalScreen = document.createElement(`textarea`);
  terminalScreen.classList.add(`terminal-screen`);
  terminalScreen.type = `text`;
  terminalScreen.value = `
  var sandwich = document.querySelector('.sandwich');

  // Wrong
  if (sandwich.id = 'tuna') {
    // Do something...
  }
  
  // Right
  if (sandwich.id === 'tuna') {
    // Do something...
  }`;
  computer.appendChild(terminalScreen);

/*-------------------------------- Constants --------------------------------*/

const keys = {
  39: `right`,
  37: `left`,
  40: `down`,
  38: `up`,
  32: `space`,
  27: `escape`,
};

const tileSize = programmer.clientWidth;
const outerWallThickness = {right: 1, left: 1, bottom: 1, top: 2};
const mapSize = {
  x: pixelTranslator(screen.clientWidth),
  y: pixelTranslator(screen.clientHeight),
};

/*---------------------------- Variables (state) ----------------------------*/  

let terminalsRemaining = 20;

/*---------------------------- Classses / Object ----------------------------*/


class Desk {
  constructor(termDistFromXMin, nodeSrc) {
    this.termDistFromXMin = termDistFromXMin;
    this.nodeSrc = nodeSrc;
  };
};

const desks = [];

deskImages.forEach(desk => {
  desks.push(new Desk([3, 6], desk));
});

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
        assignDeskBoundaries(obstacleRangeFinder(desk.nodeSrc), desk);
      });
    };
  };
};

const sprite = {
  spriteDim: {x: programmer.clientWidth, y: programmer.clientHeight},
  posX: 2,
  posY: 2,
  speedTilesPerPress: 1,
  runAnimationDuration: +getComputedStyle(programmerAura).transitionDuration.replace(`s`, ``) * 1000,
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
    console.log(`new pos`, this.posX, this.posY, tiles[`${sprite.posX}-${sprite.posY}`]);
  },
  moveLeft() {
    programmerAura.style.left = `${pixelTranslator(this.posX) - (this.spriteDim.x * this.speedTilesPerPress)}px`;
    programmer.src = `./assets/sprite_run_left_${this.step}.gif`
    setTimeout(() => {
      programmer.src = `./assets/sprite_idle_left.gif`;
    }, this.runAnimationDuration);
    this.step *= -1;
    this.posX -= this.speedTilesPerPress;
    console.log(`new pos`, this.posX, this.posY, tiles[`${sprite.posX}-${sprite.posY}`]);
  },
  moveDown() {
    programmerAura.style.top = `${(pixelTranslator(this.posY)) * this.speedTilesPerPress}px`;
    programmer.src = `./assets/sprite_run_down_${this.step}.gif`
    setTimeout(() => {
      programmer.src = `./assets/sprite_idle_down.gif`;
    }, this.runAnimationDuration);
    this.step *= -1;
    this.posY += this.speedTilesPerPress;
    console.log(`new pos`, this.posX, this.posY, tiles[`${sprite.posX}-${sprite.posY}`]);
  },
  moveUp() {
    programmerAura.style.top = `${pixelTranslator(this.posY) - (this.spriteDim.y  * this.speedTilesPerPress)}px`;
    programmer.src = `./assets/sprite_run_up_${this.step}.gif`
    setTimeout(() => {
      programmer.src = `./assets/sprite_idle_up.gif`;
    }, this.runAnimationDuration);
    this.step *= -1;
    this.posY -= this.speedTilesPerPress;
    console.log(`new pos`, this.posX, this.posY, tiles[`${sprite.posX}-${sprite.posY}`]);
  },
};

/*----------------------------- Event Listeners ----------------------------*/

document.addEventListener(`keydown`, handleKey);

/*-------------------------------- Functions --------------------------------*/

function handleKey(evt) {
  const key = keys[`${evt.keyCode}`];
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
  } else if (key === `space` && tiles[`${sprite.posX}-${sprite.posY}`].terminal && programmer.src === `http://127.0.0.1:5500/assets/sprite_idle_up.gif`) {
    computer.classList.replace(`terminal-close`, `terminal-open`);
    mainContainer.appendChild(computer);
    terminalsRemaining--;
  } else if (key === `escape`) {
    console.log(`working`);
    computer.classList.replace(`terminal-open`, `terminal-close`);

    setTimeout(() => {
      mainContainer.removeChild(computer);
    }, 500);

  };
};

function pixelTranslator(num) {
  return !(num % tileSize) ? num / tileSize : num * tileSize;
};

function obstacleRangeFinder(obstacleNode) {
  const pos = {xMin: null, xMax: null, yMin: null, yMax: null};
  pos.xMin = pixelTranslator(obstacleNode.offsetLeft);
  pos.xMax = pos.xMin + pixelTranslator(obstacleNode.clientWidth) - 1;
  pos.yMin = pixelTranslator(obstacleNode.offsetTop);
  pos.yMax = pos.yMin + pixelTranslator(obstacleNode.clientHeight) - 1;
  return pos;
};

function assignDeskBoundaries(obstacleRange, obstacleObject) {
  for (let x = obstacleRange.xMin; x <= obstacleRange.xMax; x++) {
    for (let y = obstacleRange.yMin; y <= obstacleRange.yMax; y++) {
      if (x === obstacleRange.xMin + obstacleObject.termDistFromXMin[0] && y === obstacleRange.yMax || x === obstacleRange.xMin + obstacleObject.termDistFromXMin[1] && y === obstacleRange.yMax) {
        tiles[`${x}-${y}`] = {right: false, left: false, bottom: false, top: true, terminal: true};
      } else if (x === obstacleRange.xMin && y !== obstacleRange.yMin && y !== obstacleRange.yMax) {
        tiles[`${x}-${y}`] = {right: true, left: false, bottom: false, top: false, terminal: false};
      } else if (x === obstacleRange.xMax && y !== obstacleRange.yMin && y !== obstacleRange.yMax) {
        tiles[`${x}-${y}`] = {right: false, left: true, bottom: false, top: false, terminal: false};
      } else if (y === obstacleRange.yMin && x !== obstacleRange.xMin && x !== obstacleRange.xMax) {
        tiles[`${x}-${y}`] = {right: false, left: false, bottom: true, top: false, terminal: false};
      } else if (y === obstacleRange.yMax && x !== obstacleRange.xMin && x !== obstacleRange.xMax) {
        tiles[`${x}-${y}`] = {right: false, left: false, bottom: false, top: true, terminal: false};
      } else {
        tiles[`${x}-${y}`] = {right: false, left: false, bottom: false, top: false, terminal: false};
      };
    };
  };
};