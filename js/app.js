/*------------------------ Cached Element References ------------------------*/

const programmer = document.querySelector(`.sprite`);
const programmerImg = document.querySelector(`.sprite-image`);
const screen = document.querySelector(`.screen`);

/*-------------------------------- Constants --------------------------------*/

const keys = [
  {code: 39, name: `right`}, 
  {code: 37, name: `left`}, 
  {code: 40, name: `down`}, 
  {code: 38, name: `up`}
];
const tileSize = programmer.clientWidth;
const outerWallThickness = {x: 1, y: 2};
const mapSize = {
  x: pixelTranslator(+getComputedStyle(screen).width.replace(`px`, ``)),
  y: pixelTranslator(+getComputedStyle(screen).height.replace(`px`, ``))
};
const runAnimationDuration = +getComputedStyle(programmer).transitionDuration.replace(`s`, ``) * 1000;

/*---------------------------- Variables (state) ----------------------------*/  

let step = 1;
let tiles = [];

/*---------------------------- Classses / Object -------------------------------------*/

class Tile {
  constructor(x, y, right, left, bottom, top) {
      this.pos = {x: x, y: y};
      this.boundary = {right: right, left: left, bottom: bottom, top: top};
      this.terminal = false;
  }
};

for (let x = 0; x < mapSize.x; x++) {
  for (let y = 0; y < mapSize.y; y++) {
    if (x === outerWallThickness.x && y === outerWallThickness.y) {
      tiles.push(new Tile(x, y, false, true, false, true));
    } else if (x === mapSize.x - outerWallThickness.x - 1 && y === outerWallThickness.y) {
      tiles.push(new Tile(x, y, true, false, false, true));
    } else if (x === outerWallThickness.x && y === mapSize.y - 2) {
      tiles.push(new Tile(x, y, false, true, true, false));
    } else if (x === mapSize.x - outerWallThickness.x - 1 && y === mapSize.y - 2) {
      tiles.push(new Tile(x, y, true, false, true, false));
    } else if (x === outerWallThickness.x) {
      tiles.push(new Tile(x, y, false, true, false, false));
    } else if (x === mapSize.x - outerWallThickness.x - 1) {
      tiles.push(new Tile(x, y, true, false, false, false));
    } else if (y === outerWallThickness.y) {
      tiles.push(new Tile(x, y, false, false, false, true));
    } else if (y === mapSize.y - 2) {
      tiles.push(new Tile(x, y, false, false, true, false));
    } else {
      tiles.push(new Tile(x, y, false, false, false, false));
    };
  };
};

const sprite = {
  pos: {x: 2, y: 2},
  turn(key) {
      programmerImg.src = `./assets/sprite_idle_${key.name}.gif`;
  },
  moveRight() {
    programmer.style.left = `${pixelTranslator(this.pos.x) + tileSize}px`;
    programmerImg.src = `./assets/sprite_run_right_${step}.gif`
    setTimeout(() => {
      programmerImg.src = `./assets/sprite_idle_right.gif`;
    }, runAnimationDuration);
    step *= -1;
    this.pos.x++;
  },
  moveLeft() {
    programmer.style.left = `${pixelTranslator(this.pos.x) - tileSize}px`;
    programmerImg.src = `./assets/sprite_run_left_${step}.gif`
    setTimeout(() => {
      programmerImg.src = `./assets/sprite_idle_left.gif`;
    }, runAnimationDuration);
    step *= -1;
    this.pos.x--;
  },
  moveDown() {
    programmer.style.top = `${pixelTranslator(this.pos.y)}px`;
    programmerImg.src = `./assets/sprite_run_down_${step}.gif`
    setTimeout(() => {
      programmerImg.src = `./assets/sprite_idle_down.gif`;
    }, runAnimationDuration);
    step *= -1;
    this.pos.y++;
  },
  moveUp() {
    programmer.style.top = `${pixelTranslator(this.pos.y) - tileSize * 2}px`;
    programmerImg.src = `./assets/sprite_run_up_${step}.gif`
    setTimeout(() => {
      programmerImg.src = `./assets/sprite_idle_up.gif`;
    }, runAnimationDuration);
    step *= -1;
    this.pos.y--;
  },
};
console.log(sprite.pos);
/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener(`keydown`, handleKey);

/*-------------------------------- Functions --------------------------------*/

function handleKey(evt) {
  const key = keys.find(key => key.code === evt.keyCode);
  const spritePos = tiles.find(tile => tile.pos.x === sprite.pos.x && tile.pos.y === sprite.pos.y);
  console.log(`oldtile`, spritePos);
  sprite.turn(key);
  if (key.name === `right` && !spritePos.boundary.right) {
    sprite.moveRight();
  } else if (key.name === `left` && !spritePos.boundary.left) {
    sprite.moveLeft();
  } else if (key.name === `down` && !spritePos.boundary.bottom) {
    sprite.moveDown();
  } else if (key.name === `up` && !spritePos.boundary.top) {
    sprite.moveUp();
  };
  console.log(`newtile`, sprite.pos);
};


function pixelTranslator(num) {
  return !(num % tileSize) ? num / tileSize : num * tileSize;
};

console.log(tiles.find(tile => tile.pos.x === 2 && tile.pos.y === 3));