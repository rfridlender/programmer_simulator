/*------------------------ Cached Element References ------------------------*/
// /`2-2`: {right: flase}

const programmerAura = document.querySelector(`.sprite`);
const programmer = document.querySelector(`.sprite-image`);
const screen = document.querySelector(`.screen`);


// const desk = document.querySelector(`.desk-one`);


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
  x: screen.clientWidth / 48,
  y: screen.clientHeight / 48,
};
const tiles = [];
const obstacles = [];

console.log(mapSize);
console.log(tileSize);
/*---------------------------- Variables (state) ----------------------------*/  


/*---------------------------- Classses / Object ----------------------------*/

class Tile {
  constructor(x, y, right, left, bottom, top) {
      this.pos = {x: x, y: y};
      this.boundary = {right: right, left: left, bottom: bottom, top: top};
      this.terminal = false;
  }
};

for (let x = 0; x < mapSize.x; x++) {
  for (let y = 0; y < mapSize.y; y++) {
    if (x === outerWallThickness.left && y !== outerWallThickness.top) {
      tiles.push(new Tile(x, y, false, true, false, false));
    } else if (x === mapSize.x - outerWallThickness.right - 1 && y !== outerWallThickness.top) {
      tiles.push(new Tile(x, y, true, false, false, false));
    } else if (y === outerWallThickness.top && x !== outerWallThickness.left && x !== outerWallThickness.right) {
      tiles.push(new Tile(x, y, false, false, false, true));
    } else if (y === mapSize.y - outerWallThickness.bottom - 1 && x !== outerWallThickness.left && x !== mapSize.x - outerWallThickness.right - 1) {
      tiles.push(new Tile(x, y, false, false, true, false));
    } else if (x === outerWallThickness.left && y === outerWallThickness.top) {
      tiles.push(new Tile(x, y, false, true, false, true));
    } else if (x === mapSize.x - outerWallThickness.right - 1 && y === outerWallThickness.top) {
      tiles.push(new Tile(x, y, true, false, false, true));
    } else if (x === outerWallThickness.left && y === mapSize.y - outerWallThickness.bottom - 1) {
      tiles.push(new Tile(x, y, false, true, true, false));
    } else if (x === mapSize.x - outerWallThickness.right - 1 && y === mapSize.y - outerWallThickness.bottom - 1) {
      tiles.push(new Tile(x, y, true, false, true, false));
    } else {
      tiles.push(new Tile(x, y, false, false, false, false));
    };
  };
};


// object = {`2-2`: {} }



// class Desks {
//   constructor(x, y, right, left, bottom, top) {
//     this.pos = {xMin: x, xMax: , yMin: y, yMax: }
//   }
// };

// const deskOne = obstacleRangeFinder(desk);





