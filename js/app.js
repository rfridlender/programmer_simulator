/*------------------------ Cached Element References ------------------------*/

const programmerAura = document.querySelector(`.sprite`);
const programmer = document.querySelector(`.sprite-image`);
const screen = document.querySelector(`.screen`);

const desks = document.querySelectorAll(`.desk`);

const desk = document.querySelector(`.desk-one`);


/*-------------------------------- Constants --------------------------------*/

const keys = [
  {code: 39, name: `right`}, 
  {code: 37, name: `left`}, 
  {code: 40, name: `down`}, 
  {code: 38, name: `up`}
];
const tileSize = programmer.clientWidth;
const outerWallThickness = {right: 1, left: 1, bottom: 1, top: 2};
const mapSize = {
  x: pixelTranslator(screen.clientWidth),
  y: pixelTranslator(screen.clientHeight),
};

/*---------------------------- Variables (state) ----------------------------*/  


/*---------------------------- Classses / Object ----------------------------*/

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
        assignDeskBoundaries(obstacleRangeFinder(desk));
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
      programmer.src = `./assets/sprite_idle_${key.name}.gif`;
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
  const key = keys.find(key => key.code === evt.keyCode);
  if (!key) return;
  sprite.turn(key);
  if (key.name === `right` && !tiles[`${sprite.posX}-${sprite.posY}`].right) {
    sprite.moveRight();
    sprite.changeLayer();
  } else if (key.name === `left` && !tiles[`${sprite.posX}-${sprite.posY}`].left) {
    sprite.moveLeft();
    sprite.changeLayer();
  } else if (key.name === `down` && !tiles[`${sprite.posX}-${sprite.posY}`].bottom) {
    sprite.moveDown();
    sprite.changeLayer();
  } else if (key.name === `up` && !tiles[`${sprite.posX}-${sprite.posY}`].top) {
    sprite.moveUp();
    sprite.changeLayer();
  };
};


function pixelTranslator(num) {
  return !(num % tileSize) ? num / tileSize : num * tileSize;
};

console.log(`starting pos`, tiles[`${sprite.posX}-${sprite.posY}`]);







function obstacleRangeFinder(obstacleNode) {
  const pos = {xMin: null, xMax: null, yMin: null, yMax: null};
  pos.xMin = pixelTranslator(obstacleNode.offsetLeft);
  pos.xMax = pos.xMin + pixelTranslator(obstacleNode.clientWidth) - 1;
  pos.yMin = pixelTranslator(obstacleNode.offsetTop);
  pos.yMax = pos.yMin + pixelTranslator(obstacleNode.clientHeight) - 1;
  return pos;
};

function assignDeskBoundaries(obstacleRange) {
  for (let x = obstacleRange.xMin; x <= obstacleRange.xMax; x++) {
    for (let y = obstacleRange.yMin; y <= obstacleRange.yMax; y++) {
      if (x === obstacleRange.xMin && y !== obstacleRange.yMin && y !== obstacleRange.yMax) {
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