const sprite = {
  spriteDim: {x: programmer.clientWidth, y: programmer.clientHeight},
  currentTile: {pos: {x: 2, y: 2}, boundary: {right: false, left: false, bottom: false, top: true}, terminal: false},
  speedTilesPerPress: 1,
  runAnimationDuration: +getComputedStyle(programmerAura).transitionDuration.replace(`s`, ``) * 1000,
  step: 1;
  spriteLayer: -1,
  updateTile() {
    console.log(`new pos of sprite`, this.currentTile);
    const foundTile = tiles.find(tile => {
      return tile.pos.x === this.currentTile.pos.x && tile.pos.y === this.currentTile.pos.y;
      // return tile.pos === this.currentTile.pos;
    });
    console.log(`found tile`, foundTile);
    const newObj = {
      ...this.currentTile, 
      ...foundTile
    }
    console.log(`newobj`,newObj);
    this.currentTile = newObj;
    console.log(`new tile`, this.currentTile);
  },
  // updateLayer() {

  // },
  turn(key) {
      programmer.src = `./assets/sprite_idle_${key.name}.gif`;
  },
  moveRight() {
    programmerAura.style.left = `${pixelTranslator(this.currentTile.pos.x) + (this.spriteDim.x * this.speedTilesPerPress)}px`;
    programmer.src = `./assets/sprite_run_right_${this.step}.gif`
    setTimeout(() => {
      programmer.src = `./assets/sprite_idle_right.gif`;
    }, this.runAnimationDuration);
    this.step *= -1;
    console.log(`working`);
    this.currentTile.pos.x += this.speedTilesPerPress;
    this.updateTile();
  },
  moveLeft() {
    programmerAura.style.left = `${pixelTranslator(this.currentTile.pos.x) - (this.spriteDim.x * this.speedTilesPerPress)}px`;
    programmer.src = `./assets/sprite_run_left_${this.step}.gif`
    setTimeout(() => {
      programmer.src = `./assets/sprite_idle_left.gif`;
    }, this.runAnimationDuration);
    this.step *= -1;
    this.currentTile.pos.x -= this.speedTilesPerPress;
    this.updateTile();
  },
  moveDown() {
    programmerAura.style.top = `${(pixelTranslator(this.currentTile.pos.y)) * this.speedTilesPerPress}px`;
    programmer.src = `./assets/sprite_run_down_${this.step}.gif`
    setTimeout(() => {
      programmer.src = `./assets/sprite_idle_down.gif`;
    }, this.runAnimationDuration);
    this.step *= -1;
    this.currentTile.pos.y += this.speedTilesPerPress;
    // this.updateTile();
  },
  moveUp() {
    programmerAura.style.top = `${pixelTranslator(this.currentTile.pos.y) - (this.spriteDim.y  * this.speedTilesPerPress)}px`;
    programmer.src = `./assets/sprite_run_up_${this.step}.gif`
    setTimeout(() => {
      programmer.src = `./assets/sprite_idle_up.gif`;
    }, this.runAnimationDuration);
    this.step *= -1;
    this.currentTile.pos.y -= this.speedTilesPerPress;
    // this.updateTile();
  },
};

/*----------------------------- Event Listeners ----------------------------*/

document.addEventListener(`keydown`, handleKey);

/*-------------------------------- Functions --------------------------------*/

function handleKey(evt) {
  const key = keys.find(key => key.code === evt.keyCode);
  console.log(key);
  console.log(`old tile left bound status`, sprite.currentTile.boundary.left);
  if (!key) return;
  sprite.turn(key);
  if (key.name === `right` && !sprite.currentTile.boundary.right) {
    console.log(`moving right`);
    sprite.moveRight();
  } else if (key.name === `left` && !sprite.currentTile.boundary.left) {
    console.log(`moving left`);
    sprite.moveLeft();
  } else if (key.name === `down` && !sprite.currentTile.boundary.bottom) {
    console.log(`moving down`);
    sprite.moveDown();
  } else if (key.name === `up` && !sprite.currentTile.boundary.top) {
    console.log(`moving up`);
    sprite.moveUp();
  };
};


function pixelTranslator(num) {
  return !(num % tileSize) ? num / tileSize : num * tileSize;
};

// function obstacleRangeFinder(obstacleNode) {
//   const pos = {xMin: null, xMax: null, yMin: null, yMax: null};
//   pos.xMin = pixelTranslator(obstacleNode.offsetLeft);
//   pos.xMax = pos.xMin + pixelTranslator(obstacleNode.clientWidth) - 1;
//   pos.yMin = pixelTranslator(obstacleNode.offsetTop);
//   pos.yMax = pos.yMin + pixelTranslator(obstacleNode.clientHeight) - 1;
//   return pos;
// };

// function assignObjectBoundaries(obstacleRange) {
//   console.log(obstacleRange);
//   // tiles.forEach(tile => {
//   //   for (let x = obstacleRange.xMin; x <= obstacleRange.xMax; x++) {
//   //     for (let y = obstacleRange.yMin; x <= obstacleRange.yMax; y++) {
//   //       if (x === obstacleRange.xMin && y !== obstacleRange.yMin && y!== obstacleRange.yMax) {
//   //         tile.boundary.right = true;
//   //       };
//   //     };
//   //   };
//   // });
// };

// assignObjectBoundaries(obstacleRangeFinder(desk));

// console.log(tiles);



const sprite = {
  posX: 2,
  posY: 2
}